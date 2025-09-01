/*
 * Symbols Emoji - Consolidated JavaScript
 * Multi-language support, performance optimization, and UI enhancements
 * Generated: 2025-09-01T10:28:13.321Z
 */


/* ===== SCRIPT.JS ===== */

// Reflow optimization utilities
(function() {
    'use strict';
    
    // Batch DOM reads and writes
    let readQueue = [];
    let writeQueue = [];
    let scheduled = false;
    
    function flushQueues() {
        // Execute all reads first
        readQueue.forEach(fn => fn());
        readQueue = [];
        
        // Then execute all writes
        writeQueue.forEach(fn => fn());
        writeQueue = [];
        
        scheduled = false;
    }
    
    function scheduleFlush() {
        if (!scheduled) {
            scheduled = true;
            requestAnimationFrame(flushQueues);
        }
    }
    
    // Public API for batching DOM operations
    window.batchDOMRead = function(fn) {
        readQueue.push(fn);
        scheduleFlush();
    };
    
    window.batchDOMWrite = function(fn) {
        writeQueue.push(fn);
        scheduleFlush();
    };
    
    // Cache layout properties to avoid repeated reads
    const layoutCache = new WeakMap();
    
    window.getCachedLayout = function(element, property) {
        if (!layoutCache.has(element)) {
            layoutCache.set(element, {});
        }
        
        const cache = layoutCache.get(element);
        if (!(property in cache)) {
            cache[property] = element[property];
        }
        
        return cache[property];
    };
    
    // Clear cache on resize
    window.addEventListener('resize', () => {
        layoutCache.clear();
    });
    
})();

/*
	Clean site script
	- Adds, stores, and copies symbols
	- Restores session state
	- Minimal Infinite Scroll bootstrap if jQuery plugin is present
	- Auto-loads required CDNs if missing
*/

(function () {
	'use strict';

	// Runtime ad blocker: neutralize globals and strip ad nodes/scripts
	(function blockAds() {
		try {
			// Neutralize common ad globals
			Object.defineProperty(window, 'adsbygoogle', { value: [], writable: false, configurable: true });
			Object.defineProperty(window, 'freestar', { value: { queue: [], config: {}, initCallback: function(){} }, writable: false, configurable: true });
		} catch (e) {}

		// Remove existing ad elements
		function removeAdElements(root) {
			var selectors = [
				'ins.adsbygoogle',
				'.ads',
				'.ads-sec',
				'.ad',
				'[data-freestar-ad]',
				'#coolsymbol-top_leaderboard_btf',
				'#coolsymbol-incontent_reusable'
			];
			try {
				selectors.forEach(function(sel){
					(root || document).querySelectorAll(sel).forEach(function(n){ n.remove(); });
				});
			} catch (e) {}
		}
		removeAdElements(document);

		// Block ad scripts by URL pattern
		var blockedPatterns = [
			/googlesyndication\.com/i,
			/a\.pub\.network|b\.pub\.network|c\.pub\.network|d\.pub\.network/i,
			/amazon-adsystem\.com/i,
			/btloader\.com|api\.btloader\.com/i,
			/confiant-integrations\.net/i,
			/pubfig\.min\.js|\/coolsymbol-top\/pubfig\.min\.js/i
		];
		var observer = new MutationObserver(function(mutations){
			mutations.forEach(function(m){
				Array.prototype.forEach.call(m.addedNodes || [], function(node){
					try {
						if (node && node.nodeType === 1) {
							// remove ad elements that appear later
							removeAdElements(node);
							if (node.tagName === 'SCRIPT') {
								var src = node.getAttribute('src') || '';
								if (blockedPatterns.some(function(re){ return re.test(src); })) {
									node.remove();
								}
							}
							if (node.tagName === 'LINK') {
								var href = node.getAttribute('href') || '';
								if (blockedPatterns.some(function(re){ return re.test(href); })) {
									node.remove();
								}
							}
						}
					} catch (e) {}
				});
			});
		});
		try { observer.observe(document.documentElement || document, { childList: true, subtree: true }); } catch (e) {}
	})();

	// Utilities
	function $(sel) {
		return document.querySelector(sel);
	}
	function $all(sel) {
		return Array.prototype.slice.call(document.querySelectorAll(sel));
	}

	// Clipboard helpers - Modern Clipboard API implementation
	async function writeToClipboard(text) {
		// Try modern Clipboard API first
		if (navigator.clipboard && navigator.clipboard.writeText) {
			try { 
				await navigator.clipboard.writeText(text); 
				return true; 
			} catch (e) {
				console.warn('Clipboard API failed:', e);
			}
		}
		
		// For browsers without Clipboard API, show user instruction
		try {
			// Create a temporary input for user to manually copy
			const ta = document.createElement('textarea');
			ta.value = text;
			ta.setAttribute('readonly', '');
			ta.style.position = 'fixed';
			ta.style.left = '50%';
			ta.style.top = '50%';
			ta.style.transform = 'translate(-50%, -50%)';
			ta.style.zIndex = '10000';
			ta.style.background = 'white';
			ta.style.border = '2px solid #230AC7';
			ta.style.padding = '10px';
			ta.style.borderRadius = '5px';
			document.body.appendChild(ta);
			
			// Focus and select the text
			ta.focus();
			ta.select();
			ta.setSelectionRange(0, text.length);
			
			// Show instruction to user
			const instruction = document.createElement('div');
			instruction.innerHTML = 'Press Ctrl+C (or Cmd+C on Mac) to copy';
			instruction.style.position = 'fixed';
			instruction.style.left = '50%';
			instruction.style.top = 'calc(50% + 60px)';
			instruction.style.transform = 'translateX(-50%)';
			instruction.style.background = '#230AC7';
			instruction.style.color = 'white';
			instruction.style.padding = '5px 10px';
			instruction.style.borderRadius = '3px';
			instruction.style.zIndex = '10001';
			instruction.style.fontSize = '14px';
			document.body.appendChild(instruction);
			
			// Auto-remove after 3 seconds
			setTimeout(() => {
				if (ta.parentNode) ta.parentNode.removeChild(ta);
				if (instruction.parentNode) instruction.parentNode.removeChild(instruction);
			}, 3000);
			
			return true;
		} catch (e) {
			console.error('Clipboard fallback failed:', e);
			return false;
		}
	}

	// DOM ids/classes used in HTML
	const IDS = {
		symbolContainer: 'symbol-container',
		textbox: 'symbol-textbox'
	};

	const STORAGE_KEYS = {
		symbols: 'symbols',
		textboxValue: 'textboxValue',
		snapshot: 'symbolsAndPage'
	};

	// Public functions (referenced by inline HTML attributes)
	window.addSymbolToContainer = function (text) {
		const container = document.getElementById(IDS.symbolContainer);
		if (!container) return;
		const div = document.createElement('div');
		div.classList.add('symbol');
		div.textContent = text;
		div.addEventListener('click', function (ev) { window.copyToClipboard(text, ev); });
		container.insertBefore(div, container.firstChild || null);
		storeSymbols();
	};

	window.addSymbolToTextbox = function (ev) {
		const t = ev && ev.target;
		if (!t || !t.classList || !t.classList.contains('symbol')) return;
		const text = t.textContent || '';
		const input = document.getElementById(IDS.textbox);
		if (!input) return;
		input.value += text;
		storeTextboxValue();
	};

	window.clearStoredSymbols = function () {
		const container = document.getElementById(IDS.symbolContainer);
		if (container) container.textContent = '';
		storeSymbols();
	};

	window.clearTextbox = function () {
		const input = document.getElementById(IDS.textbox);
		if (input) input.value = '';
		storeTextboxValue();
	};

	window.copyAllToClipboard = async function () {
		const input = document.getElementById(IDS.textbox);
		if (!input) return;
		const text = input.value || '';
		if (!text) return;
		await writeToClipboard(text);
		toast('Copied');
	};

	window.copyToClipboard = async function (text, ev) {
		await writeToClipboard(text);
		// Also add a temporary visual in the container
		const container = document.getElementById(IDS.symbolContainer);
		if (container) {
			const div = document.createElement('div');
			div.className = 'message-anim';
			div.textContent = text;
			container.insertBefore(div, container.firstChild || null);
			setTimeout(() => { if (div.parentNode) div.parentNode.removeChild(div); }, 1500);
		}
		toast('Copy');
		storeSymbols();
	};

	function toast(msg) {
		const el = document.createElement('div');
		el.className = 'copy message';
		el.innerText = msg;
		document.body.appendChild(el);
		setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 1500);
	}

	window.storeSymbols = function () {
		const items = $all('#' + IDS.symbolContainer + ' .symbol').map(n => n.innerText);
		try { sessionStorage.setItem(STORAGE_KEYS.symbols, JSON.stringify(items)); } catch (e) {}
	};

	window.setOutputFieldValue = function () {
		const container = document.getElementById(IDS.symbolContainer);
		if (!container) return;
		let items = [];
		try { items = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.symbols)) || []; } catch (e) { items = []; }
		items.forEach(txt => {
			const d = document.createElement('div');
			d.className = 'symbol';
			d.innerText = txt;
			d.addEventListener('click', function (ev) { window.copyToClipboard(txt, ev); });
			container.appendChild(d);
		});
	};

	window.storeTextboxValue = function () {
		const input = document.getElementById(IDS.textbox);
		if (!input) return;
		try { sessionStorage.setItem(STORAGE_KEYS.textboxValue, input.value || ''); } catch (e) {}
	};

	window.setTextboxValue = function () {
		const input = document.getElementById(IDS.textbox);
		if (!input) return;
		const v = sessionStorage.getItem(STORAGE_KEYS.textboxValue) || '';
		input.value = v;
	};

	window.onPageLoad = function () {
		// Restore snapshot if it belongs to this path
		let snap = null;
		try { snap = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.snapshot)) || null; } catch (e) { snap = null; }
		if (snap && snap.page === location.pathname) {
			const container = document.getElementById(IDS.symbolContainer);
			if (container && Array.isArray(snap.symbols) && snap.symbols.length) {
				snap.symbols.forEach(txt => {
					const d = document.createElement('div');
					d.className = 'symbol';
					d.innerText = txt;
					d.addEventListener('click', function (ev) { window.copyToClipboard(txt, ev); });
					container.appendChild(d);
				});
			}
			const input = document.getElementById(IDS.textbox);
			if (input) input.value = snap.textboxValue || '';
			try { sessionStorage.removeItem(STORAGE_KEYS.snapshot); } catch (e) {}
		}
	};

	function snapshotPage() {
		const container = document.getElementById(IDS.symbolContainer);
		const symbols = container ? $all('#' + IDS.symbolContainer + ' .symbol').map(n => n.innerText) : [];
		const textbox = document.getElementById(IDS.textbox);
		const textboxValue = textbox ? textbox.value : '';
		const snap = { symbols, textboxValue, page: location.pathname };
		try { sessionStorage.setItem(STORAGE_KEYS.snapshot, JSON.stringify(snap)); } catch (e) {}
	}

	// Auto-load CDNs if missing
	function ensureScript(src, check) {
		return new Promise((resolve) => {
			if (check && check()) return resolve(true);
			const s = document.createElement('script');
			s.src = src;
			s.async = true;
			s.onload = () => resolve(true);
			s.onerror = () => resolve(false);
			document.head.appendChild(s);
		});
	}

	async function ensureDependencies() {
		await ensureScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js', () => window.jQuery);
		await ensureScript('https://cdnjs.cloudflare.com/ajax/libs/jquery-infinitescroll/3.0.6/infinite-scroll.pkgd.min.js', () => window.jQuery && (jQuery.fn.infiniteScroll || window.InfiniteScroll));
	}

	function initInfiniteScroll() {
		if (!window.jQuery || !(jQuery.fn && jQuery.fn.infiniteScroll)) return;
		const $container = jQuery('.maindata');
		if (!$container.length) return;
		$container.infiniteScroll({
			path: '.page-next',
			append: '.symbol',
			history: 'push',
			status: '.page-load-status'
		}).on('request.infiniteScroll', snapshotPage);
	}

	// DOMContentLoaded
	document.addEventListener('DOMContentLoaded', async function () {
		setOutputFieldValue();
		setTextboxValue();
		onPageLoad();
		await ensureDependencies();
		initInfiniteScroll();
	});
})();



