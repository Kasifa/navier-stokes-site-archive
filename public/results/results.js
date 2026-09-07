(() => {
  'use strict';
  const key='navier-stokes-language-v1';
  const url=new URL(location.href);
  let lang=url.searchParams.get('lang');
  if(!['zh','en'].includes(lang)) { try { lang=localStorage.getItem(key); } catch {} }
  if(!['zh','en'].includes(lang)) lang=navigator.language.toLowerCase().startsWith('zh')?'zh':'en';
  document.documentElement.dataset.language=lang;
  document.documentElement.lang=lang==='zh'?'zh-CN':'en';
  try { localStorage.setItem(key,lang); } catch {}
  const active=document.querySelector(`main[data-language="${lang}"]`);
  document.title=active?.dataset.title||document.title;
  for(const a of active?.querySelectorAll('a[href]')||[]) {
    const target=new URL(a.href,location.href);
    if(target.origin===location.origin && !a.getAttribute('href').startsWith('#') && (target.pathname.endsWith('.html')||target.pathname.endsWith('/'))) { target.searchParams.set('lang',lang);a.href=target.href; }
  }
  const button=document.createElement('button');
  button.type='button';button.className='language-switcher';
  button.textContent=lang==='zh'?'English':'中文';button.setAttribute('aria-label',lang==='zh'?'切换为 English':'Switch to Chinese');
  button.addEventListener('click',()=> { const next=lang==='zh'?'en':'zh';const nextUrl=new URL(location.href);nextUrl.searchParams.set('lang',next);nextUrl.hash=nextUrl.hash.replace(/^#(?:zh|en)-/,'#'+next+'-');location.assign(nextUrl); });
  document.body.append(button);
  if(url.hash && /^#(?:zh|en)-/.test(url.hash) && !url.hash.startsWith('#'+lang+'-')) { url.hash=url.hash.replace(/^#(?:zh|en)-/,'#'+lang+'-');history.replaceState(null,'',url); }
  const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if(target) target.scrollIntoView();
  window.addEventListener('load',async()=>{if(window.MathJax?.startup?.promise)await window.MathJax.startup.promise;const anchor=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(anchor)anchor.scrollIntoView();},{once:true});
})();

/* Reviewed historical links only; no privacy masking. */
(()=>{const map={"https://github.com/Kasifa/Kasifa.github.io/blob/main/research/r074t_publication_handoff.md": "/historical-sources.html#source-853", "https://github.com/Kasifa/Kasifa.github.io/blob/main/research/r074u_publication_handoff.md": "/historical-sources.html#source-868", "https://github.com/Kasifa/Kasifa.github.io/blob/main/research/r074v_publication_handoff.md": "/historical-sources.html#source-875", "https://github.com/Kasifa/Kasifa.github.io/blob/main/research/r074w_publication_handoff.md": "/historical-sources.html#source-876", "https://github.com/Kasifa/Kasifa.github.io/blob/main/research/r074x_publication_handoff.md": "/historical-sources.html#source-884", "https://github.com/Kasifa/Kasifa.github.io/blob/main/research/r074y_publication_handoff.md": "/historical-sources.html#source-899", "https://github.com/Kasifa/Kasifa.github.io/blob/main/research/r074z_publication_handoff.md": "/historical-sources.html#source-907", "https://github.com/Kasifa/Kasifa.github.io/blob/main/research/r075a_publication_handoff.md": "/historical-sources.html#source-908", "https://github.com/Kasifa/Kasifa.github.io/tree/89b2ba3cc808973a25bc605087e8f6c50ca94df0": "/historical-sources.html#source-1432", "https://github.com/Kasifa/Kasifa.github.io/tree/89b2ba3cc808973a25bc605087e8f6c50ca94df0/research/certificates/r071f": "/historical-sources.html#source-1433", "https://github.com/Kasifa/Kasifa.github.io/tree/89b2ba3cc808973a25bc605087e8f6c50ca94df0/research/certificates/r071t": "/historical-sources.html#source-1434", "https://github.com/Kasifa/Kasifa.github.io/tree/main/figures": "/historical-sources.html#source-1446", "https://github.com/Kasifa/Kasifa.github.io/tree/main/research": "/historical-sources.html#source-1607", "https://github.com/Kasifa/Kasifa.github.io/tree/main/research/certificates": "/historical-sources.html#source-1608"};const fix=()=>{const lang=document.documentElement.dataset.language==='en'?'en':'zh';for(const a of document.querySelectorAll('a[href]')){const key=a.href.split('#')[0];if(map[key]){const [path,hash]=map[key].split('#');a.href=path+'?lang='+lang+'#'+lang+'-'+hash;}}};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fix);else fix();new MutationObserver(fix).observe(document.documentElement,{childList:true,subtree:true});})();
