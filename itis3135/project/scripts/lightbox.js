document.addEventListener('DOMContentLoaded', () => {
  const graphics = document.querySelector('.graphics');
  const lightbox = document.querySelector('.lightbox');
  const backdrop = lightbox && lightbox.querySelector('.lightbox-backdrop');
  const content = lightbox && lightbox.querySelector('.lightbox-content');
  const videoEl = lightbox && lightbox.querySelector('.lightbox-video');
  const closeBtn = lightbox && lightbox.querySelector('.lightbox-close');

  if (!graphics || !lightbox || !videoEl) return;

  function openLightbox(videoSrc, poster) {
    videoEl.pause();
    videoEl.removeAttribute('src');
    videoEl.load && videoEl.load();

    if (poster) videoEl.poster = poster;
    else videoEl.removeAttribute('poster');

    videoEl.src = videoSrc;
    videoEl.setAttribute('controls', ''); // ensure controls visible
    lightbox.setAttribute('aria-hidden', 'false');
    // small delay to allow render before play
    setTimeout(() => {
      videoEl.play().catch(()=>{ /* autoplay may be blocked; user can press play */ });
      // focus for keyboard events
      closeBtn && closeBtn.focus();
    }, 60);

    // prevent page scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    // stop + unload video
    try {
      videoEl.pause();
      videoEl.removeAttribute('src');
      videoEl.load && videoEl.load();
    } catch (e) { /* ignore */ }

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // click handler: open when clicking a thumbnail
  graphics.addEventListener('click', (ev) => {
    const thumb = ev.target.closest('.thumb');
    if (!thumb) return;
    const video = thumb.dataset.video;
    const poster = thumb.dataset.poster || '';
    if (!video) return;
    openLightbox(video, poster);
  });

  // close handlers
  closeBtn && closeBtn.addEventListener('click', closeLightbox);

  // click outside content closes
  backdrop && backdrop.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (ev) => {
    if (ev.target === lightbox) closeLightbox();
  });

  // keyboard: ESC closes
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
      closeLightbox();
    }
  });

  // Accessibility: stop keyboard/tab leaving the lightbox (simple trap)
  lightbox.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Tab') return;
    const focusable = lightbox.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (ev.shiftKey && document.activeElement === first) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && document.activeElement === last) {
      ev.preventDefault();
      first.focus();
    }
  });
});