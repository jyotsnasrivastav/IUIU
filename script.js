
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

	// Ad blocker removed to allow Google AdSense and other legitimate ads

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
		console.log('📦 Loading dependencies...');
		await ensureScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', () => window.jQuery);
		console.log('✅ jQuery loaded:', !!window.jQuery);
		
		// Try the newer version first
		const infiniteScrollLoaded = await ensureScript('https://unpkg.com/infinite-scroll@4/dist/infinite-scroll.pkgd.min.js', () => window.InfiniteScroll);
		
		if (!infiniteScrollLoaded) {
			console.log('⚠️ Modern InfiniteScroll failed, trying jQuery plugin...');
			await ensureScript('https://cdnjs.cloudflare.com/ajax/libs/jquery-infinitescroll/3.0.6/infinite-scroll.pkgd.min.js', () => window.jQuery && jQuery.fn.infiniteScroll);
		}
		
		console.log('📦 Dependencies loaded. jQuery:', !!window.jQuery, 'InfiniteScroll:', !!window.InfiniteScroll, 'jQuery plugin:', !!(window.jQuery && jQuery.fn.infiniteScroll));
	}

	function initInfiniteScroll() {
		console.log('🚀 Initializing infinite scroll...');
		
		const container = document.querySelector('.maindata');
		const nextLink = document.querySelector('.page-next');
		
		if (!container) {
			console.error('❌ Container .maindata not found');
			return;
		}
		
		console.log('📋 Next page link:', nextLink ? nextLink.href : 'Not found');
		
		// Try modern InfiniteScroll first
		if (window.InfiniteScroll) {
			console.log('✅ Using modern InfiniteScroll');
			
			const infScroll = new InfiniteScroll(container, {
				path: '.page-next',
				append: '.symbol',
				history: 'push',
				status: '.page-load-status',
				hideNav: '.page',
				debug: true,
				// Add scroll threshold
				scrollThreshold: 400
			});
			
			infScroll.on('request', function() {
				console.log('📡 Modern infinite scroll request started');
				snapshotPage();
			});
			
			infScroll.on('load', function(response, path) {
				console.log('✅ Modern loaded page:', path);
			});
			
			infScroll.on('error', function(error, path) {
				console.error('❌ Modern error loading page:', path, error);
			});
			
			infScroll.on('last', function() {
				console.log('🏁 Modern last page reached');
			});
			
			console.log('🎉 Modern infinite scroll initialized');
			return;
		}
		
		// Fallback to jQuery plugin
		if (!window.jQuery || !(jQuery.fn && jQuery.fn.infiniteScroll)) {
			console.error('❌ Neither modern InfiniteScroll nor jQuery plugin available');
			return;
		}
		
		console.log('✅ Using jQuery infinite scroll plugin');
		const $container = jQuery('.maindata');
		if (!$container.length) {
			console.error('❌ jQuery container .maindata not found');
			return;
		}
		
		$container.infiniteScroll({
			path: '.page-next',
			append: '.symbol',
			history: 'push',
			status: '.page-load-status',
			debug: true,
			// Add scroll threshold
			scrollThreshold: 400
		})
		.on('request.infiniteScroll', function() {
			console.log('📡 jQuery infinite scroll request started');
			snapshotPage();
		})
		.on('load.infiniteScroll', function(event, response, path) {
			console.log('✅ jQuery loaded page:', path);
		})
		.on('error.infiniteScroll', function(event, error, path) {
			console.error('❌ jQuery error loading page:', path, error);
		})
		.on('last.infiniteScroll', function() {
			console.log('🏁 jQuery last page reached');
		});
		
		console.log('🎉 jQuery infinite scroll initialized');
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


