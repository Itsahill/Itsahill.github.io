// Get all the elements that you want to fade in
const sections = document.querySelectorAll('.fade-in');

// Create an Intersection Observer instance
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add the 'visible' class to make the element fade in
      entry.target.classList.add('visible');
    } else {
      // Remove the 'visible' class to make the element fade out
      entry.target.classList.remove('visible');
    }
  });
});

// Observe each section
sections.forEach((section) => {
  observer.observe(section);
});