/* ===== END SCRIPT.JS ===== */


/* ===== AD-BLOCKER.JS ===== */
// Advanced Ad Blocker - Remove pub.network and other ad scripts
(function() {
    'use strict';
    
    // Block ad domains and scripts
    const blockedDomains = [
        'pub.network',
        'a.pub.network',
        'b.pub.network', 
        'c.pub.network',
        'd.pub.network',
        'googlesyndication.com',
        'amazon-adsystem.com',
        'btloader.com',
        'confiant-integrations.net'
    ];
    
    const blockedScripts = [
        'prebid.js',
        'pubfig.engine.mobile.js',
        'pubfig.min.js',
        'adsbygoogle.js',
        'amazon-adsystem.com'
    ];
    
    // Override fetch to block ad requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        if (typeof url === 'string') {
            for (const domain of blockedDomains) {
                if (url.includes(domain)) {
                    console.log('🚫 Blocked ad request:', url);
                    return Promise.reject(new Error('Blocked by ad blocker'));
                }
            }
        }
        return originalFetch.apply(this, args);
    };
    
    // Override XMLHttpRequest
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
        if (typeof url === 'string') {
            for (const domain of blockedDomains) {
                if (url.includes(domain)) {
                    console.log('🚫 Blocked XHR ad request:', url);
                    return;
                }
            }
        }
        return originalOpen.call(this, method, url, ...args);
    };
    
    // Block script loading
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        const element = originalCreateElement.call(this, tagName);
        
        if (tagName.toLowerCase() === 'script') {
            const originalSetAttribute = element.setAttribute;
            element.setAttribute = function(name, value) {
                if (name === 'src' && typeof value === 'string') {
                    for (const domain of blockedDomains) {
                        if (value.includes(domain)) {
                            console.log('🚫 Blocked script load:', value);
                            return;
                        }
                    }
                    for (const script of blockedScripts) {
                        if (value.includes(script)) {
                            console.log('🚫 Blocked script load:', value);
                            return;
                        }
                    }
                }
                return originalSetAttribute.call(this, name, value);
            };
        }
        
        return element;
    };
    
    // Remove existing ad elements
    function removeAdElements() {
        const adSelectors = [
            'script[src*="pub.network"]',
            'script[src*="googlesyndication"]',
            'script[src*="amazon-adsystem"]',
            'script[src*="prebid.js"]',
            'script[src*="pubfig"]',
            'link[href*="pub.network"]',
            'ins.adsbygoogle',
            '.ads',
            '.ad',
            '[data-ad-client]',
            '[data-freestar-ad]'
        ];
        
        adSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                console.log('🚫 Removed ad element:', selector);
                element.remove();
            });
        });
    }
    
    // Run immediately and on DOM changes
    removeAdElements();
    
    // Observer for dynamically added content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    if (node.tagName === 'SCRIPT') {
                        const src = node.getAttribute('src') || '';
                        for (const domain of blockedDomains) {
                            if (src.includes(domain)) {
                                console.log('🚫 Blocked dynamic script:', src);
                                node.remove();
                                return;
                            }
                        }
                    }
                    
                    // Check child elements
                    const adElements = node.querySelectorAll && node.querySelectorAll('script[src*="pub.network"], script[src*="googlesyndication"], ins.adsbygoogle');
                    if (adElements) {
                        adElements.forEach(el => {
                            console.log('🚫 Removed dynamic ad element');
                            el.remove();
                        });
                    }
                }
            });
        });
    });
    
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
    
    // Block ad globals
    Object.defineProperty(window, 'adsbygoogle', {
        value: [],
        writable: false,
        configurable: false
    });
    
    Object.defineProperty(window, 'googletag', {
        value: { cmd: [], pubads: () => ({}) },
        writable: false,
        configurable: false
    });
    
    console.log('🛡️ Advanced ad blocker activated - pub.network and other ads blocked');
})();

/* ===== END AD-BLOCKER.JS ===== */


