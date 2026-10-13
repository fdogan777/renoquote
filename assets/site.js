(() => {
  const picker = document.querySelector('#appearance');
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let mode = 'system';
  try { mode = localStorage.getItem('renoquote.website.appearance') || mode; } catch (_) {}
  if (!['system', 'light', 'dark'].includes(mode)) mode = 'system';
  function apply() { document.documentElement.dataset.theme = mode === 'system' ? (media.matches ? 'dark' : 'light') : mode; }
  apply();
  if (picker) {
    picker.value = mode;
    picker.addEventListener('change', () => {
      mode = picker.value; apply();
      try { localStorage.setItem('renoquote.website.appearance', mode); } catch (_) {}
    });
  }
  media.addEventListener('change', apply);
  document.addEventListener('click', event => {
    document.querySelectorAll('details.switcher, details.mobile-nav').forEach(item => {
      if (!item.contains(event.target)) item.open = false;
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') document.querySelectorAll('details.switcher[open], details.mobile-nav[open]').forEach(item => {
      item.open = false; item.querySelector('summary').focus();
    });
  });
})();
