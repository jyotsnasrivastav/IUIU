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
                <div class="share-symbol-display" id="shareSymbolDisplay"></div>
                <div class="share-options">
                    <button class="share-option whatsapp" onclick="shareToWhatsApp()">
                        <div class="share-icon">📱</div>
                        <span>Send to WhatsApp</span>
                    </button>
                    <button class="share-option facebook" onclick="shareToFacebook()">
                        <div class="share-icon">📘</div>
                        <span>Send to Facebook</span>
                    </button>
                    <button class="share-option device" onclick="copyToDevice()">
                        <div class="share-icon">📋</div>
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
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            width: 90%;
            max-width: 400px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .share-popup.show {
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, -50%) scale(1);
        }
        
        .share-popup-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 24px 16px;
            border-bottom: 1px solid #eee;
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
            padding: 24px;
        }
        
        .share-symbol-display {
            text-align: center;
            font-size: 48px;
            margin-bottom: 24px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 2px dashed #ddd;
            min-height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .share-options {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .share-option {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background: white;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 16px;
            font-weight: 500;
            text-decoration: none;
            color: #333;
        }
        
        .share-option:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .share-icon {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            flex-shrink: 0;
        }
        
        .share-option.whatsapp {
            border-color: #25D366;
            color: #25D366;
        }
        
        .share-option.whatsapp:hover {
            background: #25D366;
            color: white;
        }
        
        .share-option.facebook {
            border-color: #1877F2;
            color: #1877F2;
        }
        
        .share-option.facebook:hover {
            background: #1877F2;
            color: white;
        }
        
        .share-option.device {
            border-color: #6c757d;
            color: #6c757d;
        }
        
        .share-option.device:hover {
            background: #6c757d;
            color: white;
        }
        
        @media (max-width: 480px) {
            .share-popup {
                width: 95%;
                margin: 20px;
            }
            
            .share-popup-content {
                padding: 20px;
            }
            
            .share-symbol-display {
                font-size: 36px;
                padding: 16px;
                margin-bottom: 20px;
                min-height: 60px;
            }
            
            .share-option {
                padding: 14px 16px;
                font-size: 15px;
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
    
    if (overlay && popup && symbolDisplay) {
        symbolDisplay.textContent = currentSymbol;
        overlay.classList.add('show');
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';
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

async function copyToDevice() {
    if (!currentSymbol) return;
    
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(currentSymbol);
            showToast('✅ Copied to clipboard!');
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = currentSymbol;
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
    
    const message = 'Check out this cool symbol: ' + currentSymbol + '\n\nGet more symbols at: ' + window.location.origin;
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
    
    const message = 'Check out this cool symbol: ' + currentSymbol;
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