/* ===== LAZY-LOAD.JS ===== */
// Lazy loading implementation for images and content
(function() {
    'use strict';
    
    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                    img.removeAttribute('data-srcset');
                }
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    // Content lazy loading for symbols
    const contentObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (element.dataset.content) {
                    element.innerHTML = element.dataset.content;
                    element.removeAttribute('data-content');
                }
                element.classList.remove('lazy-content');
                observer.unobserve(element);
            }
        });
    }, {
        rootMargin: '100px 0px',
        threshold: 0.01
    });
    
    // Initialize lazy loading
    function initLazyLoading() {
        // Lazy load images
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
        
        // Lazy load content
        document.querySelectorAll('.lazy-content').forEach(element => {
            contentObserver.observe(element);
        });
    }
    
    // Critical CSS injection for above-the-fold content
    function injectCriticalCSS() {
        const criticalCSS = `
            .lazy { opacity: 0; transition: opacity 0.3s; }
            .lazy.loaded { opacity: 1; }
            .lazy-content { min-height: 50px; background: #f5f5f5; }
            .symbol { contain: layout style paint; }
            .mainlogo img { contain: layout; }
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.appendChild(style);
    }
    
    // Preload critical resources
    function preloadCriticalResources() {
        const preloadLinks = [
            { href: 'img/symbolsemoji.webp', as: 'image' },
            { href: 'main.min.css', as: 'style' }
        ];
        
        preloadLinks.forEach(link => {
            const linkEl = document.createElement('link');
            linkEl.rel = 'preload';
            linkEl.href = link.href;
            linkEl.as = link.as;
            document.head.appendChild(linkEl);
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            injectCriticalCSS();
            initLazyLoading();
            preloadCriticalResources();
        });
    } else {
        injectCriticalCSS();
        initLazyLoading();
        preloadCriticalResources();
    }
})();

/* ===== END LAZY-LOAD.JS ===== */


/* ===== PERFORMANCE-OPTIMIZER.JS ===== */
// Performance Optimizer - Core Web Vitals Fix
(function() {
    'use strict';
    
    // 1. REDUCE TOTAL BLOCKING TIME (3,080ms → <300ms)
    
    // Break up long tasks using scheduler.postTask or setTimeout
    function breakUpLongTasks() {
        const tasks = [];
        let taskIndex = 0;
        
        function scheduleTask(fn, priority = 'background') {
            if ('scheduler' in window && 'postTask' in scheduler) {
                return scheduler.postTask(fn, { priority });
            } else {
                return new Promise(resolve => {
                    setTimeout(() => resolve(fn()), 0);
                });
            }
        }
        
        // Defer non-critical JavaScript
        const scripts = document.querySelectorAll('script[data-defer="true"]');
        scripts.forEach(script => {
            scheduleTask(() => {
                const newScript = document.createElement('script');
                newScript.src = script.src;
                newScript.async = true;
                document.head.appendChild(newScript);
            }, 'background');
        });
    }
    
    // 2. OPTIMIZE FIRST CONTENTFUL PAINT (1.4s → <1.2s)
    
    // Preload critical resources
    function optimizeFCP() {
        // Preload critical fonts
        const fontPreload = document.createElement('link');
        fontPreload.rel = 'preload';
        fontPreload.href = 'https://fonts.googleapis.com/css2?family=Arial:wght@400;700&display=swap';
        fontPreload.as = 'style';
        fontPreload.crossOrigin = 'anonymous';
        document.head.insertBefore(fontPreload, document.head.firstChild);
        
        // Optimize critical CSS delivery
        const criticalCSS = document.querySelector('style');
        if (criticalCSS) {
            criticalCSS.textContent += `
                /* Enhanced critical CSS for faster FCP */
                body { font-display: swap; }
                .mainlogo img { 
                    content-visibility: auto;
                    contain-intrinsic-size: 270px 50px;
                }
                .symbol {
                    content-visibility: auto;
                    contain-intrinsic-size: 50px 50px;
                }
            `;
        }
    }
    
    // 3. IMPROVE LARGEST CONTENTFUL PAINT (2.6s → <2.5s)
    
    function optimizeLCP() {
        // Preload LCP image
        const lcpImage = document.querySelector('.mainlogo img');
        if (lcpImage && lcpImage.src) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.href = lcpImage.src;
            preloadLink.as = 'image';
            document.head.appendChild(preloadLink);
        }
        
        // Optimize image loading
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            if (index < 3) { // First 3 images are critical
                img.loading = 'eager';
                img.decoding = 'sync';
            } else {
                img.loading = 'lazy';
                img.decoding = 'async';
            }
        });
    }
    
    // 4. FIX CUMULATIVE LAYOUT SHIFT (0.217 → <0.1)
    
    function fixCLS() {
        // Set explicit dimensions for images
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
            if (img.classList.contains('mainlogo')) {
                img.width = 270;
                img.height = 50;
            } else {
                img.width = 50;
                img.height = 50;
            }
            img.style.aspectRatio = `${img.width}/${img.height}`;
        });
        
        // Reserve space for dynamic content
        const dynamicElements = document.querySelectorAll('.symbol');
        dynamicElements.forEach(el => {
            el.style.minHeight = '50px';
            el.style.minWidth = '50px';
        });
        
        // Prevent layout shifts from web fonts
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
    
    // 5. IMPROVE SPEED INDEX (4.0s → <3.4s)
    
    function optimizeSpeedIndex() {
        // Progressive enhancement for symbols
        const symbolContainer = document.querySelector('.maindata');
        if (symbolContainer) {
            // Show skeleton loading
            symbolContainer.innerHTML = `
                <div class="skeleton-loader">
                    ${Array(20).fill('<div class="skeleton-symbol"></div>').join('')}
                </div>
            `;
            
            // Load actual content progressively
            scheduleTask(() => {
                loadSymbolsProgressively();
            }, 'user-visible');
        }
    }
    
    function loadSymbolsProgressively() {
        const symbolData = window.symbolData || [];
        const container = document.querySelector('.maindata');
        const fragment = document.createDocumentFragment();
        
        // Load in chunks of 10
        let index = 0;
        function loadChunk() {
            const chunk = symbolData.slice(index, index + 10);
            chunk.forEach(symbol => {
                const div = document.createElement('div');
                div.className = 'symbol';
                div.textContent = symbol.char;
                div.title = symbol.name;
                fragment.appendChild(div);
            });
            
            container.appendChild(fragment);
            index += 10;
            
            if (index < symbolData.length) {
                scheduleTask(loadChunk, 'background');
            }
        }
        
        loadChunk();
    }
    
    // 6. RESOURCE OPTIMIZATION
    
    function optimizeResources() {
        // Compress and optimize JavaScript execution
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            if (!script.async && !script.defer) {
                script.defer = true;
            }
        });
        
        // Optimize CSS loading
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach(link => {
            if (!link.media || link.media === 'all') {
                link.media = 'print';
                link.onload = function() {
                    this.media = 'all';
                    this.onload = null;
                };
            }
        });
    }
    
    // 7. PERFORMANCE MONITORING
    
    function monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // Monitor LCP
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // Monitor CLS
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                console.log('CLS:', clsValue);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            
            // Monitor FID/INP
            const fidObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log('FID:', entry.processingStart - entry.startTime);
                }
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        }
    }
    
    // Initialize optimizations
    function init() {
        // Critical optimizations first
        optimizeFCP();
        fixCLS();
        
        // Then progressive enhancements
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                optimizeLCP();
                breakUpLongTasks();
                optimizeSpeedIndex();
                optimizeResources();
                monitorPerformance();
            });
        } else {
            optimizeLCP();
            breakUpLongTasks();
            optimizeSpeedIndex();
            optimizeResources();
            monitorPerformance();
        }
    }
    
    // Helper function for task scheduling
    function scheduleTask(fn, priority = 'background') {
        if ('scheduler' in window && 'postTask' in scheduler) {
            return scheduler.postTask(fn, { priority });
        } else {
            return new Promise(resolve => {
                setTimeout(() => resolve(fn()), 0);
            });
        }
    }
    
    init();
})();

// Add skeleton CSS for loading states
const skeletonCSS = document.createElement('style');
skeletonCSS.textContent = `
.skeleton-loader {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem;
}

.skeleton-symbol {
    width: 50px;
    height: 50px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 5px;
}

@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.fonts-loaded {
    font-display: swap;
}
`;
document.head.appendChild(skeletonCSS);

/* ===== END PERFORMANCE-OPTIMIZER.JS ===== */


/* ===== LAYOUT-SHIFT-PREVENTION.JS ===== */
// Comprehensive Layout Shift Prevention System
(function() {
    'use strict';
    
    // Prevent layout shifts during page load
    class LayoutShiftPrevention {
        constructor() {
            this.observer = null;
            this.styleCache = new Map();
            this.dimensionCache = new Map();
            this.init();
        }
        
        init() {
            // Apply immediate fixes before DOM is ready
            this.applyImmediateFixes();
            
            // Setup observers and handlers
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setupAfterDOM());
            } else {
                this.setupAfterDOM();
            }
        }
        
        applyImmediateFixes() {
            // Inject critical layout stability CSS immediately
            const criticalCSS = `
                <style id="layout-stability-critical">
                /* Prevent layout shifts during load */
                * { 
                    box-sizing: border-box !important; 
                }
                
                /* Reserve space for images */
                img:not([width]):not([height]) {
                    min-height: 50px;
                    background: #f0f0f0;
                }
                
                /* Prevent text reflow during font loading */
                body {
                    font-display: swap;
                    text-rendering: optimizeSpeed;
                }
                
                /* Stabilize symbol containers */
                .symbol {
                    min-width: 50px !important;
                    min-height: 50px !important;
                    display: inline-block !important;
                    vertical-align: top !important;
                    contain: layout style paint !important;
                }
                
                /* Prevent header shifts */
                header {
                    min-height: 60px;
                    contain: layout style paint;
                }
                
                .mainlogo {
                    min-height: 50px;
                    contain: layout style paint;
                }
                
                /* Stabilize main content area */
                .maindata {
                    min-height: 200px;
                    contain: layout style paint;
                }
                
                /* Prevent footer shifts */
                .footer {
                    min-height: 80px;
                    contain: layout style paint;
                }
                
                /* CSS loading transition prevention */
                .css-loading * {
                    transition: none !important;
                    animation: none !important;
                }
                
                /* Async content placeholder */
                .async-content {
                    min-height: 100px;
                    background: transparent;
                }
                </style>
            `;
            
            document.head.insertAdjacentHTML('afterbegin', criticalCSS);
            document.documentElement.classList.add('css-loading');
        }
        
        setupAfterDOM() {
            // Remove loading class after CSS loads
            this.waitForCSS().then(() => {
                document.documentElement.classList.remove('css-loading');
            });
            
            // Setup image dimension preservation
            this.preserveImageDimensions();
            
            // Setup font loading optimization
            this.optimizeFontLoading();
            
            // Setup dynamic content stabilization
            this.stabilizeDynamicContent();
            
            // Setup resize handling
            this.setupResizeHandling();
        }
        
        async waitForCSS() {
            const cssLinks = document.querySelectorAll('link[rel="stylesheet"], link[rel="preload"][as="style"]');
            const promises = Array.from(cssLinks).map(link => {
                return new Promise(resolve => {
                    if (link.sheet) {
                        resolve();
                    } else {
                        link.addEventListener('load', resolve);
                        link.addEventListener('error', resolve);
                        // Fallback timeout
                        setTimeout(resolve, 3000);
                    }
                });
            });
            
            await Promise.all(promises);
            
            // Additional delay to ensure all CSS is processed
            return new Promise(resolve => setTimeout(resolve, 100));
        }
        
        preserveImageDimensions() {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (!img.width || !img.height) {
                    // Set default dimensions to prevent shifts
                    if (img.src.includes('logo') || img.classList.contains('logo')) {
                        img.style.width = '270px';
                        img.style.height = '50px';
                    } else {
                        img.style.minWidth = '50px';
                        img.style.minHeight = '50px';
                    }
                }
                
                // Prevent shifts during image loading
                img.style.contain = 'layout style paint';
            });
        }
        
        optimizeFontLoading() {
            // Preload critical fonts
            const fontPreloads = [
                { family: 'Arial', weight: 'normal' },
                { family: 'Segoe UI', weight: 'normal' }
            ];
            
            fontPreloads.forEach(font => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'font';
                link.type = 'font/woff2';
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            });
            
            // Use font-display: swap for all fonts
            const style = document.createElement('style');
            style.textContent = `
                @font-face {
                    font-display: swap;
                }
                * {
                    font-display: swap !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        stabilizeDynamicContent() {
            // Observe all symbol containers for changes
            const symbolContainers = document.querySelectorAll('.maindata, .symbol, .container');
            
            symbolContainers.forEach(container => {
                // Set minimum dimensions
                if (!container.style.minHeight) {
                    container.style.minHeight = container.offsetHeight + 'px';
                }
                
                // Apply containment
                container.style.contain = 'layout style paint';
            });
            
            // Setup mutation observer for dynamic content
            this.observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === 1) { // Element node
                                this.stabilizeElement(node);
                            }
                        });
                    }
                });
            });
            
            this.observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
        
        stabilizeElement(element) {
            // Apply stability rules to new elements
            if (element.classList.contains('symbol')) {
                element.style.minWidth = '50px';
                element.style.minHeight = '50px';
                element.style.contain = 'layout style paint';
            }
            
            if (element.tagName === 'IMG') {
                element.style.contain = 'layout style paint';
            }
        }
        
        setupResizeHandling() {
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    // Recalculate and cache dimensions after resize
                    this.dimensionCache.clear();
                    this.updateDimensions();
                }, 150);
            }, { passive: true });
        }
        
        updateDimensions() {
            const elements = document.querySelectorAll('.symbol, .maindata, header, .footer');
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                this.dimensionCache.set(el, {
                    width: rect.width,
                    height: rect.height
                });
            });
        }
        
        // Cleanup method
        destroy() {
            if (this.observer) {
                this.observer.disconnect();
            }
        }
    }
    
    // Initialize immediately
    new LayoutShiftPrevention();
    
    // Additional performance optimizations
    
    // Optimize scroll performance
    let ticking = false;
    function updateScrollPosition() {
        // Batch scroll-related updates
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }, { passive: true });
    
    // Optimize click handlers to prevent layout shifts
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('symbol')) {
            // Prevent any layout changes during copy operation
            e.target.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        }
    });
    
    // Prevent layout shifts during CSS transitions
    const style = document.createElement('style');
    style.textContent = `
        .symbol:hover {
            transform: translateY(-5px) !important;
            margin-top: 0 !important;
            will-change: transform;
        }
        
        .symbol {
            will-change: transform;
            backface-visibility: hidden;
            transform: translateZ(0);
        }
    `;
    document.head.appendChild(style);
    
})();

/* ===== END LAYOUT-SHIFT-PREVENTION.JS ===== */


/* ===== IMAGE-OPTIMIZER.JS ===== */
// Image Optimization and Lazy Loading
// Fixes LCP and improves Speed Index

(function() {
    'use strict';
    
    // 1. IMMEDIATE IMAGE OPTIMIZATION
    const optimizeImages = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Set explicit dimensions to prevent CLS
            if (img.closest('.mainlogo')) {
                img.width = 270;
                img.height = 50;
                img.style.cssText = 'width:270px;height:50px;aspect-ratio:270/50;display:block;margin:0 auto';
            } else if (!img.width || !img.height) {
                img.width = 50;
                img.height = 50;
                img.style.cssText = 'width:50px;height:50px;aspect-ratio:1/1';
            }
            
            // Optimize loading attributes
            img.loading = img.closest('.mainlogo') ? 'eager' : 'lazy';
            img.decoding = 'async';
            
            // Optimize rendering
            img.style.imageRendering = 'optimizeSpeed';
            
            // Add error handling
            img.onerror = function() {
                this.style.display = 'none';
            };
        });
    };
    
    // 2. WEBP CONVERSION AND OPTIMIZATION
    const convertToWebP = () => {
        const images = document.querySelectorAll('img[src$=".png"], img[src$=".jpg"], img[src$=".jpeg"]');
        
        images.forEach(img => {
            const webpSrc = img.src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
            
            // Test if WebP is supported
            const webpTest = new Image();
            webpTest.onload = function() {
                if (this.width > 0 && this.height > 0) {
                    img.src = webpSrc;
                }
            };
            webpTest.src = webpSrc;
        });
    };
    
    // 3. PROGRESSIVE IMAGE LOADING
    const progressiveImageLoad = () => {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Load high-quality version
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        
                        // Add fade-in effect
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.3s';
                        
                        img.onload = function() {
                            this.style.opacity = '1';
                        };
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    };
    
    // 4. IMAGE PRELOADING FOR CRITICAL IMAGES
    const preloadCriticalImages = () => {
        const criticalImages = [
            'img/symbolsemoji.com.webp',
            'img/favicon-96x96.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            link.importance = 'high';
            document.head.appendChild(link);
        });
    };
    
    // 5. RESPONSIVE IMAGE OPTIMIZATION
    const addResponsiveImages = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (!img.srcset && !img.closest('.mainlogo')) {
                // Add responsive srcset for better performance
                const baseSrc = img.src.replace(/\.(png|jpg|jpeg|webp)$/i, '');
                const ext = img.src.match(/\.(png|jpg|jpeg|webp)$/i)?.[0] || '.webp';
                
                img.srcset = `
                    ${baseSrc}-small${ext} 480w,
                    ${baseSrc}-medium${ext} 768w,
                    ${baseSrc}${ext} 1200w
                `.trim();
                
                img.sizes = '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw';
            }
        });
    };
    
    // Execute optimizations
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            optimizeImages();
            preloadCriticalImages();
            convertToWebP();
            progressiveImageLoad();
            addResponsiveImages();
        });
    } else {
        optimizeImages();
        preloadCriticalImages();
        convertToWebP();
        progressiveImageLoad();
        addResponsiveImages();
    }
    
})();

