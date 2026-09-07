(() => {
  'use strict';
  const english = document.documentElement.dataset.language === 'en';
  const controllers = [];
  for (const [index, tree] of [...document.querySelectorAll('#route-map .route-tree')].entries()) {
    const steps = [...tree.children].filter(child => child.classList.contains('tree-row') && !child.matches('.tree-junction,.r0-public-boundary-row,.clay-b-public-boundary-row'));
    if (!steps.length) continue;
    const count = Math.min(4, steps.length);
    const isCB = tree.classList.contains('clay-b-route-tree');
    for (const step of steps.slice(-count)) {
      step.dataset.routePreview = '';
      const node = step.querySelector('.tree-node');
      if (!node || [...node.querySelectorAll('a[href]')].some(a => !a.closest('details'))) continue;
      const candidates = [...node.querySelectorAll('a[href$=".html"]')];
      const latest = candidates.at(-1);
      if (latest) {
        const p = document.createElement('p'); p.className = 'route-preview-read';
        const a = document.createElement('a'); a.href = latest.getAttribute('href');
        a.textContent = english ? `Read ${latest.textContent.trim()} →` : `阅读 ${latest.textContent.trim()} →`;
        p.append(a); node.append(p);
      }
    }
    const lane = isCB ? 'CB' : 'R0';
    tree.id ||= `route-fold-content-${index+1}`;
    const heading = document.createElement('div'); heading.className = 'route-fold-heading'; heading.id = `route-fold-heading-${index+1}`;
    const status = document.createElement('p'); status.setAttribute('aria-live','polite'); heading.append(status);
    const continuation = document.createElement('div'); continuation.className = 'route-fold-continuation'; continuation.setAttribute('aria-hidden','true');
    const footer = document.createElement('div'); footer.className = 'route-fold-footer';
    const buttons = [heading,footer].map(parent => { const button = document.createElement('button'); button.type = 'button'; button.className = 'route-fold-toggle'; button.setAttribute('aria-controls',tree.id); parent.append(button); return button; });
    tree.before(heading); tree.after(continuation,footer);
    function setExpanded(expanded,{restorePosition=false}={}) {
      tree.dataset.routeFold = expanded ? 'expanded' : 'collapsed';
      status.textContent = english ? `${lane} · ${expanded ? 'Full historical record' : isCB ? `Latest ${count} steps` : `${count} historical stages`}` : `${lane} · ${expanded ? '完整历史记录' : isCB ? `最近 ${count} 个步骤` : `${count} 个历史阶段`}`;
      for (const button of buttons) { button.setAttribute('aria-expanded',String(expanded)); button.textContent = english ? `${expanded ? 'Collapse' : 'Expand full record'} · ${lane}` : `${expanded ? '收起' : '展开完整记录'} · ${lane}`; }
      if (restorePosition) { heading.scrollIntoView({block:'start',behavior:'instant'}); buttons[0].focus({preventScroll:true}); }
      window.dispatchEvent(new Event('scroll'));
    }
    buttons.forEach((button,i) => button.addEventListener('click', () => setExpanded(tree.dataset.routeFold !== 'expanded', {restorePosition: i === 1})));
    setExpanded(false); controllers.push({tree,setExpanded});
  }
  function revealHash() {
    if (!location.hash) return;
    let id; try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id); if (!target) return;
    const controller = controllers.find(({tree}) => tree.contains(target));
    if (controller) controller.setExpanded(true);
    for (let parent = target.parentElement; parent; parent = parent.parentElement) if (parent.tagName === 'DETAILS') parent.open = true;
    if (controller) requestAnimationFrame(() => target.scrollIntoView({block:'start',behavior:'instant'}));
  }
  addEventListener('hashchange',revealHash); addEventListener('pageshow',revealHash);
  document.addEventListener('click',event => { const link = event.target.closest?.('a[href*="#"]'); if (!link) return; const url = new URL(link.href,location.href); if (url.origin === location.origin && url.pathname === location.pathname && url.hash === location.hash) revealHash(); });
  let printDetails = [];
  addEventListener('beforeprint',() => { printDetails = [...document.querySelectorAll('#route-map details,.strategy-candidates')].filter(d => !d.open); printDetails.forEach(d => { d.open = true; }); });
  addEventListener('afterprint',() => { printDetails.forEach(d => { d.open = false; }); printDetails = []; });
  revealHash();
})();
