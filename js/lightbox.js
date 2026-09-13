/* Piggy X · 正文图片点击放大（lightbox） */
(function () {
  var overlay = null;

  function close() {
    if (!overlay) return;
    var o = overlay;
    overlay = null;
    o.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { o.remove(); }, 220);
  }

  function open(src, alt) {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'lightbox';

    var img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    overlay.appendChild(img);

    var hint = document.createElement('span');
    hint.className = 'lightbox-hint';
    hint.textContent = '点击任意处 / Esc 关闭';
    overlay.appendChild(hint);

    overlay.addEventListener('click', close);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { overlay.classList.add('open'); });
  }

  // 事件委托：正文里的图片点击即放大
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG' && t.closest('.article-body')) {
      open(t.currentSrc || t.src, t.alt);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