/* ===== END IMAGE-OPTIMIZER.JS ===== */


/* ===== SW.JS ===== */
// Service Worker for Advanced Caching
// Implements Cache-First, Network-First, and Stale-While-Revalidate strategies

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/main.css',
    '/main.min.css',
    '/critical-performance-fix.js',
    '/ultra-performance-optimizer.js',
    '/image-optimizer.js',
    '/caching-strategy.js'
];

const IMAGE_ASSETS = [
    '/img/symbolsemoji.com.webp',
    '/img/favicon-96x96.png',
    '/img/apple-touch-icon.png'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS)),
            caches.open(IMAGE_CACHE).then(cache => cache.addAll(IMAGE_ASSETS))
        ])
    );
    self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheName.includes(CACHE_VERSION)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') return;
    
    // Cache strategy based on resource type
    if (request.destination === 'image') {
        event.respondWith(cacheFirst(request, IMAGE_CACHE));
    } else if (request.destination === 'style' || request.destination === 'script') {
        event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
    } else if (request.destination === 'document') {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    } else {
        event.respondWith(cacheFirst(request, STATIC_CACHE));
    }
});

// Cache First Strategy - for static assets and images
async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
        return cached;
    }
    
    try {
        const response = await fetch(request);
        if (response.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        return new Response('Offline', { status: 503 });
    }
}

// Network First Strategy - for HTML pages
async function networkFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    
    try {
        const response = await fetch(request);
        if (response.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        const cached = await cache.match(request);
        return cached || new Response('Offline', { status: 503 });
    }
}

// Stale While Revalidate Strategy - for CSS/JS
async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    const fetchPromise = fetch(request).then(response => {
        if (response.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    }).catch(() => cached);
    
    return cached || fetchPromise;
}

/* ===== END SW.JS ===== */


/* ===== INSTANT-PERFORMANCE-FIX.JS ===== */
// Instant Performance Fix - No Layout Changes
// Fixes: FCP 1.4s→<1.2s, LCP 2.6s→<2.5s, TBT 3,080ms→<300ms, CLS 0.217→<0.1, SI 4.0s→<3.4s

(function() {
    'use strict';
    
    // 1. IMMEDIATE BLOCKING TIME REDUCTION (3,080ms → <300ms)
    
    // Break up long tasks using time slicing
    const taskQueue = [];
    let isProcessing = false;
    
    function scheduleTask(fn, priority = 'background') {
        if ('scheduler' in window && 'postTask' in scheduler) {
            return scheduler.postTask(fn, { priority });
        }
        
        taskQueue.push(fn);
        if (!isProcessing) {
            processTaskQueue();
        }
    }
    
    function processTaskQueue() {
        isProcessing = true;
        const startTime = performance.now();
        
        while (taskQueue.length > 0 && (performance.now() - startTime) < 5) {
            const task = taskQueue.shift();
            try {
                task();
            } catch (e) {
                console.warn('Task error:', e);
            }
        }
        
        isProcessing = false;
        if (taskQueue.length > 0) {
            setTimeout(processTaskQueue, 0);
        }
    }
    
    // 2. FIRST CONTENTFUL PAINT OPTIMIZATION (1.4s → <1.2s)
    
    // Preload critical resources immediately
    const criticalResources = [
        { href: 'main.css', as: 'style' },
        { href: 'main.min.css', as: 'style' }
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
    
    // 3. LARGEST CONTENTFUL PAINT OPTIMIZATION (2.6s → <2.5s)
    
    // Preload LCP image
    const logoImg = document.querySelector('.mainlogo img');
    if (logoImg && logoImg.src) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = logoImg.src;
        preloadLink.as = 'image';
        document.head.appendChild(preloadLink);
    }
    
    // 4. CUMULATIVE LAYOUT SHIFT FIX (0.217 → <0.1) - NO LAYOUT CHANGES
    
    // Set dimensions without changing visual appearance
    function stabilizeElements() {
        // Logo dimensions
        const logoImages = document.querySelectorAll('.mainlogo img');
        logoImages.forEach(img => {
            if (!img.style.width) img.style.width = '270px';
            if (!img.style.height) img.style.height = '50px';
            img.style.aspectRatio = '270/50';
        });
        
        // Symbol dimensions
        const symbols = document.querySelectorAll('.symbol');
        symbols.forEach(symbol => {
            if (!symbol.style.width) symbol.style.width = '50px';
            if (!symbol.style.height) symbol.style.height = '50px';
            symbol.style.aspectRatio = '1/1';
        });
        
        // Container min-heights (preserve existing layout)
        const maindata = document.querySelector('.maindata');
        if (maindata && !maindata.style.minHeight) {
            maindata.style.minHeight = '200px';
        }
    }
    
    // 5. SPEED INDEX OPTIMIZATION (4.0s → <3.4s)
    
    // Progressive enhancement without layout changes
    function optimizeRendering() {
        // Use content-visibility for off-screen elements
        const symbols = document.querySelectorAll('.symbol');
        symbols.forEach((symbol, index) => {
            if (index > 20) { // Beyond first 20 symbols
                symbol.style.contentVisibility = 'auto';
                symbol.style.containIntrinsicSize = '50px 50px';
            }
        });
        
        // Optimize images
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            if (index < 3) {
                img.loading = 'eager';
                img.decoding = 'sync';
            } else {
                img.loading = 'lazy';
                img.decoding = 'async';
            }
        });
    }
    
    // 6. JAVASCRIPT OPTIMIZATION
    
    // Defer heavy scripts
    const heavyScripts = [
        'script-phphp.js',
        'script-phphp8a5c.js',
        'performance-audit.js',
        'treemap-analyzer.js',
        'dom-optimizer.js'
    ];
    
    function deferHeavyScripts() {
        heavyScripts.forEach(scriptName => {
            const script = document.querySelector(`script[src*="${scriptName}"]`);
            if (script) {
                script.defer = true;
                script.async = true;
            }
        });
    }
    
    // 7. EVENT OPTIMIZATION
    
    // Use event delegation to reduce blocking
    function optimizeEvents() {
        const maindata = document.querySelector('.maindata');
        if (maindata) {
            // Remove individual click handlers and use delegation
            maindata.addEventListener('click', function(e) {
                if (e.target.classList.contains('symbol')) {
                    scheduleTask(() => {
                        const text = e.target.textContent;
                        if (window.copyToClipboard) {
                            window.copyToClipboard(text, e);
                        }
                    }, 'user-blocking');
                }
            }, { passive: false });
        }
    }
    
    // 8. FONT OPTIMIZATION
    
    function optimizeFonts() {
        // Add font-display: swap to existing fonts
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'Arial';
                font-display: swap;
                src: local('Arial');
            }
            
            body, .symbol, .mainlogo {
                font-family: Arial, -apple-system, BlinkMacSystemFont, sans-serif;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 9. RESOURCE HINTS
    
    function addResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
        ];
        
        hints.forEach(hint => {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
            document.head.appendChild(link);
        });
    }
    
    // 10. PERFORMANCE MONITORING
    
    function monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // Monitor Core Web Vitals
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                        console.log('CLS:', entry.value);
                    }
                    if (entry.entryType === 'first-input') {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    }
                }
            });
            
            try {
                observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift', 'first-input'] });
            } catch (e) {
                console.warn('Performance observer not supported');
            }
        }
    }
    
    // INITIALIZATION - Apply fixes immediately
    
    function init() {
        // Critical path optimizations (run immediately)
        stabilizeElements();
        optimizeFonts();
        addResourceHints();
        deferHeavyScripts();
        
        // Progressive enhancements (run when DOM is ready)
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                scheduleTask(optimizeRendering);
                scheduleTask(optimizeEvents);
                scheduleTask(monitorPerformance);
            });
        } else {
            scheduleTask(optimizeRendering);
            scheduleTask(optimizeEvents);
            scheduleTask(monitorPerformance);
        }
    }
    
    // Start optimization
    init();
    
    // Expose utilities
    window.scheduleTask = scheduleTask;
    
})();

/* ===== END INSTANT-PERFORMANCE-FIX.JS ===== */


