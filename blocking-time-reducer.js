// Total Blocking Time Reducer - Critical for 3,080ms → <300ms
(function() {
    'use strict';
    
    // Task Scheduler for breaking up long tasks
    class TaskScheduler {
        constructor() {
            this.taskQueue = [];
            this.isProcessing = false;
            this.timeSlice = 5; // 5ms time slices to avoid blocking
        }
        
        addTask(fn, priority = 'normal') {
            this.taskQueue.push({ fn, priority, timestamp: performance.now() });
            this.processQueue();
        }
        
        async processQueue() {
            if (this.isProcessing || this.taskQueue.length === 0) return;
            
            this.isProcessing = true;
            const startTime = performance.now();
            
            while (this.taskQueue.length > 0 && (performance.now() - startTime) < this.timeSlice) {
                const task = this.taskQueue.shift();
                try {
                    await task.fn();
                } catch (error) {
                    console.warn('Task execution error:', error);
                }
            }
            
            this.isProcessing = false;
            
            if (this.taskQueue.length > 0) {
                // Use scheduler.postTask if available, otherwise setTimeout
                if ('scheduler' in window && 'postTask' in scheduler) {
                    scheduler.postTask(() => this.processQueue(), { priority: 'background' });
                } else {
                    setTimeout(() => this.processQueue(), 0);
                }
            }
        }
    }
    
    const taskScheduler = new TaskScheduler();
    
    // 1. Defer Heavy JavaScript Operations
    function deferHeavyOperations() {
        // Move large script execution to idle time
        const heavyScripts = [
            'script-phphp.js',
            'script-phphp8a5c.js',
            'performance-audit.js',
            'treemap-analyzer.js'
        ];
        
        heavyScripts.forEach(scriptName => {
            const script = document.querySelector(`script[src*="${scriptName}"]`);
            if (script) {
                script.remove();
                
                // Load during idle time
                if ('requestIdleCallback' in window) {
                    requestIdleCallback(() => {
                        loadScriptAsync(script.src);
                    }, { timeout: 5000 });
                } else {
                    setTimeout(() => loadScriptAsync(script.src), 100);
                }
            }
        });
    }
    
    function loadScriptAsync(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.defer = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    // 2. Optimize DOM Manipulation
    function optimizeDOMOperations() {
        // Batch DOM reads and writes
        let readTasks = [];
        let writeTasks = [];
        let scheduled = false;
        
        function flushTasks() {
            // Execute all reads first
            readTasks.forEach(task => task());
            readTasks = [];
            
            // Then all writes
            writeTasks.forEach(task => task());
            writeTasks = [];
            
            scheduled = false;
        }
        
        window.batchDOM = {
            read: (fn) => {
                readTasks.push(fn);
                if (!scheduled) {
                    scheduled = true;
                    requestAnimationFrame(flushTasks);
                }
            },
            write: (fn) => {
                writeTasks.push(fn);
                if (!scheduled) {
                    scheduled = true;
                    requestAnimationFrame(flushTasks);
                }
            }
        };
    }
    
    // 3. Progressive Symbol Loading
    function loadSymbolsProgressively() {
        const symbolContainer = document.querySelector('.maindata');
        if (!symbolContainer) return;
        
        const symbols = symbolContainer.querySelectorAll('.symbol');
        const visibleSymbols = [];
        const hiddenSymbols = [];
        
        // Separate visible and hidden symbols
        symbols.forEach(symbol => {
            const rect = symbol.getBoundingClientRect();
            if (rect.top < window.innerHeight + 100) {
                visibleSymbols.push(symbol);
            } else {
                hiddenSymbols.push(symbol);
                symbol.style.visibility = 'hidden';
            }
        });
        
        // Load hidden symbols progressively
        let index = 0;
        function loadNextBatch() {
            const batchSize = 10;
            const batch = hiddenSymbols.slice(index, index + batchSize);
            
            batch.forEach(symbol => {
                taskScheduler.addTask(() => {
                    symbol.style.visibility = 'visible';
                }, 'background');
            });
            
            index += batchSize;
            
            if (index < hiddenSymbols.length) {
                taskScheduler.addTask(loadNextBatch, 'background');
            }
        }
        
        // Start loading after initial render
        taskScheduler.addTask(loadNextBatch, 'background');
    }
    
    // 4. Event Delegation and Throttling
    function optimizeEventHandlers() {
        // Remove individual event listeners and use delegation
        const symbolContainer = document.querySelector('.maindata');
        if (symbolContainer) {
            // Remove existing listeners
            const symbols = symbolContainer.querySelectorAll('.symbol');
            symbols.forEach(symbol => {
                symbol.onclick = null;
                symbol.onmouseover = null;
                symbol.onmouseout = null;
            });
            
            // Use single delegated listener
            symbolContainer.addEventListener('click', handleSymbolClick, { passive: true });
            symbolContainer.addEventListener('mouseover', throttle(handleSymbolHover, 16), { passive: true });
        }
        
        function handleSymbolClick(e) {
            if (e.target.classList.contains('symbol')) {
                taskScheduler.addTask(() => {
                    copyToClipboard(e.target.textContent);
                }, 'user-blocking');
            }
        }
        
        function handleSymbolHover(e) {
            if (e.target.classList.contains('symbol')) {
                taskScheduler.addTask(() => {
                    e.target.style.transform = 'translateY(-5px)';
                }, 'user-visible');
            }
        }
    }
    
    // 5. Throttle and Debounce Utilities
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // 6. Clipboard Optimization
    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            return new Promise((resolve, reject) => {
                document.execCommand('copy') ? resolve() : reject();
                textArea.remove();
            });
        }
    }
    
    // 7. Intersection Observer for Lazy Loading
    function setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        taskScheduler.addTask(() => {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }, 'background');
                    }
                });
            }, {
                rootMargin: '50px',
                threshold: 0.1
            });
            
            document.querySelectorAll('.symbol').forEach(symbol => {
                observer.observe(symbol);
            });
        }
    }
    
    // 8. Memory Management
    function optimizeMemoryUsage() {
        // Clean up unused event listeners
        window.addEventListener('beforeunload', () => {
            taskScheduler.taskQueue = [];
        });
        
        // Periodic cleanup
        setInterval(() => {
            if (taskScheduler.taskQueue.length > 1000) {
                taskScheduler.taskQueue = taskScheduler.taskQueue.slice(-100);
            }
        }, 30000);
    }
    
    // Initialize optimizations
    function init() {
        // Critical path optimizations
        optimizeDOMOperations();
        deferHeavyOperations();
        
        // Progressive enhancements
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                loadSymbolsProgressively();
                optimizeEventHandlers();
                setupIntersectionObserver();
                optimizeMemoryUsage();
            });
        } else {
            taskScheduler.addTask(loadSymbolsProgressively);
            taskScheduler.addTask(optimizeEventHandlers);
            taskScheduler.addTask(setupIntersectionObserver);
            taskScheduler.addTask(optimizeMemoryUsage);
        }
    }
    
    // Expose utilities globally
    window.taskScheduler = taskScheduler;
    window.throttle = throttle;
    window.debounce = debounce;
    
    init();
})();
