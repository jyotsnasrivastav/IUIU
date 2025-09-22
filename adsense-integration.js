/**
 * Google AdSense Integration for symbolsemoji.com
 * Handles AdSense ads with proper loading and placement
 */

(function() {
    'use strict';
    
    // Your AdSense publisher ID (replace with your actual ID)
    const ADSENSE_PUBLISHER_ID = 'ca-pub-7064720037053690'; // Using the ID from your HTML
    
    // AdSense configuration
    const ADSENSE_CONFIG = {
        // Auto ads configuration
        autoAds: {
            enabled: true,
            settings: {
                page_level_ads: true,
                overlays: {
                    bottom: true
                }
            }
        },
        
        // Manual ad placements
        adSlots: [
            {
                id: 'top-banner',
                slot: '5788145465', // Your actual top-banner ad slot ID
                size: [[728, 90], [320, 50]], // Responsive sizes
                position: 'header'
            },
            {
                id: 'sidebar-ad',
                slot: '7432399625', // Your actual sidebar ad slot ID
                size: [[300, 250], [336, 280]],
                position: 'sidebar'
            },
            {
                id: 'content-ad',
                slot: '4594822602', // Your actual content-banner ad slot ID
                size: [[728, 90], [320, 100]],
                position: 'content'
            }
        ]
    };
    
    // Check if AdSense should be loaded (not blocked by ad blocker)
    function shouldLoadAdsense() {
        // We will always attempt to load AdSense, but log if an ad blocker is likely
        try {
            const testAd = document.createElement('div');
            testAd.innerHTML = '&nbsp;';
            testAd.className = 'adsbox';
            testAd.style.position = 'absolute';
            testAd.style.left = '-10000px';
            document.body.appendChild(testAd);
            const isBlocked = testAd.offsetHeight === 0;
            document.body.removeChild(testAd);
            if (isBlocked) {
                console.warn('[AdSense] Possible ad blocker detected. Proceeding to load ads anyway.');
            }
            return true; // Always attempt to load to maximize chances
        } catch (e) {
            console.warn('[AdSense] Ad blocker detection failed, proceeding:', e);
            return true; // Default to loading ads if detection fails
        }
    }
    
    // Load AdSense script
    function loadAdsenseScript() {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            if (window.adsbygoogle) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`;
            script.crossOrigin = 'anonymous';
            
            script.onload = () => {
                // Initialize adsbygoogle array if not exists
                window.adsbygoogle = window.adsbygoogle || [];
                resolve();
            };
            
            script.onerror = () => {
                console.warn('AdSense script failed to load');
                reject(new Error('AdSense script load failed'));
            };
            
            document.head.appendChild(script);
        });
    }
    
    // Create ad container HTML
    function createAdContainer(adConfig) {
        const container = document.createElement('div');
        container.className = `adsense-container adsense-${adConfig.position}`;
        container.style.cssText = `
            text-align: center;
            margin: 20px 0;
            min-height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const adElement = document.createElement('ins');
        adElement.className = 'adsbygoogle';
        adElement.style.display = 'block';
        adElement.setAttribute('data-ad-client', ADSENSE_PUBLISHER_ID);
        adElement.setAttribute('data-ad-slot', adConfig.slot);
        
        // Set responsive ad sizes
        if (adConfig.size && adConfig.size.length > 0) {
            if (adConfig.size.length === 1) {
                // Fixed size
                adElement.setAttribute('data-ad-format', 'rectangle');
                adElement.style.width = adConfig.size[0][0] + 'px';
                adElement.style.height = adConfig.size[0][1] + 'px';
            } else {
                // Responsive
                adElement.setAttribute('data-ad-format', 'auto');
                adElement.setAttribute('data-full-width-responsive', 'true');
            }
        }
        
        container.appendChild(adElement);
        return container;
    }
    
    // Place ads in appropriate positions
    function placeAds() {
        ADSENSE_CONFIG.adSlots.forEach(adConfig => {
            const adContainer = createAdContainer(adConfig);
            
            switch (adConfig.position) {
                case 'header':
                    // Place after header
                    const header = document.querySelector('header, .modern-header');
                    if (header && header.parentNode) {
                        header.parentNode.insertBefore(adContainer, header.nextSibling);
                    }
                    break;
                    
                case 'content':
                    // Place content ads - customize frequency here
                    const symbols = document.querySelectorAll('.symbol');
                    const totalSymbols = symbols.length;
                    
                    // Configuration: How many content ads to show
                    const contentAdConfig = {
                        minSymbolsRequired: 10, // Lower threshold so ads place more often
                        adsPerPage: 2,          // Number of content ads per page
                        spacingBetweenAds: 50   // Symbols between each ad
                    };
                    
                    if (totalSymbols >= contentAdConfig.minSymbolsRequired) {
                        for (let i = 0; i < contentAdConfig.adsPerPage; i++) {
                            const position = Math.floor(totalSymbols / (contentAdConfig.adsPerPage + 1)) * (i + 1);
                            const targetSymbol = symbols[position];
                            
                            if (targetSymbol && targetSymbol.parentNode) {
                                const adClone = adContainer.cloneNode(true);
                                targetSymbol.parentNode.insertBefore(adClone, targetSymbol);
                            }
                        }
                    }
                    break;
                    
                case 'sidebar':
                    // Create sidebar if doesn't exist
                    let sidebar = document.querySelector('.sidebar');
                    if (!sidebar) {
                        sidebar = document.createElement('div');
                        sidebar.className = 'sidebar';
                        sidebar.style.cssText = `
                            position: fixed;
                            right: 10px;
                            top: 50%;
                            transform: translateY(-50%);
                            z-index: 1000;
                            max-width: 300px;
                        `;
                        document.body.appendChild(sidebar);
                    }
                    sidebar.appendChild(adContainer);
                    break;
                    
                default:
                    // Append to main content area
                    const mainContent = document.querySelector('.maindata, .container, main');
                    if (mainContent) {
                        mainContent.appendChild(adContainer);
                    }
            }
        });
    }
    
    // Initialize ads after placement
    function initializeAds() {
        try {
            // Push ads to AdSense
            const adElements = document.querySelectorAll('.adsbygoogle');
            adElements.forEach(ad => {
                if (!ad.getAttribute('data-adsbygoogle-status')) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            });
            
            // Enable auto ads if configured
            if (ADSENSE_CONFIG.autoAds.enabled) {
                (window.adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: ADSENSE_PUBLISHER_ID,
                    enable_page_level_ads: true,
                    ...ADSENSE_CONFIG.autoAds.settings
                });
            }

            // Retry once after a short delay in case the script wasn't ready
            setTimeout(() => {
                const pending = document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status])');
                pending.forEach(() => (window.adsbygoogle = window.adsbygoogle || []).push({}));
            }, 1500);
        } catch (e) {
            console.warn('AdSense initialization failed:', e);
        }
    }
    
    // Add CSS for ad containers
    function addAdStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .adsense-container {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 10px;
                margin: 20px 0;
            }
            
            .adsense-header {
                margin-bottom: 20px;
            }
            
            .adsense-content {
                margin: 30px 0;
            }
            
            .adsense-sidebar {
                margin: 10px 0;
            }
            
            @media (max-width: 768px) {
                .adsense-sidebar {
                    position: static !important;
                    transform: none !important;
                    right: auto !important;
                    top: auto !important;
                    max-width: 100% !important;
                    margin: 20px 0 !important;
                }
            }
            
            /* Hide ads during search to improve UX */
            .search-active .adsense-container {
                display: none;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Main initialization function
    async function initializeAdsense() {
        try {
            // Check if ads should be loaded
            if (!shouldLoadAdsense()) {
                console.log('AdSense blocked or disabled');
                return;
            }
            
            // Add styles first
            addAdStyles();
            
            // Load AdSense script
            console.log('[AdSense] Loading AdSense library...');
            await loadAdsenseScript();
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            // Place ads
            console.log('[AdSense] Placing ad containers...');
            placeAds();
            
            // Initialize ads
            setTimeout(() => {
                console.log('[AdSense] Initializing ad slots...');
                initializeAds();
            }, 1000); // Small delay to ensure proper loading
            
            console.log('[AdSense] Initialization flow complete');
            
        } catch (error) {
            console.warn('AdSense initialization failed:', error);
        }
    }
    
    // Hide ads during search for better UX
    function handleSearchState() {
        const urlParams = new URLSearchParams(window.location.search);
        const isSearching = urlParams.has('q') && urlParams.get('q').trim() !== '';
        
        if (isSearching) {
            document.body.classList.add('search-active');
        } else {
            document.body.classList.remove('search-active');
        }
    }
    
    // Initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeAdsense();
            handleSearchState();
        });
    } else {
        initializeAdsense();
        handleSearchState();
    }
    
    // Handle search state changes
    window.addEventListener('popstate', handleSearchState);
    
    // Export for manual control if needed
    window.AdsenseManager = {
        init: initializeAdsense,
        shouldLoad: shouldLoadAdsense,
        handleSearch: handleSearchState
    };
    
})();
