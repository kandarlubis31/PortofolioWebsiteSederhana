document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            // Cek apakah hamburger dan navLinks aktif sebelum menghapus class
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust scroll position to account for fixed header
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // -20px tambahan padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations using IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Memicu animasi sedikit lebih awal
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Contact form handling (for Formspree.io or similar)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) { // Pastikan form ada
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;

            try {
                // Untuk Formspree, gunakan fetch API
                const response = await fetch(this.action, {
                    method: this.method,
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Terima kasih! Pesan Anda telah terkirim.');
                    this.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('Oops! Terjadi kesalahan saat mengirim pesan.');
                    }
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Oops! Terjadi kesalahan jaringan atau server.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Typing effect for hero section (Optional)
    const heroNameElement = document.getElementById('hero-name');
    if (heroNameElement) {
        // Anda bisa mengganti text di sini atau membiarkannya sesuai HTML
        // Contoh: typeWriter(heroNameElement, 'Saya Anto', 100);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.3; // Kurangi intensitas parallax agar tidak terlalu cepat

        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add loading animation (fading in body)
    window.addEventListener('load', () => {
        document.body.style.opacity = '1'; // Langsung set ke 1 karena defaultnya sudah 0 di CSS
    });
});

// Fungsi typeWriter (jika ingin digunakan)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = ''; // Pastikan elemen kosong sebelum mulai mengetik

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}