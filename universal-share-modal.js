/**
 * Universal Share Modal with Working Social Media Icons
 */

let currentSymbol = '';

document.addEventListener('DOMContentLoaded', function() {
    initializeShareModal();
});

function initializeShareModal() {
    if (!document.getElementById('shareOverlay')) {
        createShareModalHTML();
    }
    addSymbolClickListeners();
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideSharePopup();
        }
    });
}

function createShareModalHTML() {
    const shareModalHTML = `
        <div class="share-overlay" id="shareOverlay" onclick="hideSharePopup()"></div>
        <div class="share-popup" id="sharePopup" onclick="event.stopPropagation()">
            <div class="share-popup-header">
                <h3 class="share-popup-title">Share Symbol</h3>
                <button class="share-popup-close" onclick="hideSharePopup()">&times;</button>
            </div>
            <div class="share-popup-content">
                <div class="share-symbol-display" id="shareSymbolDisplay" contenteditable="true" role="textbox" aria-label="Edit your text with the symbol"></div>
                <div class="share-options">
                    <button class="share-option whatsapp" onclick="shareToWhatsApp()">
                        <div class="share-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.786"/>
                            </svg>
                        </div>
                        <span>Send to WhatsApp</span>
                    </button>
                    <button class="share-option facebook" onclick="shareToFacebook()">
                        <div class="share-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </div>
                        <span>Send to Facebook</span>
                    </button>
                    <button class="share-option device" onclick="copyToDevice()">
                        <div class="share-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#6c757d">
                                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                            </svg>
                        </div>
                        <span>Send to Device</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', shareModalHTML);
    addShareModalCSS();
}

function addShareModalCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .share-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .share-overlay.show {
            opacity: 1;
            visibility: visible;
        }
        
        .share-popup {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10001;
            min-width: 320px;
            max-width: 90vw;
            display: none;
            animation: slideUp 0.3s ease-out;
        }
        
        .share-popup.show {
            display: block;
        }
        
        @keyframes slideUp {
            from {
                transform: translateX(-50%) translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        .share-popup-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .share-popup-title {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: #333;
        }
        
        .share-popup-close {
            background: none;
            border: none;
            font-size: 24px;
            color: #999;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
        }
        
        .share-popup-close:hover {
            background: #f5f5f5;
            color: #666;
        }
        
        .share-popup-content {
            padding: 0;
        }
        
        .share-symbol-display {
            text-align: center;
            font-size: 48px;
            margin: 15px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 80px;
            cursor: text;
        }
        
        .share-options {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-top: 20px;
        }
        
        .share-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 15px 10px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            background: white;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 12px;
            font-weight: 500;
            text-decoration: none;
            color: #333;
        }
        
        .share-option:hover {
            border-color: #230AC7;
            background: #f8f9ff;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(35, 10, 199, 0.15);
        }
        
        .share-icon {
            font-size: 24px;
            margin-bottom: 8px;
        }
        
        .share-option.whatsapp:hover {
            border-color: #25D366;
            background: #f0fff4;
        }
        
        .share-option.facebook:hover {
            border-color: #1877F2;
            background: #f0f8ff;
        }
        
        .share-option.device:hover {
            border-color: #6c757d;
            background: #f8f9fa;
        }
        
        @media (max-width: 480px) {
            .share-popup {
                min-width: 280px;
                max-width: 85vw;
                padding: 15px;
                bottom: 15px;
            }
            .share-options {
                grid-template-columns: 1fr;
                gap: 8px;
            }
            .share-option {
                flex-direction: row;
                justify-content: flex-start;
                padding: 10px 12px;
            }
            .share-icon {
                margin-bottom: 0;
                margin-right: 10px;
            }
            .share-option span {
                font-size: 13px;
                text-align: left;
            }
        }
        
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 14px;
            z-index: 10001;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .toast.show {
            opacity: 1;
        }
    `;
    
    document.head.appendChild(style);
}

function addSymbolClickListeners() {
    const symbolSelectors = [
        '.symbol',
        '.symbolscontainer .symbol',
        '.symbols-grid .symbol',
        '.symbol-item',
        '.symbol-box'
    ];
    
    symbolSelectors.forEach(selector => {
        const symbols = document.querySelectorAll(selector);
        symbols.forEach(symbol => {
            symbol.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const symbolText = this.textContent.trim();
                if (symbolText) {
                    currentSymbol = symbolText;
                    showSharePopup();
                }
            });
        });
    });
}

function showSharePopup() {
    const overlay = document.getElementById('shareOverlay');
    const popup = document.getElementById('sharePopup');
    const symbolDisplay = document.getElementById('shareSymbolDisplay');
    let input = document.getElementById('shareTextInput');
    
    if (overlay && popup && symbolDisplay) {
        // Put the selected symbol in the editable display area
        symbolDisplay.textContent = currentSymbol;
        symbolDisplay.setAttribute('contenteditable','true');
        overlay.classList.add('show');
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Focus the editable symbol area to open mobile keyboard and let user type between emojis
        setTimeout(function(){
            try { symbolDisplay.focus({ preventScroll: true }); } catch(e){ symbolDisplay.focus(); }
            // Place caret at end
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(symbolDisplay);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        }, 50);
    }
}

function hideSharePopup() {
    const overlay = document.getElementById('shareOverlay');
    const popup = document.getElementById('sharePopup');
    
    if (overlay && popup) {
        overlay.classList.remove('show');
        popup.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function getComposedShareText() {
    const display = document.getElementById('shareSymbolDisplay');
    const displayText = (display && display.textContent || '').trim();
    // Use what the user actually sees/edited in the display box
    return displayText || currentSymbol || '';
}

async function copyToDevice() {
    if (!currentSymbol) return;
    const composed = getComposedShareText();
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(composed);
            showToast('✅ Copied to clipboard!');
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = composed;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('✅ Copied to clipboard!');
        }
    } catch (error) {
        console.error('Copy failed:', error);
        showToast('❌ Copy failed. Please try again.');
    }
    
    hideSharePopup();
}

function shareToWhatsApp() {
    if (!currentSymbol) return;
    const message = getComposedShareText();
    const encodedMessage = encodeURIComponent(message);
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        const whatsappAppUrl = 'whatsapp://send?text=' + encodedMessage;
        const whatsappWebUrl = 'https://wa.me/?text=' + encodedMessage;
        
        window.location.href = whatsappAppUrl;
        setTimeout(function() {
            window.open(whatsappWebUrl, '_blank');
        }, 1000);
    } else {
        const whatsappWebUrl = 'https://web.whatsapp.com/send?text=' + encodedMessage;
        window.open(whatsappWebUrl, '_blank');
    }
    
    showToast('📱 Opening WhatsApp...');
    hideSharePopup();
}

function shareToFacebook() {
    if (!currentSymbol) return;
    const message = getComposedShareText();
    const url = window.location.href;
    const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&quote=' + encodeURIComponent(message);
    
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    showToast('📘 Opening Facebook...');
    hideSharePopup();
}

function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}
