document.addEventListener('DOMContentLoaded', () => {
  const sections = [
    document.getElementById('left-text-section'),
    document.getElementById('right-text-section')
  ].filter(Boolean);

  const revealChildren = (container) => {
    const items = Array.from(container.querySelectorAll('p, ul, div > *')).filter(Boolean);
    const baseDelay = 100;
    items.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * baseDelay);
    });
  };

  // Fallback: no IntersectionObserver -> reveal immediately with stagger
  if (!('IntersectionObserver' in window)) {
    sections.forEach(revealChildren);
    return;
  }

  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealChildren(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -12% 0px', // trigger slightly before fully visible
    threshold: 0.12
  });

  sections.forEach(s => obs.observe(s));
});