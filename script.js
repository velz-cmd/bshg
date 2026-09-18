(function() {
    'use strict';

    // ===== Navigation toggle =====
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav__link');

    function toggleNav() {
        navList.classList.toggle('active');
        navToggle.classList.toggle('active');
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleNav);
    }

    // Close nav on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                toggleNav();
            }
        });
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
        if (navList.classList.contains('active') &&
            !navList.contains(e.target) &&
            e.target !== navToggle) {
            toggleNav();
        }
    });

    // ===== Smooth scroll for all anchor links (fallback for Safari) =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== Testimonials carousel =====
    const wrapper = document.getElementById('testimonials-wrapper');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicator = document.getElementById('indicator');

    if (wrapper && prevBtn && nextBtn && indicator) {
        const slides = wrapper.querySelectorAll('.testimonial__card');
        let currentIndex = 0;
        const totalSlides = slides.length;

        function updateCarousel() {
            wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            indicator.textContent = `${currentIndex + 1} / ${totalSlides}`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });

        // Auto advance every 6 seconds
        let autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 6000);

        // Pause on hover
        wrapper.addEventListener('mouseenter', () => clearInterval(autoSlide));
        wrapper.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            }, 6000);
        });

        // Initial state
        updateCarousel();
    }

    // ===== Footer year =====
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ===== Sticky header shadow on scroll =====
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
        lastScroll = currentScroll;
    });

})();