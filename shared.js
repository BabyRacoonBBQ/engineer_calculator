/**
 * Shared behavior for Engineer Calculator:
 * - Persist zoom level across page navigations (localStorage)
 * - Apply zoom on load, inject floating nav on tool pages
 */
(function() {
  var STORAGE_KEY = 'engcalc_zoom';

  function getStoredZoom() {
    try {
      var v = parseFloat(localStorage.getItem(STORAGE_KEY));
      return (v >= 0.5 && v <= 2) ? v : 1;
    } catch (_) {
      return 1;
    }
  }

  function setZoom(z) {
    z = Math.max(0.5, Math.min(2, z));
    document.documentElement.style.zoom = String(z);
    try {
      localStorage.setItem(STORAGE_KEY, String(z));
    } catch (_) {}
  }

  function applyStoredZoom() {
    setZoom(getStoredZoom());
  }

  function injectNavFloat() {
    var nav = document.querySelector('.nav-float');
    if (!nav || !nav.parentNode) return;
    var parent = nav.parentNode;
    var next = nav.nextSibling;
    var row = document.createElement('div');
    row.className = 'nav-float-row';
    row.appendChild(nav);
    parent.insertBefore(row, next);
  }

  // Apply on load (before paint when possible)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      applyStoredZoom();
      injectNavFloat();
    });
  } else {
    applyStoredZoom();
    injectNavFloat();
  }

  window.engCalcZoom = {
    get: getStoredZoom,
    set: setZoom,
    inc: function() { setZoom(getStoredZoom() + 0.1); },
    dec: function() { setZoom(getStoredZoom() - 0.1); }
  };
})();