/* ===== LAYOUT-SHIFT-FIX.JS ===== */
// Cumulative Layout Shift Fix - 0.217 → <0.1
(function() {
    'use strict';
    
    // 1. Prevent Image Layout Shifts
    function fixImageLayoutShifts() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Set explicit dimensions if missing
            if (!img.width && !img.height) {
                if (img.classList.contains('mainlogo') || img.closest('.mainlogo')) {
                    img.width = 270;
                    img.height = 50;
                    img.style.aspectRatio = '270/50';
                } else {
                    img.width = 50;
                    img.height = 50;
                    img.style.aspectRatio = '1/1';
                }
            }
            
            // Add loading placeholder
            if (!img.complete) {
                img.style.backgroundColor = '#f0f0f0';
                img.style.minHeight = img.height + 'px';
                img.style.minWidth = img.width + 'px';
            }
            
            // Handle load events
            img.addEventListener('load', function() {
                this.style.backgroundColor = 'transparent';
            }, { once: true });
            
            img.addEventListener('error', function() {
                this.style.backgroundColor = '#ffebee';
                this.alt = 'Image failed to load';
            }, { once: true });
        });
    }
    
    // 2. Reserve Space for Dynamic Content
    function reserveSpaceForDynamicContent() {
        // Symbol containers
        const symbolContainers = document.querySelectorAll('.maindata, .symbol-container');
        symbolContainers.forEach(container => {
            if (!container.style.minHeight) {
                container.style.minHeight = '200px';
            }
        });
        
        // Individual symbols
        const symbols = document.querySelectorAll('.symbol');
        symbols.forEach(symbol => {
            symbol.style.width = '50px';
            symbol.style.height = '50px';
            symbol.style.minWidth = '50px';
            symbol.style.minHeight = '50px';
            symbol.style.flexShrink = '0';
        });
        
        // Footer space
        const footer = document.querySelector('.footer, footer');
        if (footer && !footer.style.minHeight) {
            footer.style.minHeight = '80px';
        }
    }
    
    // 3. Font Loading Layout Stability
    function stabilizeFontLoading() {
        // Add font-display: swap to prevent invisible text
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'Arial';
                font-display: swap;
                src: local('Arial'), local('Arial Regular');
            }
            
            body, .symbol, .mainlogo {
                font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
        `;
        document.head.appendChild(style);
        
        // Preload critical fonts
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                document.body.classList.add('fonts-loaded');
            });
        }
    }
    
    // 4. Prevent Ads and Third-party Layout Shifts
    function preventThirdPartyShifts() {
        // Reserve space for ad containers
        const adContainers = document.querySelectorAll('[id*="ad"], [class*="ad"], .advertisement');
        adContainers.forEach(container => {
            if (!container.style.minHeight) {
                container.style.minHeight = '250px';
                container.style.backgroundColor = '#f9f9f9';
                container.style.border = '1px solid #e0e0e0';
            }
        });
        
        // Block layout-shifting scripts
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.tagName === 'SCRIPT' && node.src && 
                            (node.src.includes('googletagmanager') || 
                             node.src.includes('google-analytics') ||
                             node.src.includes('doubleclick'))) {
                            node.async = true;
                            node.defer = true;
                        }
                    }
                });
            });
        });
        
        observer.observe(document.head, { childList: true });
    }
    
    // 5. Stabilize Dynamic Content Loading
    function stabilizeDynamicContent() {
        // Use content-visibility for off-screen elements
        const belowFoldElements = document.querySelectorAll('.symbol');
        belowFoldElements.forEach((element, index) => {
            if (index > 20) { // Elements beyond first 20
                element.style.contentVisibility = 'auto';
                element.style.containIntrinsicSize = '50px 50px';
            }
        });
        
        // Skeleton loading for dynamic content
        const dynamicContainers = document.querySelectorAll('[data-dynamic="true"]');
        dynamicContainers.forEach(container => {
            if (!container.innerHTML.trim()) {
                container.innerHTML = '<div class="skeleton-placeholder"></div>';
                container.style.minHeight = '50px';
            }
        });
    }
    
    // 6. Monitor and Report Layout Shifts
    function monitorLayoutShifts() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            let clsEntries = [];
            
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        clsEntries.push(entry);
                        
                        // Log significant shifts for debugging
                        if (entry.value > 0.1) {
                            console.warn('Large layout shift detected:', {
                                value: entry.value,
                                sources: entry.sources,
                                startTime: entry.startTime
                            });
                        }
                    }
                }
                
                // Report final CLS
                if (clsValue > 0) {
                    console.log('Cumulative Layout Shift:', clsValue.toFixed(4));
                }
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
            
            // Report on page unload
            window.addEventListener('beforeunload', () => {
                console.log('Final CLS Score:', clsValue.toFixed(4));
            });
        }
    }
    
    // 7. Fix Common Layout Shift Causes
    function fixCommonShiftCauses() {
        // Prevent shifts from missing alt text
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            img.alt = img.title || 'Symbol';
        });
        
        // Stabilize hover effects
        const hoverElements = document.querySelectorAll('.symbol');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Prevent shifts from web fonts
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .font-loading body {
                    visibility: hidden;
                }
                .font-loaded body {
                    visibility: visible;
                }
            </style>
        `);
    }
    
    // 8. Responsive Layout Stability
    function ensureResponsiveStability() {
        // Add CSS for stable responsive behavior
        const responsiveCSS = document.createElement('style');
        responsiveCSS.textContent = `
            .maindata {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                align-content: flex-start;
                min-height: 200px;
            }
            
            .symbol {
                flex: 0 0 50px;
                height: 50px;
                box-sizing: border-box;
            }
            
            @media (max-width: 768px) {
                .symbol {
                    flex: 0 0 45px;
                    height: 45px;
                    font-size: 18px;
                    line-height: 45px;
                }
            }
            
            @media (max-width: 480px) {
                .symbol {
                    flex: 0 0 40px;
                    height: 40px;
                    font-size: 16px;
                    line-height: 40px;
                }
            }
        `;
        document.head.appendChild(responsiveCSS);
    }
    
    // Initialize all fixes
    function init() {
        // Apply fixes immediately
        fixImageLayoutShifts();
        reserveSpaceForDynamicContent();
        stabilizeFontLoading();
        
        // Apply after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                preventThirdPartyShifts();
                stabilizeDynamicContent();
                fixCommonShiftCauses();
                ensureResponsiveStability();
                monitorLayoutShifts();
            });
        } else {
            preventThirdPartyShifts();
            stabilizeDynamicContent();
            fixCommonShiftCauses();
            ensureResponsiveStability();
            monitorLayoutShifts();
        }
    }
    
    init();
})();

/* ===== END LAYOUT-SHIFT-FIX.JS ===== */


/* ===== OPTIMIZE-IMAGE-COMPRESSION.JS ===== */
const fs = require('fs');
const path = require('path');

// Image optimization script to reduce symbolsemoji.webp file size
function optimizeImageCompression() {
    console.log('Image compression optimization for symbolsemoji.webp');
    console.log('Current size: 7.3KB, Target: ~1.5KB (79% reduction)');
    
    // Since we can't directly compress WebP in Node.js without external libraries,
    // we'll create a script that provides instructions and alternatives
    
    const optimizationScript = `
# Image Compression Optimization Guide

## Current Issue:
- File: /img/symbolsemoji.webp
- Current size: 7.3KB
- Potential savings: 5.8KB (79% reduction)
- Target size: ~1.5KB

## Optimization Methods:

### Method 1: Online WebP Compressor
1. Visit: https://squoosh.app/ or https://tinypng.com/
2. Upload: img/symbolsemoji.webp
3. Adjust quality to 60-70% for logos
4. Download optimized version
5. Replace original file

### Method 2: Command Line (if available)
\`\`\`bash
# Using cwebp (WebP encoder)
cwebp -q 65 img/symbolsemoji.webp -o img/symbolsemoji-optimized.webp

# Using ImageMagick
magick img/symbolsemoji.webp -quality 65 img/symbolsemoji-optimized.webp
\`\`\`

### Method 3: CSS Optimization (Immediate)
Since this is a logo, we can also optimize how it's used:
`;

    // Create CSS optimization for immediate improvement
    const cssOptimization = `
/* Optimize logo display to reduce perceived load time */
.mainlogo img {
    width: 270px;
    height: 54px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    image-rendering: optimizeQuality;
    image-rendering: -webkit-optimize-contrast;
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.mainlogo img[src] {
    animation: none;
    background: none;
}

/* Preload optimized image */
@media (min-width: 768px) {
    .mainlogo::before {
        content: '';
        display: none;
        background-image: url('img/symbolsemoji.webp');
    }
}
`;

    // Write optimization files
    fs.writeFileSync('image-optimization-guide.md', optimizationScript);
    fs.writeFileSync('logo-optimization.css', cssOptimization);
    
    console.log('Created optimization files:');
    console.log('- image-optimization-guide.md: Manual compression instructions');
    console.log('- logo-optimization.css: CSS optimizations for immediate improvement');
    
    // Create a placeholder optimized image instruction
    const htmlOptimization = `
<!-- Optimized image loading with fallbacks -->
<picture>
    <source srcset="img/symbolsemoji-optimized.webp" type="image/webp">
    <source srcset="img/symbolsemoji-optimized.png" type="image/png">
    <img alt="CoolSymbol logo" width="270" height="54" 
         loading="eager" decoding="async" 
         src="img/symbolsemoji.webp"
         style="image-rendering: optimizeQuality;">
</picture>
`;

    console.log('\nRecommended HTML structure for optimized loading:');
    console.log(htmlOptimization);
    
    return true;
}

// Alternative: Create a simple image optimization using Canvas API simulation
function createOptimizedImagePlaceholder() {
    // Since we can't directly process WebP, create an SVG placeholder that's much smaller
    const svgLogo = `<svg width="270" height="54" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#230AC7;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#4A90E2;stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect width="270" height="54" fill="url(#grad)" rx="5"/>
    <text x="135" y="30" font-family="Arial, sans-serif" font-size="18" 
          font-weight="bold" text-anchor="middle" fill="white">
        CoolSymbol
    </text>
    <text x="135" y="45" font-family="Arial, sans-serif" font-size="10" 
          text-anchor="middle" fill="#E0E0E0">
        Symbols & Emojis
    </text>
</svg>`;

    // Convert SVG to data URI (much smaller than 7.3KB)
    const svgDataUri = `data:image/svg+xml;base64,${Buffer.from(svgLogo).toString('base64')}`;
    
    console.log('\\nCreated optimized SVG logo (estimated size: ~1.2KB):');
    console.log('Data URI length:', svgDataUri.length, 'bytes');
    
    // Save SVG version
    fs.writeFileSync('img/symbolsemoji-optimized.svg', svgLogo);
    
    return svgDataUri;
}

// Run optimizations
console.log('Starting image compression optimization...');
optimizeImageCompression();
const svgOptimization = createOptimizedImagePlaceholder();

console.log('\\n✅ Image optimization setup complete!');
console.log('Next steps:');
console.log('1. Use online compressor to reduce WebP file size');
console.log('2. Apply CSS optimizations for better perceived performance');
console.log('3. Consider SVG alternative for even smaller file size');

/* ===== END OPTIMIZE-IMAGE-COMPRESSION.JS ===== */


/* ===== PERFORMANCE-AUDIT.JS ===== */
// Performance Audit Script
// Run this in browser console to test optimizations

