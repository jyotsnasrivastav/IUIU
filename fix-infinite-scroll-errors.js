const fs = require('fs');

// Fix InfiniteScroll browser errors by improving error handling and link validation
function fixInfiniteScrollErrors() {
    const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
    
    // Enhanced script.js with better error handling
    const enhancedScriptContent = `
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
	Clean site script with enhanced InfiniteScroll error handling
	- Adds, stores, and copies symbols
	- Restores session state
	- Robust Infinite Scroll with proper error handling
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
			/googlesyndication\\.com/i,
			/a\\.pub\\.network|b\\.pub\\.network|c\\.pub\\.network|d\\.pub\\.network/i,
			/amazon-adsystem\\.com/i,
			/btloader\\.com|api\\.btloader\\.com/i,
			/confiant-integrations\\.net/i,
			/pubfig\\.min\\.js|\\/coolsymbol-top\\/pubfig\\.min\\.js/i
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

	// Enhanced InfiniteScroll initialization with proper error handling
	function initInfiniteScroll() {
		if (!window.jQuery || !(jQuery.fn && jQuery.fn.infiniteScroll)) {
			console.warn('InfiniteScroll: jQuery or plugin not available');
			return;
		}
		
		const $container = jQuery('.maindata');
		if (!$container.length) {
			console.warn('InfiniteScroll: Container .maindata not found');
			return;
		}
		
		// Validate next page link exists and is valid
		const nextLink = document.querySelector('.page-next');
		if (!nextLink || !nextLink.href) {
			console.warn('InfiniteScroll: No valid next page link found');
			return;
		}
		
		// Validate href is a proper relative or absolute URL
		const href = nextLink.getAttribute('href');
		if (!href || href === '#' || href === '') {
			console.warn('InfiniteScroll: Invalid next page href:', href);
			return;
		}
		
		try {
			$container.infiniteScroll({
				path: '.page-next',
				append: '.symbol',
				history: 'push',
				status: '.page-load-status',
				// Enhanced error handling
				debug: false,
				loadOnScroll: true,
				scrollThreshold: 400,
				// Handle errors gracefully
				errorCallback: function(xhr, textStatus) {
					console.warn('InfiniteScroll error:', textStatus);
					const errorEl = document.querySelector('.infinite-scroll-error');
					if (errorEl) {
						errorEl.textContent = 'Unable to load more content';
						errorEl.style.display = 'block';
					}
				}
			})
			.on('request.infiniteScroll', function() {
				snapshotPage();
				console.log('InfiniteScroll: Loading next page...');
			})
			.on('load.infiniteScroll', function(event, response, path) {
				console.log('InfiniteScroll: Loaded page:', path);
			})
			.on('error.infiniteScroll', function(event, xhr, path) {
				console.warn('InfiniteScroll: Failed to load:', path);
				// Disable infinite scroll on error
				$container.infiniteScroll('destroy');
				const errorEl = document.querySelector('.infinite-scroll-error');
				if (errorEl) {
					errorEl.textContent = 'End of content reached';
					errorEl.style.display = 'block';
				}
			})
			.on('last.infiniteScroll', function() {
				console.log('InfiniteScroll: Reached last page');
				const lastEl = document.querySelector('.infinite-scroll-last');
				if (lastEl) {
					lastEl.style.display = 'block';
				}
			});
			
			console.log('InfiniteScroll: Successfully initialized');
		} catch (error) {
			console.error('InfiniteScroll: Initialization failed:', error);
		}
	}

	// DOMContentLoaded
	document.addEventListener('DOMContentLoaded', async function () {
		try {
			setOutputFieldValue();
			setTextboxValue();
			onPageLoad();
			await ensureDependencies();
			// Add small delay to ensure DOM is fully ready
			setTimeout(initInfiniteScroll, 100);
		} catch (error) {
			console.error('Script initialization error:', error);
		}
	});
})();
`;

    // Write enhanced script
    fs.writeFileSync('script.js', enhancedScriptContent);
    console.log('Enhanced script.js with better InfiniteScroll error handling');
    
    // Fix HTML files with invalid next page links
    const linkFixes = [
        // Fix pages that might have invalid or missing next links
        {
            from: /<a class="page-next" href="">Next page<\/a>/g,
            to: '<a class="page-next" href="#" style="display:none;">Next page</a>'
        },
        {
            from: /<a class="page-next" href="#">Next page<\/a>/g,
            to: '<a class="page-next" href="#" style="display:none;">Next page</a>'
        },
        // Ensure error elements are properly styled
        {
            from: /<p class="infinite-scroll-error"><\/p>/g,
            to: '<p class="infinite-scroll-error" style="display:none;text-align:center;color:#666;padding:20px;"></p>'
        },
        {
            from: /<p class="infinite-scroll-last">/g,
            to: '<p class="infinite-scroll-last" style="display:none;text-align:center;color:#666;padding:20px;">'
        }
    ];
    
    let totalFixed = 0;
    
    htmlFiles.forEach(file => {
        try {
            let content = fs.readFileSync(file, 'utf8');
            let fileFixed = false;
            
            linkFixes.forEach(fix => {
                if (fix.from.test(content)) {
                    content = content.replace(fix.from, fix.to);
                    fileFixed = true;
                }
            });
            
            if (fileFixed) {
                fs.writeFileSync(file, content);
                console.log(`Fixed InfiniteScroll links in: ${file}`);
                totalFixed++;
            }
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    });
    
    console.log(`\\nInfiniteScroll fixes complete! Enhanced script and fixed ${totalFixed} files.`);
    console.log('Improvements:');
    console.log('- Enhanced error handling and validation');
    console.log('- Proper link validation before initialization');
    console.log('- Graceful degradation when links are invalid');
    console.log('- Better console logging for debugging');
    console.log('- Automatic cleanup on errors');
}

// Run the fix
console.log('Fixing InfiniteScroll browser errors...');
fixInfiniteScrollErrors();
console.log('\\n✅ InfiniteScroll error fixes complete!');
