// =========================================
//   Mobile Menu
// =========================================

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Prevent scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// =========================================
//   Scroll Animations (Intersection Observer)
// =========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible to avoid re-triggering (optional)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-section').forEach(section => {
    observer.observe(section);
});

// =========================================
//   Scroll Down Button
// =========================================

const scrollDown = document.querySelector('.scroll-down');
if (scrollDown) {
    scrollDown.addEventListener('click', () => {
        const nextSection = document.querySelector('.info-section') || document.querySelector('.section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// =========================================
//   Carousel Logic (Home Page)
// =========================================

const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const nextBtn = document.querySelector('.carousel-nav.next');
const prevBtn = document.querySelector('.carousel-nav.prev');

if (track && slides.length > 0) {
    let currentIndex = 0;

    function updateCarousel() {
        const width = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex >= slides.length) {
                currentIndex = 0; // Loop back
            }
            updateCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = slides.length - 1; // Loop to end
            }
            updateCarousel();
        });
    }

    // Auto play (optional)
    setInterval(() => {
        if (!document.hidden) { // Only scroll when tab is active
            currentIndex++;
            if (currentIndex >= slides.length) currentIndex = 0;
            updateCarousel();
        }
    }, 5000);

    // Initial sizing handling
    window.addEventListener('resize', updateCarousel);
}

// =========================================
//   EmailJS Contact Form
// =========================================

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Change button state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const serviceID = 'service_rtmfhfq';
        const templateID = 'template_y51xeuo';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                submitBtn.textContent = 'Message Sent!';
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
            }, (err) => {
                submitBtn.textContent = 'Error!';
                alert('Oops... ' + JSON.stringify(err));
            })
            .finally(() => {
                setTimeout(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
            });
    });
}