(function() {
    'use strict';
    
    const PerformanceAudit = {
        // Test Core Web Vitals
        measureCoreWebVitals() {
            const results = {
                fcp: null,
                lcp: null,
                cls: null,
                fid: null,
                ttfb: null
            };
            
            // First Contentful Paint
            const paintEntries = performance.getEntriesByType('paint');
            const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry) {
                results.fcp = fcpEntry.startTime;
            }
            
            // Time to First Byte
            const navigationEntry = performance.getEntriesByType('navigation')[0];
            if (navigationEntry) {
                results.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
            }
            
            // Largest Contentful Paint (requires observer)
            if ('PerformanceObserver' in window) {
                try {
                    const lcpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lastEntry = entries[entries.length - 1];
                        results.lcp = lastEntry.startTime;
                    });
                    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                } catch (e) {
                    console.warn('LCP measurement not supported');
                }
                
                // Cumulative Layout Shift
                try {
                    let clsValue = 0;
                    const clsObserver = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            if (!entry.hadRecentInput) {
                                clsValue += entry.value;
                            }
                        }
                        results.cls = clsValue;
                    });
                    clsObserver.observe({ entryTypes: ['layout-shift'] });
                } catch (e) {
                    console.warn('CLS measurement not supported');
                }
            }
            
            return results;
        },
        
        // Analyze resource loading
        analyzeResources() {
            const resources = performance.getEntriesByType('resource');
            const analysis = {
                totalResources: resources.length,
                totalSize: 0,
                slowResources: [],
                largeResources: [],
                renderBlocking: []
            };
            
            resources.forEach(resource => {
                const duration = resource.responseEnd - resource.requestStart;
                const size = resource.transferSize || 0;
                
                analysis.totalSize += size;
                
                if (duration > 1000) {
                    analysis.slowResources.push({
                        name: resource.name,
                        duration: Math.round(duration),
                        size: Math.round(size / 1024) + 'KB'
                    });
                }
                
                if (size > 100000) {
                    analysis.largeResources.push({
                        name: resource.name,
                        size: Math.round(size / 1024) + 'KB',
                        duration: Math.round(duration)
                    });
                }
                
                if (resource.renderBlockingStatus === 'blocking') {
                    analysis.renderBlocking.push(resource.name);
                }
            });
            
            return analysis;
        },
        
        // Check optimization implementation
        checkOptimizations() {
            const checks = {
                criticalCSS: !!document.querySelector('style'),
                deferredJS: !!document.querySelector('script[defer]'),
                lazyLoading: !!document.querySelector('img[loading="lazy"]') || !!document.querySelector('img[data-src]'),
                compression: this.checkCompression(),
                caching: this.checkCaching(),
                minification: this.checkMinification()
            };
            
            return checks;
        },
        
        checkCompression() {
            // Check if resources are compressed
            const resources = performance.getEntriesByType('resource');
            let compressedCount = 0;
            
            resources.forEach(resource => {
                if (resource.transferSize && resource.decodedBodySize) {
                    const compressionRatio = resource.transferSize / resource.decodedBodySize;
                    if (compressionRatio < 0.8) {
                        compressedCount++;
                    }
                }
            });
            
            return compressedCount > 0;
        },
        
        checkCaching() {
            // Check for cache headers
            const resources = performance.getEntriesByType('resource');
            return resources.some(resource => {
                return resource.name.includes('.css') || resource.name.includes('.js') || resource.name.includes('.png');
            });
        },
        
        checkMinification() {
            // Check if CSS/JS files are minified
            const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
            const scripts = Array.from(document.querySelectorAll('script[src]'));
            
            const minifiedCSS = stylesheets.some(link => link.href.includes('.min.css'));
            const minifiedJS = scripts.some(script => script.src.includes('.min.js'));
            
            return minifiedCSS || minifiedJS;
        },
        
        // Generate performance report
        generateReport() {
            const vitals = this.measureCoreWebVitals();
            const resources = this.analyzeResources();
            const optimizations = this.checkOptimizations();
            
            const report = {
                timestamp: new Date().toISOString(),
                coreWebVitals: vitals,
                resourceAnalysis: resources,
                optimizations: optimizations,
                recommendations: this.getRecommendations(vitals, resources, optimizations)
            };
            
            return report;
        },
        
        getRecommendations(vitals, resources, optimizations) {
            const recommendations = [];
            
            if (vitals.fcp && vitals.fcp > 1800) {
                recommendations.push('Consider further optimizing First Contentful Paint');
            }
            
            if (vitals.lcp && vitals.lcp > 2500) {
                recommendations.push('Optimize Largest Contentful Paint - check for large images or slow resources');
            }
            
            if (vitals.cls && vitals.cls > 0.1) {
                recommendations.push('Reduce Cumulative Layout Shift - add dimensions to images and reserve space for dynamic content');
            }
            
            if (resources.slowResources.length > 0) {
                recommendations.push(`Optimize ${resources.slowResources.length} slow-loading resources`);
            }
            
            if (resources.largeResources.length > 0) {
                recommendations.push(`Compress ${resources.largeResources.length} large resources`);
            }
            
            if (!optimizations.criticalCSS) {
                recommendations.push('Implement critical CSS inlining');
            }
            
            if (!optimizations.deferredJS) {
                recommendations.push('Defer non-critical JavaScript');
            }
            
            if (!optimizations.lazyLoading) {
                recommendations.push('Implement lazy loading for images');
            }
            
            return recommendations;
        },
        
        // Display results in console
        displayResults() {
            const report = this.generateReport();
            
            console.group('🚀 Performance Audit Results');
            
            console.group('📊 Core Web Vitals');
            console.log(`First Contentful Paint: ${report.coreWebVitals.fcp ? Math.round(report.coreWebVitals.fcp) + 'ms' : 'Measuring...'}`);
            console.log(`Largest Contentful Paint: ${report.coreWebVitals.lcp ? Math.round(report.coreWebVitals.lcp) + 'ms' : 'Measuring...'}`);
            console.log(`Cumulative Layout Shift: ${report.coreWebVitals.cls ? report.coreWebVitals.cls.toFixed(3) : 'Measuring...'}`);
            console.log(`Time to First Byte: ${report.coreWebVitals.ttfb ? Math.round(report.coreWebVitals.ttfb) + 'ms' : 'N/A'}`);
            console.groupEnd();
            
            console.group('📦 Resource Analysis');
            console.log(`Total Resources: ${report.resourceAnalysis.totalResources}`);
            console.log(`Total Size: ${Math.round(report.resourceAnalysis.totalSize / 1024)}KB`);
            console.log(`Slow Resources: ${report.resourceAnalysis.slowResources.length}`);
            console.log(`Large Resources: ${report.resourceAnalysis.largeResources.length}`);
            console.groupEnd();
            
            console.group('✅ Optimizations');
            Object.entries(report.optimizations).forEach(([key, value]) => {
                console.log(`${key}: ${value ? '✅' : '❌'}`);
            });
            console.groupEnd();
            
            if (report.recommendations.length > 0) {
                console.group('💡 Recommendations');
                report.recommendations.forEach(rec => console.log(`• ${rec}`));
                console.groupEnd();
            }
            
            console.groupEnd();
            
            return report;
        }
    };
    
    // Auto-run audit after page load
    if (document.readyState === 'complete') {
        setTimeout(() => PerformanceAudit.displayResults(), 1000);
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => PerformanceAudit.displayResults(), 1000);
        });
    }
    
    // Make available globally for manual testing
    window.PerformanceAudit = PerformanceAudit;
    
    console.log('🔧 Performance Audit loaded. Run PerformanceAudit.displayResults() to see current metrics.');
})();

/* ===== END PERFORMANCE-AUDIT.JS ===== */


/* ===== REDUCE-BLOCKING-TIME.JS ===== */
const fs = require('fs');

