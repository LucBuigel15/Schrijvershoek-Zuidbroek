window.onscroll = function () {
    const heroArrowDown = document.getElementById('hero-arrow-down');

    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        heroArrowDown.style.display = "none";
    } else {
        heroArrowDown.style.display = "flex";
    }
}

tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                merri: ['Merriweather', 'serif'],
            }
        }
    }
}