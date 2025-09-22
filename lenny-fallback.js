(function(){
  'use strict';
  const faces = [
    "( ͡° ͜ʖ ͡°)","( ͡~ ͜ʖ ͡°)","( ͡o ͜ʖ ͡o)","ヽ(͡◕ ͜ʖ ͡◕)ﾉ","( ͡ಠ ʖ̯ ͡ಠ)","( ͡° ʖ̯ ͡°)","( ͡ಥ ͜ʖ ͡ಥ)","(ง ͠° ͟ل͜ ͡°)ง","(づ ͡° ͜ʖ ͡°)づ","( ͡° ʖ̯ ͡°)╭∩╮","( ͡~ ͜ʖ ͡°)╭∩╮","(ʘ ͜ʖ ʘ)","( ͡°益 ͡°)","(☞ ͡° ͜ʖ ͡°)☞","(☞ ͡° ͜ʖ ͡°)☞ ☜( ͡° ͜ʖ ͡°☜)","(づ｡◕‿‿◕｡)づ","(づ￣ ³￣)づ","(｡◕‿‿◕｡)","(╯°□°）╯︵ ┻━┻","┬─┬ ノ( ゜-゜ノ)","(ノಠ益ಠ)ノ彡┻━┻","(▀̿Ĺ̯▀̿ ̿)","(ง'̀-'́)ง","(ง •̀_•́)ง","(☞ﾟヮﾟ)☞","(づ・ω・)づ","(͡• ͜ʖ ͡•)","( ͡o ᵕ ͡o )","( ͡°з ͡°)","( ͡^ ͜ʖ ͡^)","( ˘ ͜ʖ ˘)","( ͡° ͜V ͡°)","( ͡~ ͜ʖ ͡~)","( ͡ಠ ͜ʖ ͡ಠ)","( ͡ಠ ͜ʖ ͡ಠ)╭∩╮","( ͡° ᴥ ͡°)","( ͡°෴ ͡°)","( ͡• ͜ʖ ͡•)つ━☆・*。","(¬‿¬)","(•́ ͜ʖ •̀)","(❍ᴥ❍ʋ)","(☞ ͡° ͜ʖ ͡°)☞","(づ ￣ ³￣)づ","(≖ ͜ʖ≖)","(ʘ‿ʘ)","(♥‿♥)","(ಥ_ಥ)","(╥﹏╥)","(ʘ‿ʘ)ノ✿"
  ];
  function isLennyPage(){
    return /-lenny-face\.html$/i.test(location.pathname) || document.title.toLowerCase().includes('lenny');
  }
  function ready(fn){ if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',fn);} else { fn(); } }
  ready(function(){
    if(!isLennyPage()) return;
    const container = document.querySelector('.maindata') || document.querySelector('.symbolContainer') || document.body;
    const have = document.querySelectorAll('.symbol.lennyface, .symbol').length;
    if(have >= 5) return;
    // Add a header if missing symbols
    const frag = document.createDocumentFragment();
    faces.forEach(txt=>{
      const d = document.createElement('div');
      d.className = 'symbol lennyface';
      d.textContent = txt;
      d.onclick = function(e){ if(window.copyToClipboard){ copyToClipboard(txt, e); } else { navigator.clipboard && navigator.clipboard.writeText(txt); } };
      frag.appendChild(d);
    });
    container.appendChild(frag);
    console.log('[LennyFallback] Injected', faces.length, 'symbols');
  });
})();
