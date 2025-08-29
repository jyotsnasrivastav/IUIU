
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

	// Clipboard helpers
	async function writeToClipboard(text) {
		if (navigator.clipboard && navigator.clipboard.writeText) {
			try { await navigator.clipboard.writeText(text); return true; } catch (e) {}
		}
		const ta = document.createElement('textarea');
		ta.value = text;
		ta.setAttribute('readonly', '');
		ta.style.position = 'absolute';
		ta.style.left = '-9999px';
		document.body.appendChild(ta);
		ta.select();
		try { document.execCommand('copy'); } finally { document.body.removeChild(ta); }
		return true;
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


