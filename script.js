document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        
        navItems.forEach((link, index) => {
            link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navItems.forEach(link => link.style.animation = '');
        });
    });

    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.8rem 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            header.style.padding = '1.2rem 0';
            header.style.boxShadow = 'none';
        }
    });

    const sections = document.querySelectorAll('main section[id]');
    const navLinksA = document.querySelectorAll('.nav-links a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        if (sections.length === 0) return;
        let current = '';
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            if (scrollY >= (section.offsetTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinksA.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 500 ? 'flex' : 'none';
        if (backToTop.style.display === 'flex') {
            backToTop.style.alignItems = 'center';
            backToTop.style.justifyContent = 'center';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const configMulti = {
        slidesPerView: 'auto',
        centeredSlides: true, 
        spaceBetween: 20,
        grabCursor: true,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30, centeredSlides: false },
            992: { slidesPerView: 3, spaceBetween: 25, centeredSlides: false },
            1200: { slidesPerView: 4, spaceBetween: 30, centeredSlides: false }
        }
    };

    const configSingle = {
        slidesPerView: 1, 
        centeredSlides: true,
        spaceBetween: 0,
        grabCursor: true,
        navigation: { nextEl: '.lotion-next', prevEl: '.lotion-prev' },
        pagination: { el: '.lotion-pagination', clickable: true },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30, centeredSlides: false }
        }
    };

    new Swiper('.product-slider-glow', {
        ...configMulti,
        navigation: { nextEl: '.glow-next', prevEl: '.glow-prev' },
        pagination: { el: '.glow-pagination' }
    });

    new Swiper('.product-slider-acne', {
        ...configMulti,
        navigation: { nextEl: '.acne-next', prevEl: '.acne-prev' },
        pagination: { el: '.acne-pagination' }
    });

    new Swiper('.product-slider-lotion', {
        ...configSingle
    });

    const detailsElements = document.querySelectorAll('.faq-item');
    detailsElements.forEach((detail) => {
        detail.addEventListener('click', function(e) {
            if (e.target.tagName.toLowerCase() === 'summary' || e.target.closest('summary')) {
                if (!this.open) { 
                    detailsElements.forEach((otherDetail) => {
                        if (otherDetail !== this && otherDetail.open) {
                            otherDetail.removeAttribute('open');
                        }
                    });
                }
            }
        });
    });
});

const styleSheet = document.createElement("style");
styleSheet.innerText = `@keyframes navLinkFade { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }`;
document.head.appendChild(styleSheet);