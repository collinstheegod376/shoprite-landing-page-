document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Navbar scroll effect
    const handleScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isMenuOpen = !mobileMenu.classList.contains('translate-x-full');
            
            if (isMenuOpen) {
                mobileMenu.classList.add('translate-x-full');
                mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
                document.body.style.overflow = '';
            } else {
                mobileMenu.classList.remove('translate-x-full');
                mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'close';
                document.body.style.overflow = 'hidden';
            }
        });

        // Close menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
                document.body.style.overflow = '';
            });
        });
    }

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Add animation to header items
    const navLinks = document.querySelectorAll('nav div a');
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-10px)';
        link.style.transition = 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)';
        link.style.transitionDelay = `${index * 50}ms`;
        
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 100);
    });
});
