// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the portfolio
    initPortfolio();
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Initialize Portfolio
function initPortfolio() {
    // Navigation functionality
    initNavigation();
    
    // Portfolio filtering
    initPortfolioFilter();
    
    // Contact form
    initContactForm();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Add scroll animations
    initScrollAnimations();
}

// Navigation Functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const headerTitle = document.querySelector('.header-left .section-title');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Update header title with typing animation
            const sectionName = this.textContent;
            if (headerTitle) {
                headerTitle.textContent = '';
                let i = 0;
                const typeWriter = () => {
                    if (i < sectionName.length) {
                        headerTitle.textContent += sectionName.charAt(i);
                        i++;
                        setTimeout(typeWriter, 50);
                    }
                };
                typeWriter();
            }
            
            // Show corresponding section
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
            
            // Scroll to the header where navigation is located
            const header = document.querySelector('.header');
            if (header) {
                header.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Portfolio Filtering
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .portfolio-item, .blog-card, .timeline-item, .certification-item, .award-item, .skill-tag');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Typing Animation for Section Titles
function initTypingAnimation() {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation when section becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(title);
    });
}

// Parallax Effect for Background - DISABLED
function initParallaxEffect() {
    // Parallax effect disabled to prevent cards from moving during scroll
    // This was causing the cards to move "like crazy" when scrolling
}

// Hover Effects Enhancement
function initHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .portfolio-item, .blog-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Skills Animation
function initSkillsAnimation() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            tag.style.transition = 'all 0.5s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Timeline Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize parallax effect
    initParallaxEffect();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize skills animation
    initSkillsAnimation();
    
    // Initialize timeline animation
    initTimelineAnimation();
    
    // Add CSS for animations
    addAnimationStyles();
});

// Add Animation Styles
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out;
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .service-card,
        .testimonial-card,
        .portfolio-item,
        .blog-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .skill-tag {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .timeline-item {
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
        }
        
        .notification-close:hover {
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);
}

// Utility Functions
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

// Resize handler
window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 768) {
        if (sidebar) sidebar.style.position = 'relative';
        if (mainContent) mainContent.style.marginLeft = '0';
    } else {
        if (sidebar) sidebar.style.position = 'fixed';
        if (mainContent) mainContent.style.marginLeft = '350px';
    }
}, 250));

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add profile image animation
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        setTimeout(() => {
            profileImage.classList.add('loaded');
        }, 500);
    }
    
    // Remove loading animation
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => {
        el.classList.add('loaded');
    });
});

// Export functions for potential external use
window.Portfolio = {
    initPortfolio,
    showNotification,
    initNavigation,
    initPortfolioFilter
}; 