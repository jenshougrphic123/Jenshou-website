/* mobile-nav.js
   - apply active class based on current URL
   - graceful fallback if pathname is empty
*/

(function(){
  if (!('querySelector' in document)) return;

  const map = {
    // map pathname to filename used in hrefs below
    '': 'index.html',
    '/': 'index.html',
    'index.html': 'index.html',
    'dashboard.html': 'index.html', // if you name dashboard differently, adjust
    'gallery.html': 'gallery.html',
    'commission.html': 'commission.html',
    'about.html': 'about.html'
  };

  function getFileFromPath() {
    const p = window.location.pathname.split('/').pop() || '';
    return p;
  }

  function init() {
    const nav = document.querySelector('.bottom-nav');
    if (!nav) return;

    const links = Array.from(nav.querySelectorAll('a.bottom-nav__item'));
    const currentFile = getFileFromPath();
    const target = map[currentFile] || currentFile || 'index.html';

    links.forEach(a => {
      try { a.removeAttribute('aria-current'); } catch(e){}
      a.classList.remove('active');
      const href = a.getAttribute('href') || '';
      // compare only filename part
      const hfile = href.split('/').pop();
      if (hfile === target || (hfile === '' && target === 'index.html')) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
      // keyboard & touch-friendly feedback
      a.addEventListener('touchstart', () => {
        a.classList.add('touching');
        setTimeout(()=> a.classList.remove('touching'), 200);
      }, {passive:true});
    });

    // ensure nav won't push over modal overlays: if any overlay exists, make bottom nav slightly transparent
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
      overlay.addEventListener('transitionstart', () => {
        nav.style.pointerEvents = overlay.classList.contains('active') ? 'none' : '';
      });
    }
  }

  // init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();