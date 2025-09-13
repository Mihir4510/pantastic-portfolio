document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active'); // For hamburger animation
        });

        // Close nav when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
    }

    // --- Active Navigation Link Highlighting (Revised) ---
    const allNavLinks = document.querySelectorAll('header .nav-links a');
    const currentPathname = window.location.pathname;

    allNavLinks.forEach(link => {
        link.classList.remove('active'); // Remove 'active' from all links first
        const linkHref = link.getAttribute('href');

        if (linkHref) {
            // Check if the current browser path ends with the link's href value
            // This handles cases like /about.html matching href="about.html"
            if (currentPathname.endsWith(linkHref)) {
                link.classList.add('active');
            }
            // Special handling for index.html when at the root directory
            // e.g. if path is "/" or "/folder/", index.html link should be active
            else if ((linkHref === 'index.html' || linkHref === './index.html') &&
                     (currentPathname.endsWith('/') || currentPathname.endsWith('/index.html'))) {
                link.classList.add('active');
            }
        }
    });


    // --- Contact Form Handling (Basic) ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default page reload

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill in all fields.';
                formStatus.style.color = 'red';
                return;
            }

            if (!validateEmail(email)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.style.color = 'red';
                return;
            }

            formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
            formStatus.style.color = 'green';
            contactForm.reset();

            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // --- Subtle Animations on Scroll ---
    const sections = document.querySelectorAll('main section');
    const animateOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.85) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll();
    } else {
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }
});