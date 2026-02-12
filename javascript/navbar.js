const btn = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    // These Tailwind classes handle the animation
    menu.classList.toggle('max-h-0');
    menu.classList.toggle('max-h-96'); // Adjust 96 based on menu height
    menu.classList.toggle('opacity-0');
    menu.classList.toggle('opacity-100');
});