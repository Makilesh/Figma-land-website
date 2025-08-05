// Figma Land Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    const navLinkElements = document.querySelectorAll('.nav-link');
    navLinkElements.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbar.contains(event.target);
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(30, 41, 75, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
    });
    
    // Smooth scroll for navigation links
    navLinkElements.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 75; // Updated navbar height
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Play button functionality
    // Play button functionality
const playButton = document.querySelector('.play-button');
const videoElement = document.getElementById('demo-video');

if (playButton && videoElement) {
    playButton.addEventListener('click', function () {
        // Hide button
        this.style.display = 'none';
        // Show video
        videoElement.style.display = 'block';
        // Play video
        videoElement.play();
    });
}

    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .partner-logo');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .feature-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(1) { transition-delay: 0s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(animationStyle);
    
    // Form validation (for future contact form)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Utility function to debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Debounced scroll handler
    const debouncedScrollHandler = debounce(() => {
        // Additional scroll-based animations can be added here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Focus management for accessibility
    mobileMenuToggle.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
            // Focus first nav link when menu opens
            setTimeout(() => {
                const firstNavLink = navLinks.querySelector('.nav-link');
                if (firstNavLink) {
                    firstNavLink.focus();
                }
            }, 100);
        }
    });
    
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate successful subscription
                showNotification('✅ Successfully subscribed to newsletter!', 'success');
                newsletterInput.value = '';
            } else {
                showNotification('❌ Please enter a valid email address', 'error');
            }
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value.trim();
            const email = contactForm.querySelector('input[type="email"]').value.trim();
            const message = contactForm.querySelector('textarea').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('❌ Please fill in all fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('❌ Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('✅ Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Testimonial pagination
    const paginationDots = document.querySelectorAll('.pagination-dot');
    
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            paginationDots.forEach(d => d.classList.remove('active'));
            // Add active class to clicked dot
            this.classList.add('active');
            
            // Simulate testimonial change (in a real app, this would change content)
            console.log(`Switched to testimonial ${index + 1}`);
        });
    });
    
    // Pricing card interactions
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        const button = card.querySelector('.plan-btn');
        
        if (button) {
            button.addEventListener('click', function() {
                const planName = card.querySelector('.plan-name').textContent;
                const planPrice = card.querySelector('.price-amount').textContent;
                
                showNotification(`🚀 Selected ${planName} plan (${planPrice}/month)`, 'success');
                console.log(`User selected ${planName} plan`);
            });
        }
    });
    
    // Partner logo interactions
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    partnerLogos.forEach(logo => {
        logo.addEventListener('click', function() {
            const companyName = this.querySelector('.logo-text').textContent;
            console.log(`Clicked on ${companyName} logo`);
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'all 0.3s ease',
            maxWidth: '400px',
            wordWrap: 'break-word'
        });
        
        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    // Smooth reveal animations for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add section animation styles
    const sectionAnimationStyle = document.createElement('style');
    sectionAnimationStyle.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        section.section-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero {
            opacity: 1;
            transform: none;
        }
        
        .pricing-card,
        .testimonial-card,
        .partner-logo {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .pricing-card.animate-in,
        .testimonial-card.animate-in,
        .partner-logo.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .pricing-card:nth-child(1) { transition-delay: 0s; }
        .pricing-card:nth-child(2) { transition-delay: 0.2s; }
        .pricing-card:nth-child(3) { transition-delay: 0.4s; }
        
        .partner-logo:nth-child(1) { transition-delay: 0s; }
        .partner-logo:nth-child(2) { transition-delay: 0.1s; }
        .partner-logo:nth-child(3) { transition-delay: 0.2s; }
        .partner-logo:nth-child(4) { transition-delay: 0.3s; }
        .partner-logo:nth-child(5) { transition-delay: 0.4s; }
        .partner-logo:nth-child(6) { transition-delay: 0.5s; }
        .partner-logo:nth-child(7) { transition-delay: 0.6s; }
        .partner-logo:nth-child(8) { transition-delay: 0.7s; }
    `;
    document.head.appendChild(sectionAnimationStyle);
    
    // Console welcome message
    console.log('🎨 Figma Land Website Loaded Successfully!');
    console.log('Built with HTML, CSS, and JavaScript');
    console.log('Features: Responsive Design, Smooth Animations, Form Handling, Mobile Navigation');
});