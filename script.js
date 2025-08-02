// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#667eea'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#667eea',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .timeline-item, .contact-card, .info-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let index = 0;
        const typeSpeed = 50;
        
        function typeWriter() {
            if (index < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
                            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (target === 9.14) {
                        counter.textContent = current.toFixed(2);
                    } else {
                        counter.textContent = Math.ceil(current) + '+';
                    }
                    setTimeout(updateCounter, 50);
                } else {
                    if (target === 9.14) {
                        counter.textContent = target.toFixed(2);
                    } else {
                        counter.textContent = Math.ceil(target) + '+';
                    }
                }
            };
            
            updateCounter();
        });
    }

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill card animation on hover
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1.1) rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1) rotateY(0deg)';
        });
    });

    // Smooth reveal animation for sections
    const revealElements = document.querySelectorAll('.section-header, .about-text, .hero-text');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Add CSS for reveal animation
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .reveal.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-icon {
            transition: transform 0.3s ease;
        }
        
        .project-card {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Contact form animation (if you add a form later)
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger hero animations
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-text > *');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 500);
    });

    // Tech stack hover effect
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Certificate card animation
    const certCards = document.querySelectorAll('.cert-card');
    
    certCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.cert-icon');
            icon.style.transform = 'scale(1.1) rotateZ(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.cert-icon');
            icon.style.transform = 'scale(1) rotateZ(0deg)';
        });
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Add timeline animation styles
    const timelineStyle = document.createElement('style');
    timelineStyle.textContent = `
        .timeline-item {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .timeline-item.animate {
            opacity: 1;
            transform: translateX(0);
        }
        
        .timeline-dot {
            transform: scale(0);
            transition: transform 0.4s ease 0.2s;
        }
        
        .timeline-item.animate .timeline-dot {
            transform: scale(1);
        }
        
        .cert-icon {
            transition: transform 0.3s ease;
        }
        
        .tech-item {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hero-text > * {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        body.loaded .hero-text > * {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(timelineStyle);

    // Add scroll to top functionality
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 18px;
    `;
    
    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect to scroll top button
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.4)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });

    // Add cursor trail effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });

    console.log('Portfolio loaded successfully! 🚀');
});