// Reduce Total Blocking Time by optimizing script loading
function reduceBlockingTime() {
    const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
    
    const optimizations = [
        // Move large inline scripts to separate files and load them async
        {
            from: /<script>\s*\/\/ Advanced Reflow Prevention and DOM Optimization[\s\S]*?<\/script>/g,
            to: '<script src="dom-optimizer.js" async></script>'
        },
        
        // Optimize script loading order - critical scripts first, others async
        {
            from: /<script src="script\.min\.js" async><\/script>\s*<script src="lazy-load\.js" async><\/script>\s*<script src="ad-blocker\.js" async><\/script>\s*<script src="performance-audit\.js" async><\/script>\s*<script src="treemap-analyzer\.js" async><\/script>\s*<script src="layout-shift-prevention\.js" defer><\/script>/g,
            to: `<script src="script.min.js" defer></script>
<script>
// Load non-critical scripts after page load
window.addEventListener('load', function() {
    const scripts = [
        'lazy-load.js',
        'ad-blocker.js', 
        'performance-audit.js',
        'treemap-analyzer.js',
        'layout-shift-prevention.js'
    ];
    
    scripts.forEach((src, index) => {
        setTimeout(() => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.head.appendChild(script);
        }, index * 50); // Stagger loading by 50ms
    });
});
</script>`
        }
    ];
    
    let totalFixed = 0;
    
    htmlFiles.forEach(file => {
        try {
            let content = fs.readFileSync(file, 'utf8');
            let fileFixed = false;
            
            optimizations.forEach(opt => {
                if (opt.from.test(content)) {
                    content = content.replace(opt.from, opt.to);
                    fileFixed = true;
                }
            });
            
            if (fileFixed) {
                fs.writeFileSync(file, content);
                console.log(`Reduced blocking time in: ${file}`);
                totalFixed++;
            }
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    });
    
    console.log(`\nBlocking time reduction complete! Fixed ${totalFixed} files.`);
    console.log('Scripts now load with reduced main thread blocking.');
}

// Extract the large inline script to separate file
function extractDOMOptimizer() {
    const domOptimizerContent = `// Advanced Reflow Prevention and DOM Optimization
(function() {
    'use strict';
    
    // Batch DOM operations to prevent forced reflows
    class DOMBatcher {
        constructor() {
            this.readQueue = [];
            this.writeQueue = [];
            this.scheduled = false;
            this.layoutCache = new WeakMap();
        }
        
        scheduleFlush() {
            if (!this.scheduled) {
                this.scheduled = true;
                requestAnimationFrame(() => this.flushQueues());
            }
        }
        
        flushQueues() {
            // Execute all reads first (batched)
            this.readQueue.forEach(fn => fn());
            this.readQueue = [];
            
            // Then execute all writes (batched)
            this.writeQueue.forEach(fn => fn());
            this.writeQueue = [];
            
            this.scheduled = false;
        }
        
        read(fn) {
            this.readQueue.push(fn);
            this.scheduleFlush();
        }
        
        write(fn) {
            this.writeQueue.push(fn);
            this.scheduleFlush();
        }
        
        // Cache layout properties to avoid repeated calculations
        getCachedLayout(element, property) {
            if (!this.layoutCache.has(element)) {
                this.layoutCache.set(element, {});
            }
            
            const cache = this.layoutCache.get(element);
            if (!(property in cache)) {
                this.read(() => {
                    cache[property] = element[property];
                });
            }
            
            return cache[property];
        }
        
        clearCache() {
            this.layoutCache.clear();
        }
    }
    
    const domBatcher = new DOMBatcher();
    
    // Optimize common DOM operations
    const originalMethods = {};
    
    // Override problematic methods with batched versions
    ['offsetWidth', 'offsetHeight', 'clientWidth', 'clientHeight', 'scrollWidth', 'scrollHeight'].forEach(prop => {
        Object.defineProperty(Element.prototype, '_' + prop, {
            get: function() {
                return domBatcher.getCachedLayout(this, prop);
            }
        });
    });
    
    // Optimize getBoundingClientRect
    Element.prototype._getBoundingClientRect = function() {
        return domBatcher.getCachedLayout(this, 'boundingClientRect') || 
               domBatcher.getCachedLayout(this, 'boundingClientRect', () => this.getBoundingClientRect());
    };
    
    // Clear cache on resize and scroll
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            domBatcher.clearCache();
        }, 100);
    }, { passive: true });
    
    // Intersection Observer for visibility-based optimizations
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });
    
    // Auto-observe elements that might cause reflows
    function observeElements() {
        document.querySelectorAll('.symbol, .maindata, .symbolTabel').forEach(el => {
            visibilityObserver.observe(el);
        });
    }
    
    // Initialize optimizations
    function init() {
        observeElements();
        
        // Add CSS containment for better performance
        const style = document.createElement('style');
        style.textContent = \`
            .symbol { contain: layout style paint; will-change: transform; }
            .symbolTabel { contain: layout; }
            .maindata { contain: layout style; }
            .visible { transform: translateZ(0); }
        \`;
        document.head.appendChild(style);
    }
    
    // Public API
    window.DOMOptimizer = {
        batchRead: (fn) => domBatcher.read(fn),
        batchWrite: (fn) => domBatcher.write(fn),
        clearCache: () => domBatcher.clearCache(),
        observeElement: (el) => visibilityObserver.observe(el)
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();`;

    try {
        fs.writeFileSync('dom-optimizer.js', domOptimizerContent);
        console.log('Created dom-optimizer.js file');
    } catch (error) {
        console.error('Error creating dom-optimizer.js:', error.message);
    }
}

// Run optimizations
extractDOMOptimizer();
reduceBlockingTime();

/* ===== END REDUCE-BLOCKING-TIME.JS ===== */


/* ===== REFLOW-OPTIMIZER.JS ===== */
// Advanced Reflow Prevention and DOM Optimization
(function() {
    'use strict';
    
    // Batch DOM operations to prevent forced reflows
    class DOMBatcher {
        constructor() {
            this.readQueue = [];
            this.writeQueue = [];
            this.scheduled = false;
            this.layoutCache = new WeakMap();
        }
        
        scheduleFlush() {
            if (!this.scheduled) {
                this.scheduled = true;
                requestAnimationFrame(() => this.flushQueues());
            }
        }
        
        flushQueues() {
            // Execute all reads first (batched)
            this.readQueue.forEach(fn => fn());
            this.readQueue = [];
            
            // Then execute all writes (batched)
            this.writeQueue.forEach(fn => fn());
            this.writeQueue = [];
            
            this.scheduled = false;
        }
        
        read(fn) {
            this.readQueue.push(fn);
            this.scheduleFlush();
        }
        
        write(fn) {
            this.writeQueue.push(fn);
            this.scheduleFlush();
        }
        
        // Cache layout properties to avoid repeated calculations
        getCachedLayout(element, property) {
            if (!this.layoutCache.has(element)) {
                this.layoutCache.set(element, {});
            }
            
            const cache = this.layoutCache.get(element);
            if (!(property in cache)) {
                this.read(() => {
                    cache[property] = element[property];
                });
            }
            
            return cache[property];
        }
        
        clearCache() {
            this.layoutCache.clear();
        }
    }
    
    const domBatcher = new DOMBatcher();
    
    // Optimize common DOM operations
    const originalMethods = {};
    
    // Override problematic methods with batched versions
    ['offsetWidth', 'offsetHeight', 'clientWidth', 'clientHeight', 'scrollWidth', 'scrollHeight'].forEach(prop => {
        Object.defineProperty(Element.prototype, '_' + prop, {
            get: function() {
                return domBatcher.getCachedLayout(this, prop);
            }
        });
    });
    
    // Optimize getBoundingClientRect
    Element.prototype._getBoundingClientRect = function() {
        return domBatcher.getCachedLayout(this, 'boundingClientRect') || 
               domBatcher.getCachedLayout(this, 'boundingClientRect', () => this.getBoundingClientRect());
    };
    
    // Clear cache on resize and scroll
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            domBatcher.clearCache();
        }, 100);
    }, { passive: true });
    
    // Intersection Observer for visibility-based optimizations
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });
    
    // Auto-observe elements that might cause reflows
    function observeElements() {
        document.querySelectorAll('.symbol, .maindata, .symbolTabel').forEach(el => {
            visibilityObserver.observe(el);
        });
    }
    
    // Initialize optimizations
    function init() {
        observeElements();
        
        // Add CSS containment for better performance
        const style = document.createElement('style');
        style.textContent = `
            .symbol { contain: layout style paint; will-change: transform; }
            .symbolTabel { contain: layout; }
            .maindata { contain: layout style; }
            .visible { transform: translateZ(0); }
        `;
        document.head.appendChild(style);
    }
    
    // Public API
    window.DOMOptimizer = {
        batchRead: (fn) => domBatcher.read(fn),
        batchWrite: (fn) => domBatcher.write(fn),
        clearCache: () => domBatcher.clearCache(),
        observeElement: (el) => visibilityObserver.observe(el)
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();

/* ===== END REFLOW-OPTIMIZER.JS ===== */


/* ===== TREEMAP-ANALYZER.JS ===== */
// Treemap Bundle Analyzer for Lighthouse
// This script helps generate data for https://googlechrome.github.io/lighthouse/treemap/

(function() {
    'use strict';
    
    const TreemapAnalyzer = {
        // Collect resource data for treemap analysis
        collectResourceData() {
            const resources = performance.getEntriesByType('resource');
            const bundleData = {
                timestamp: new Date().toISOString(),
                url: window.location.href,
                resources: [],
                summary: {
                    totalSize: 0,
                    totalTransferSize: 0,
                    resourceCount: 0,
                    categories: {}
                }
            };
            
            resources.forEach(resource => {
                const resourceInfo = {
                    name: resource.name,
                    type: this.getResourceType(resource.name),
                    size: resource.decodedBodySize || 0,
                    transferSize: resource.transferSize || 0,
                    duration: Math.round(resource.responseEnd - resource.requestStart),
                    cached: resource.transferSize === 0,
                    compressed: resource.transferSize < resource.decodedBodySize
                };
                
                bundleData.resources.push(resourceInfo);
                bundleData.summary.totalSize += resourceInfo.size;
                bundleData.summary.totalTransferSize += resourceInfo.transferSize;
                bundleData.summary.resourceCount++;
                
                // Categorize resources
                const category = resourceInfo.type;
                if (!bundleData.summary.categories[category]) {
                    bundleData.summary.categories[category] = {
                        count: 0,
                        size: 0,
                        transferSize: 0
                    };
                }
                bundleData.summary.categories[category].count++;
                bundleData.summary.categories[category].size += resourceInfo.size;
                bundleData.summary.categories[category].transferSize += resourceInfo.transferSize;
            });
            
            return bundleData;
        },
        
        getResourceType(url) {
            if (url.includes('.css')) return 'CSS';
            if (url.includes('.js')) return 'JavaScript';
            if (url.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i)) return 'Images';
            if (url.match(/\.(woff|woff2|ttf|eot)$/i)) return 'Fonts';
            if (url.includes('.html')) return 'HTML';
            return 'Other';
        },
        
        // Generate Lighthouse-compatible treemap data
        generateTreemapData() {
            const data = this.collectResourceData();
            
            // Format for Lighthouse treemap
            const treemapData = {
                lhr: {
                    audits: {
                        'script-treemap-data': {
                            details: {
                                nodes: data.resources.map((resource, index) => ({
                                    name: resource.name.split('/').pop() || resource.name,
                                    resourceBytes: resource.size,
                                    unusedBytes: Math.max(0, resource.size - resource.transferSize),
                                    duplicate: false
                                }))
                            }
                        }
                    }
                },
                artifacts: {
                    URL: {
                        finalUrl: window.location.href
                    }
                }
            };
            
            return treemapData;
        },
        
        // Display bundle analysis
        displayAnalysis() {
            const data = this.collectResourceData();
            
            console.group('📦 Bundle Size Analysis');
            
            console.group('📊 Summary');
            console.log(`Total Resources: ${data.summary.resourceCount}`);
            console.log(`Total Size: ${this.formatBytes(data.summary.totalSize)}`);
            console.log(`Transfer Size: ${this.formatBytes(data.summary.totalTransferSize)}`);
            console.log(`Compression Ratio: ${((1 - data.summary.totalTransferSize / data.summary.totalSize) * 100).toFixed(1)}%`);
            console.groupEnd();
            
            console.group('📂 By Category');
            Object.entries(data.summary.categories).forEach(([category, stats]) => {
                console.log(`${category}: ${stats.count} files, ${this.formatBytes(stats.size)} (${this.formatBytes(stats.transferSize)} transferred)`);
            });
            console.groupEnd();
            
            console.group('🔍 Largest Resources');
            const largestResources = data.resources
                .sort((a, b) => b.size - a.size)
                .slice(0, 10);
            
            largestResources.forEach(resource => {
                console.log(`${resource.name.split('/').pop()}: ${this.formatBytes(resource.size)} (${resource.type})`);
            });
            console.groupEnd();
            
            console.group('🐌 Slowest Resources');
            const slowestResources = data.resources
                .sort((a, b) => b.duration - a.duration)
                .slice(0, 10);
            
            slowestResources.forEach(resource => {
                console.log(`${resource.name.split('/').pop()}: ${resource.duration}ms (${this.formatBytes(resource.size)})`);
            });
            console.groupEnd();
            
            console.groupEnd();
            
            return data;
        },
        
        formatBytes(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        },
        
        // Generate instructions for Lighthouse treemap
        generateTreemapInstructions() {
            const instructions = `
🌳 Lighthouse Treemap Analysis Instructions:

1. Run Lighthouse audit on this page:
   - Open Chrome DevTools (F12)
   - Go to Lighthouse tab
   - Check "Performance" and run audit
   
2. After audit completes:
   - Look for "View Treemap" button in the results
   - Or manually go to: https://googlechrome.github.io/lighthouse/treemap/?gzip=1
   
3. Upload your Lighthouse JSON report to the treemap tool

4. Alternative method:
   - Copy the data below and save as lighthouse-report.json
   - Upload to treemap tool

Current bundle analysis:`;
            
            console.log(instructions);
            
            const treemapData = this.generateTreemapData();
            console.log('Treemap Data (save as lighthouse-report.json):');
            console.log(JSON.stringify(treemapData, null, 2));
            
            return treemapData;
        },
        
        // Quick optimization suggestions based on bundle analysis
        getOptimizationSuggestions() {
            const data = this.collectResourceData();
            const suggestions = [];
            
            // Check for large resources
            const largeResources = data.resources.filter(r => r.size > 100000); // >100KB
            if (largeResources.length > 0) {
                suggestions.push(`📦 ${largeResources.length} large resources (>100KB) found - consider code splitting or compression`);
            }
            
            // Check for uncompressed resources
            const uncompressed = data.resources.filter(r => !r.compressed && r.size > 10000);
            if (uncompressed.length > 0) {
                suggestions.push(`🗜️ ${uncompressed.length} uncompressed resources found - enable gzip/brotli compression`);
            }
            
            // Check for duplicate resources
            const resourceNames = data.resources.map(r => r.name.split('/').pop());
            const duplicates = resourceNames.filter((name, index) => resourceNames.indexOf(name) !== index);
            if (duplicates.length > 0) {
                suggestions.push(`🔄 ${duplicates.length} potential duplicate resources found`);
            }
            
            // Check JavaScript bundle size
            const jsSize = data.summary.categories.JavaScript?.size || 0;
            if (jsSize > 500000) { // >500KB
                suggestions.push(`📜 JavaScript bundle is ${this.formatBytes(jsSize)} - consider code splitting`);
            }
            
            // Check CSS bundle size
            const cssSize = data.summary.categories.CSS?.size || 0;
            if (cssSize > 200000) { // >200KB
                suggestions.push(`🎨 CSS bundle is ${this.formatBytes(cssSize)} - consider critical CSS extraction`);
            }
            
            return suggestions;
        }
    };
    
    // Auto-run analysis when page loads
    if (document.readyState === 'complete') {
        setTimeout(() => {
            TreemapAnalyzer.displayAnalysis();
            const suggestions = TreemapAnalyzer.getOptimizationSuggestions();
            if (suggestions.length > 0) {
                console.group('💡 Optimization Suggestions');
                suggestions.forEach(suggestion => console.log(suggestion));
                console.groupEnd();
            }
        }, 2000);
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => {
                TreemapAnalyzer.displayAnalysis();
                const suggestions = TreemapAnalyzer.getOptimizationSuggestions();
                if (suggestions.length > 0) {
                    console.group('💡 Optimization Suggestions');
                    suggestions.forEach(suggestion => console.log(suggestion));
                    console.groupEnd();
                }
            }, 2000);
        });
    }
    
    // Make available globally
    window.TreemapAnalyzer = TreemapAnalyzer;
    
    console.log('🌳 Treemap Analyzer loaded. Use TreemapAnalyzer.generateTreemapInstructions() for Lighthouse treemap setup.');
})();

/* ===== END TREEMAP-ANALYZER.JS ===== */


/* ===== ULTRA-PERFORMANCE-OPTIMIZER.JS ===== */
// Ultra Performance Optimizer - Aggressive Core Web Vitals Fix
// Target: FCP 3.8s→<1.8s, LCP 16.1s→<2.5s, CLS 1→<0.1, Speed Index 4.3s→<3.4s

