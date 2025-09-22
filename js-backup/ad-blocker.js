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
