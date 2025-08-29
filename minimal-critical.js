// Minimal non-blocking script for critical functionality
(function(){
'use strict';

// Essential clipboard function only
window.copyToClipboard=async function(text,ev){
try{
if(navigator.clipboard&&navigator.clipboard.writeText){
await navigator.clipboard.writeText(text);
}else{
const ta=document.createElement('textarea');
ta.value=text;
ta.style.position='fixed';
ta.style.left='-9999px';
document.body.appendChild(ta);
ta.select();
document.execCommand('copy');
document.body.removeChild(ta);
}
const el=document.createElement('div');
el.className='copy message';
el.innerText='Copied';
el.style.cssText='position:fixed;top:20px;right:20px;background:#230AC7;color:white;padding:10px;border-radius:5px;z-index:10000;font-size:14px';
document.body.appendChild(el);
setTimeout(()=>{if(el.parentNode)el.parentNode.removeChild(el)},1500);
}catch(e){console.warn('Copy failed:',e)}
};

// Minimal symbol container functions
window.addSymbolToContainer=function(text){
const container=document.getElementById('symbol-container');
if(!container)return;
const div=document.createElement('div');
div.className='symbol';
div.textContent=text;
div.onclick=function(){window.copyToClipboard(text)};
container.insertBefore(div,container.firstChild);
};

// Load non-critical scripts after page load
window.addEventListener('load',function(){
setTimeout(function(){
if(!window.jQuery){
const s=document.createElement('script');
s.src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js';
s.async=true;
document.head.appendChild(s);
}
},100);
});

})();