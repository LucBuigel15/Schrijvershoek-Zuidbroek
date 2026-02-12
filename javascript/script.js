

document.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;


    const heroImage = document.getElementById('hero-image');
    const heroOverlay = document.getElementById('hero-overlay');

    let progress = Math.min(scrollPosition / windowHeight, 1);

    const newOpacity = 0.4 + (progress * 0.5);
    heroOverlay.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;

    const newScale = 1.1 - (progress * 0.1);
    heroImage.style.transform = `scale(${newScale})`;


});
const btn = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    // These Tailwind classes handle the animation
    menu.classList.toggle('max-h-0');
    menu.classList.toggle('max-h-96'); // Adjust 96 based on menu height
    menu.classList.toggle('opacity-0');
    menu.classList.toggle('opacity-100');
});


const navLinks = mobileMenu.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});









