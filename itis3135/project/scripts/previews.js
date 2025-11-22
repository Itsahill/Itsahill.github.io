document.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('see-more');
      if (!btn) return;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.project-preview.hidden').forEach((el, index) => {
          setTimeout(() => {
            el.classList.remove('hidden');
            el.classList.add('revealed');
          }, index * 150);
        });
        setTimeout(() => {
          btn.style.display = 'none';
        }, 300);
      });
    });