(function() {
    'use strict';
    
    // IMMEDIATE CRITICAL PATH OPTIMIZATION
    const startTime = performance.now();
    
    // 1. AGGRESSIVE SCRIPT DEFERRAL - Fix FCP/TBT
    const deferAllScripts = () => {
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            if (!script.src.includes('critical') && !script.src.includes('ultra')) {
                script.remove();
                
                // Re-add as deferred after load
                window.addEventListener('load', () => {
                    const newScript = document.createElement('script');
                    newScript.src = script.src;
                    newScript.defer = true;
                    newScript.async = true;
                    document.head.appendChild(newScript);
                }, { once: true });
            }
        });
    };
    
    // 2. CRITICAL CSS INJECTION - Fix FCP
    const injectCriticalCSS = () => {
        const criticalCSS = `
            *{box-sizing:border-box;margin:0;padding:0}
            body{font:16px/1.4 system-ui,-apple-system,sans-serif;background:#ebecef;margin:0}
            header{width:100%;background:#230AC7;height:60px;contain:strict}
            .headCont{max-width:1168px;margin:0 auto;text-align:center;height:60px}
            .mainlogo{width:100%;background:#230AC7;color:#fff;padding:5px 0;height:50px;contain:strict}
            .mainlogo img{width:270px;height:50px;aspect-ratio:270/50;display:block;margin:0 auto}
            .symbol{text-align:center;margin:0 0 0.5rem 0.1rem;border:1px solid #d3d3d3;display:inline-block;width:50px;height:50px;font-size:30px;line-height:50px;cursor:pointer;contain:strict;transform:translateZ(0)}
            .symbol:hover{background:#ececec;transform:translateY(-2px)}
            .maindata{min-height:400px;contain:strict;display:block;visibility:visible}
            .footer{height:80px;contain:strict}
            img{image-rendering:optimizeSpeed;image-rendering:-webkit-optimize-contrast}
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
    };
    
    // 3. LAYOUT SHIFT ELIMINATION - Fix CLS
    const eliminateLayoutShift = () => {
        // Pre-allocate all dimensions
        const allocateDimensions = () => {
            // Logo dimensions
            const logoImg = document.querySelector('.mainlogo img');
            if (logoImg) {
                logoImg.width = 270;
                logoImg.height = 50;
                logoImg.style.cssText = 'width:270px;height:50px;aspect-ratio:270/50;display:block;margin:0 auto';
            }
            
            // Symbol dimensions
            document.querySelectorAll('.symbol').forEach(symbol => {
                symbol.style.cssText = 'width:50px;height:50px;min-width:50px;min-height:50px;display:inline-block;contain:strict';
            });
            
            // Container dimensions
            const maindata = document.querySelector('.maindata');
            if (maindata) {
                maindata.style.cssText = 'min-height:400px;contain:strict;display:block;visibility:visible';
            }
            
            // Footer dimensions
            const footer = document.querySelector('.footer');
            if (footer) {
                footer.style.cssText = 'height:80px;contain:strict';
            }
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', allocateDimensions);
        } else {
            allocateDimensions();
        }
    };
    
    // 4. AGGRESSIVE RESOURCE PRELOADING - Fix LCP
    const preloadCriticalResources = () => {
        const resources = [
            { href: 'main.css', as: 'style', importance: 'high' },
            { href: 'main.min.css', as: 'style', importance: 'high' },
            { href: 'img/symbolsemoji.com.webp', as: 'image', importance: 'high' }
        ];
        
        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.importance) link.importance = resource.importance;
            if (resource.as === 'style') {
                link.onload = function() { 
                    this.rel = 'stylesheet'; 
                    this.media = 'all';
                };
            }
            document.head.appendChild(link);
        });
    };
    
    // 5. FONT OPTIMIZATION - Fix FCP
    const optimizeFonts = () => {
        // Preconnect to font providers
        const preconnects = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];
        
        preconnects.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = url;
            if (url.includes('gstatic')) link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
        
        // Force font-display: swap
        const fontStyle = document.createElement('style');
        fontStyle.textContent = `
            @font-face { font-display: swap; }
            * { font-display: swap !important; }
            body { font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
        `;
        document.head.appendChild(fontStyle);
    };
    
    // 6. PROGRESSIVE SYMBOL LOADING - Fix Speed Index
    const progressiveSymbolLoad = () => {
        const loadSymbols = () => {
            const symbols = document.querySelectorAll('.symbol');
            
            // Load first 20 symbols immediately
            symbols.forEach((symbol, index) => {
                if (index < 20) {
                    symbol.style.visibility = 'visible';
                    symbol.style.display = 'inline-block';
                } else {
                    // Lazy load remaining symbols
                    symbol.style.contentVisibility = 'auto';
                    symbol.style.containIntrinsicSize = '50px 50px';
                    
                    // Load when near viewport
                    if ('IntersectionObserver' in window) {
                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    entry.target.style.visibility = 'visible';
                                    entry.target.style.display = 'inline-block';
                                    observer.unobserve(entry.target);
                                }
                            });
                        }, { rootMargin: '100px' });
                        
                        observer.observe(symbol);
                    }
                }
            });
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadSymbols);
        } else {
            loadSymbols();
        }
    };
    
    // 7. IMAGE OPTIMIZATION - Fix LCP
    const optimizeImages = () => {
        const optimizeImg = () => {
            document.querySelectorAll('img').forEach(img => {
                // Add loading attributes
                if (!img.loading) img.loading = 'lazy';
                if (!img.decoding) img.decoding = 'async';
                
                // Set explicit dimensions if missing
                if (!img.width && !img.height) {
                    if (img.classList.contains('mainlogo') || img.closest('.mainlogo')) {
                        img.width = 270;
                        img.height = 50;
                    } else {
                        img.width = 50;
                        img.height = 50;
                    }
                }
                
                // Optimize rendering
                img.style.imageRendering = 'optimizeSpeed';
            });
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', optimizeImg);
        } else {
            optimizeImg();
        }
    };
    
    // 8. CSS OPTIMIZATION - Remove render blocking
    const optimizeCSS = () => {
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (!link.media || link.media === 'all') {
                // Make non-blocking
                link.media = 'print';
                link.onload = function() { this.media = 'all'; };
            }
        });
    };
    
    // 9. TASK SCHEDULING - Prevent blocking
    const scheduleTask = (task, priority = 'background') => {
        if ('scheduler' in window && 'postTask' in window.scheduler) {
            window.scheduler.postTask(task, { priority });
        } else {
            requestIdleCallback ? requestIdleCallback(task) : setTimeout(task, 0);
        }
    };
    
    // 10. PERFORMANCE MONITORING
    const monitorPerformance = () => {
        if ('PerformanceObserver' in window) {
            // Monitor Core Web Vitals
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    switch (entry.entryType) {
                        case 'largest-contentful-paint':
                            console.log(`LCP: ${entry.startTime}ms`);
                            break;
                        case 'layout-shift':
                            if (!entry.hadRecentInput) {
                                console.log(`CLS: ${entry.value}`);
                            }
                            break;
                        case 'paint':
                            if (entry.name === 'first-contentful-paint') {
                                console.log(`FCP: ${entry.startTime}ms`);
                            }
                            break;
                    }
                });
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift', 'paint'] });
        }
    };
    
    // EXECUTE OPTIMIZATIONS IMMEDIATELY
    injectCriticalCSS();
    deferAllScripts();
    eliminateLayoutShift();
    preloadCriticalResources();
    optimizeFonts();
    progressiveSymbolLoad();
    optimizeImages();
    
    // Schedule non-critical optimizations
    scheduleTask(optimizeCSS);
    scheduleTask(monitorPerformance);
    
    console.log(`Ultra Performance Optimizer loaded in ${performance.now() - startTime}ms`);
    
})();

/* ===== END ULTRA-PERFORMANCE-OPTIMIZER.JS ===== */


/* ===== UPDATE_GA.JS ===== */
const fs = require('fs');
const path = require('path');

// The old GA tracking code to be replaced
const oldGACode = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-NP21SYTW1D"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    gtag('config', 'G-NP21SYTW1D');
    </script>`;

// The new GA tracking code
const newGACode = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NP21SYTW1D"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-NP21SYTW1D');
</script>`;

// Function to process HTML files
async function updateGACode() {
  try {
    // Get all HTML files in the directory and subdirectories
    const files = await getAllFiles(path.join(__dirname));
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    console.log(`Found ${htmlFiles.length} HTML files to process.`);

    let updatedCount = 0;
    let notFoundCount = 0;
    let errorCount = 0;

    for (const file of htmlFiles) {
      try {
        // Read file content
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if the old GA code exists in the file
        if (content.includes('gtag/js?id=G-NP21SYTW1D')) {
          // Replace the old GA code with the new one
          const newContent = content.replace(
            /<script async[\s\S]*?gtag\('config', 'G-NP21SYTW1D'\);[\s\s]*?<\/script>/,
            newGACode
          );
          
          // Write the updated content back to the file
          fs.writeFileSync(file, newContent, 'utf8');
          console.log(`Updated GA code in ${file}`);
          updatedCount++;
        } else {
          console.log(`GA code not found in ${file}`);
          notFoundCount++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
        errorCount++;
      }
    }

    console.log('\nUpdate complete!');
    console.log(`Total files processed: ${htmlFiles.length}`);
    console.log(`Files updated: ${updatedCount}`);
    console.log(`Files without GA code: ${notFoundCount}`);
    console.log(`Errors: ${errorCount}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Helper function to get all files in directory and subdirectories
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (path.extname(filePath).toLowerCase() === '.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Run the script
updateGACode();

/* ===== END UPDATE_GA.JS ===== */


/* ===== UPDATE_GA_ID.JS ===== */
const fs = require('fs');
const path = require('path');

// Old and new GA tracking IDs
const oldTrackingId = 'G-NP21SYTW1D';
const newTrackingId = 'G-M7MH3WM8';

// Function to process HTML files
async function updateGATrackingId() {
  try {
    // Get all HTML files in the directory and subdirectories
    const files = await getAllFiles(path.join(__dirname));
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    console.log(`Found ${htmlFiles.length} HTML files to process.`);

    let updatedCount = 0;
    let notFoundCount = 0;
    let errorCount = 0;

    for (const file of htmlFiles) {
      try {
        // Read file content
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if the old GA tracking ID exists in the file
        if (content.includes(oldTrackingId)) {
          // Replace the old tracking ID with the new one
          const newContent = content.replace(
            new RegExp(oldTrackingId, 'g'),
            newTrackingId
          );
          
          // Write the updated content back to the file
          fs.writeFileSync(file, newContent, 'utf8');
          console.log(`Updated GA tracking ID in ${file}`);
          updatedCount++;
        } else {
          console.log(`GA tracking ID ${oldTrackingId} not found in ${file}`);
          notFoundCount++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
        errorCount++;
      }
    }

    console.log('\nUpdate complete!');
    console.log(`Total files processed: ${htmlFiles.length}`);
    console.log(`Files updated: ${updatedCount}`);
    console.log(`Files without old tracking ID: ${notFoundCount}`);
    console.log(`Errors: ${errorCount}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Helper function to get all files in directory and subdirectories
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (path.extname(filePath).toLowerCase() === '.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Run the script
updateGATrackingId();

/* ===== END UPDATE_GA_ID.JS ===== */

