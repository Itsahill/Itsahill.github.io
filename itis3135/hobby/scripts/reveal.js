const sections = document.querySelectorAll('.wrapper');
const buttons = document.querySelectorAll('.btn');
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        sections.forEach(section => section.style.display = 'none');
        sections[index].style.display = 'block';
    });
});