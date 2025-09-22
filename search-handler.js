/**
 * Search Handler for symbolsemoji.com
 * Handles ?q= search URLs with proper canonical tags and SEO
 * Implements Option A: noindex search results with self-canonical
 */

(function() {
    'use strict';
    
    // Get URL parameters
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    
    // Normalize search term for consistent URLs
    function normalizeSearchTerm(term) {
        if (!term) return '';
        return decodeURIComponent(term)
            .trim()
            .replace(/\s+/g, ' ') // Normalize spaces
            .toLowerCase();
    }
    
    // Create proper canonical URL for search
    function getSearchCanonicalUrl(searchTerm) {
        if (!searchTerm) return 'https://www.symbolsemoji.com/';
        
        // Encode the search term properly for URL
        const encodedTerm = encodeURIComponent(searchTerm);
        return `https://www.symbolsemoji.com/?q=${encodedTerm}`;
    }
    
    // Update page meta tags for search results
    function updateSearchMetaTags(searchTerm) {
        const head = document.head;
        
        // Remove existing canonical if present
        const existingCanonical = head.querySelector('link[rel="canonical"]');
        if (existingCanonical) {
            existingCanonical.remove();
        }
        
        // Remove existing robots meta if present
        const existingRobots = head.querySelector('meta[name="robots"]');
        if (existingRobots) {
            existingRobots.remove();
        }
        
        if (searchTerm) {
            // Add noindex,follow for search results
            const robotsMeta = document.createElement('meta');
            robotsMeta.name = 'robots';
            robotsMeta.content = 'noindex,follow';
            head.appendChild(robotsMeta);
            
            // Add self-canonical for search results
            const canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            canonicalLink.href = getSearchCanonicalUrl(searchTerm);
            head.appendChild(canonicalLink);
            
            // Update title for search results
            const title = document.querySelector('title');
            if (title) {
                title.textContent = `Search results for "${searchTerm}" | Symbols Emoji`;
            }
            
            // Update meta description for search results
            const description = head.querySelector('meta[name="description"]');
            if (description) {
                description.content = `Search results for "${searchTerm}" - Find cool symbols, emojis, and special characters to copy and paste.`;
            }
        } else {
            // For empty search, keep normal indexing but canonical to homepage
            const robotsMeta = document.createElement('meta');
            robotsMeta.name = 'robots';
            robotsMeta.content = 'index,follow';
            head.appendChild(robotsMeta);
            
            const canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            canonicalLink.href = 'https://www.symbolsemoji.com/';
            head.appendChild(canonicalLink);
        }
    }
    
    // Filter symbols based on search term
    function filterSymbols(searchTerm) {
        if (!searchTerm) return;
        
        const symbols = document.querySelectorAll('.symbol');
        const searchLower = searchTerm.toLowerCase();
        let visibleCount = 0;
        
        symbols.forEach(symbol => {
            const symbolText = symbol.textContent.toLowerCase();
            const symbolTitle = symbol.getAttribute('title') || '';
            const isMatch = symbolText.includes(searchLower) || 
                           symbolTitle.toLowerCase().includes(searchLower);
            
            if (isMatch) {
                symbol.style.display = '';
                visibleCount++;
            } else {
                symbol.style.display = 'none';
            }
        });
        
        // Show search results info
        showSearchResults(searchTerm, visibleCount);
    }
    
    // Display search results information
    function showSearchResults(searchTerm, count) {
        // Remove existing search info
        const existingInfo = document.querySelector('.search-results-info');
        if (existingInfo) {
            existingInfo.remove();
        }
        
        // Create search results info
        const searchInfo = document.createElement('div');
        searchInfo.className = 'search-results-info';
        searchInfo.style.cssText = `
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
            font-size: 16px;
            color: #495057;
        `;
        
        if (count > 0) {
            searchInfo.innerHTML = `
                <strong>Search Results for "${searchTerm}"</strong><br>
                Found ${count} matching symbol${count !== 1 ? 's' : ''}
            `;
        } else {
            searchInfo.innerHTML = `
                <strong>No Results Found</strong><br>
                No symbols found matching "${searchTerm}". Try a different search term.
            `;
        }
        
        // Insert after the main title
        const mainTitle = document.querySelector('.titlesymbol, h1');
        if (mainTitle && mainTitle.parentNode) {
            mainTitle.parentNode.insertBefore(searchInfo, mainTitle.nextSibling);
        }
    }
    
    // Add search box to the page
    function addSearchBox() {
        const searchTerm = getUrlParameter('q') || '';
        
        // Create search box HTML
        const searchBoxHtml = `
            <div class="search-box-container" style="
                background: white;
                border: 2px solid #230AC7;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                text-align: center;
                box-shadow: 0 2px 10px rgba(35, 10, 199, 0.1);
            ">
                <h2 style="margin: 0 0 15px 0; color: #230AC7; font-size: 20px;">Search Symbols</h2>
                <form onsubmit="return handleSearch(event)" style="display: flex; gap: 10px; max-width: 500px; margin: 0 auto;">
                    <input 
                        type="text" 
                        id="search-input" 
                        name="q" 
                        value="${searchTerm}" 
                        placeholder="Search for symbols, emojis, hearts, arrows..." 
                        style="
                            flex: 1;
                            padding: 12px;
                            border: 1px solid #ddd;
                            border-radius: 5px;
                            font-size: 16px;
                            outline: none;
                        "
                    >
                    <button type="submit" style="
                        background: #230AC7;
                        color: white;
                        border: none;
                        padding: 12px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: bold;
                    ">Search</button>
                </form>
                ${searchTerm ? `<p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
                    <a href="/" style="color: #230AC7; text-decoration: none;">← Back to all symbols</a>
                </p>` : ''}
            </div>
        `;
        
        // Insert search box after header
        const mainbox = document.querySelector('.mainbox, .container');
        if (mainbox) {
            mainbox.insertAdjacentHTML('afterbegin', searchBoxHtml);
        }
    }
    
    // Handle search form submission
    window.handleSearch = function(event) {
        event.preventDefault();
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            // Redirect to search URL
            window.location.href = `/?q=${encodeURIComponent(searchTerm)}`;
        } else {
            // Redirect to homepage if empty
            window.location.href = '/';
        }
        return false;
    };
    
    // Initialize search functionality
    function initializeSearch() {
        const searchTerm = getUrlParameter('q');
        const normalizedTerm = normalizeSearchTerm(searchTerm);
        
        // Update meta tags for SEO
        updateSearchMetaTags(normalizedTerm);
        
        // Add search box to page
        addSearchBox();
        
        // Filter symbols if there's a search term
        if (normalizedTerm) {
            // Wait for DOM to be ready, then filter
            setTimeout(() => filterSymbols(normalizedTerm), 100);
        }
        
        // Update browser history with normalized URL if needed
        if (searchTerm && searchTerm !== normalizedTerm) {
            const newUrl = normalizedTerm ? 
                `/?q=${encodeURIComponent(normalizedTerm)}` : '/';
            history.replaceState(null, '', newUrl);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSearch);
    } else {
        initializeSearch();
    }
    
})();
