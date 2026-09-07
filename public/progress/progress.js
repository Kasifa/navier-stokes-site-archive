(() => {
  'use strict';
  const lang=document.documentElement.dataset.language==='en'?'en':'zh';
  if(document.querySelector('#route-map')&&!document.querySelector('#public-progress-entry')){
    const link=document.createElement('a');link.id='public-progress-entry';link.href='/progress/?lang='+lang;link.textContent=lang==='en'?'Progress overviews (48-hour batches)':'进展概要（每两天汇总）';
    document.querySelector('footer')?.append(document.createElement('br'),link);
  }
  fetch('/progress/overview-index.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('overview index unavailable');return r.json();}).then(({entries})=>{
    for(const list of document.querySelectorAll('[data-progress-list]')){
      const language=list.closest('[data-language]')?.dataset.language||lang;
      if(entries.length){const empty=list.closest('main')?.querySelector('footer');if(empty)empty.hidden=true;}
      for(const item of [...entries].reverse()){
        const card=document.createElement('article');card.className='paper-card';
        const h=document.createElement('h2'),a=document.createElement('a');a.href='/progress/'+encodeURIComponent(item.release_id)+'.html?lang='+language;a.textContent=item.title[language];h.append(a);
        const summary=document.createElement('p');summary.textContent=item.summary[language];card.append(h,summary);list.append(card);
      }
    }
    const latest=entries.at(-1),slot=document.querySelector('#clay-b-frequency-activation');
    if(latest&&slot){
      const section=document.createElement('section');section.className='route-overview independent-release-spotlight';section.id='latest-public-progress';
      const inner=document.createElement('div');inner.className='route-overview-inner';const title=document.createElement('h2');title.className='route-map-title';title.textContent=latest.title[lang];
      const p=document.createElement('p');p.className='route-map-intro';p.textContent=latest.summary[lang];const a=document.createElement('a');a.href='/progress/'+encodeURIComponent(latest.release_id)+'.html?lang='+lang;a.textContent=lang==='en'?'Read progress overview →':'阅读进展概要 →';inner.append(title,p,a);section.append(inner);slot.replaceWith(section);
    }
  }).catch(()=>{});
})();
