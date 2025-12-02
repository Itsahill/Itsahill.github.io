// itis3135/scripts/HTMLinclude.js

// ...

// Add an event listener to the logo element
document.querySelector(".footer-logo").addEventListener("click", () => {
  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth" // You can change "smooth" to "auto" for instant scrolling
  });
});

// ...