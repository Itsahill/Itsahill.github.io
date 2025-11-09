// ...new file...
document.addEventListener('DOMContentLoaded', () => {
  const set = (id, value) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
      el.value = value;
    } else {
      el.textContent = value;
    }
  };

  set('first-name', 'Sahil');
  set('middle-name', 'A.');
  set('preferred-name', 'Shamil');
  set('last-name', 'Luqman');

  set('initials', 'SL');
  set('date', new Date().toLocaleDateString());

  set('mascot-adjective', 'Supreme');
  set('mascot-animal', 'Lobster');
  set('divider', '|');

  // Image input cannot be programmatically set for security; caption only
  set('picture-caption', 'Me in Alaska');

  set('personal-background', 'Grew up in Charlotte. Interested in web dev and motion graphics.');
  set('professional-background', 'Freelance dev and motion designer.');
  set('academic-background', 'CS student at UNC Charlotte.');

  set('department1', 'ITIS');
  set('coursenumber-1', '3135');
  set('coursename-1', 'Web Development');
  set('reason-1', 'Learn web development fundamentals.');

  set('quote', 'Code is like humor. When you have to explain it, it’s bad.');
  set('quote-author', 'Cory House');

  set('funny-item', 'Collector of rubber ducks');
  set('share', 'Contact: example@example.com');

  // Optional: focus submit so you can quickly test keyboard-enter submit
  const submit = document.getElementById('submit');
  if (submit) submit.focus();
});
// ...new file...