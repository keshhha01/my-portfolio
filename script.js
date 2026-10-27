// ========================================
// Theme Management
// ========================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme from localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    }
}

// Toggle theme
function toggleTheme() {
    body.classList.toggle('light-theme');
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
}

// Initialize theme on page load
loadTheme();

// Theme toggle button event listener
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// ========================================
// Mobile Menu Toggle
// ========================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========================================
// Back to Top Button
// ========================================
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Show/hide back to top button on scroll
window.addEventListener('scroll', toggleBackToTop);

// Smooth scroll to top
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Scroll Animation for Elements
// ========================================
const animateElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(element => {
    observer.observe(element);
});

// ========================================
// Update Current Year in Footer
// ========================================
const currentYearElements = document.querySelectorAll('#currentYear');
const currentYear = new Date().getFullYear();

currentYearElements.forEach(element => {
    element.textContent = currentYear;
});

// ========================================
// Update Last Update Date in Privacy Page
// ========================================
const lastUpdateElement = document.getElementById('lastUpdate');

if (lastUpdateElement) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const lastUpdate = new Date().toLocaleDateString('ru-RU', options);
    lastUpdateElement.textContent = lastUpdate;
}

// ========================================
// Active Navigation Link Highlighting
// ========================================
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = new URL(link.href).pathname;
        
        // Check if current page matches the link
        if (currentPath === linkPath || 
            (currentPath === '/' && linkPath.includes('index.html')) ||
            (currentPath.includes('index.html') && linkPath.includes('index.html'))) {
            link.classList.add('active');
        }
    });
}

// Set active link on page load
setActiveNavLink();

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Header Scroll Effect
// ========================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Typing Effect for Hero Section (Optional Enhancement)
// ========================================
function typeEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && heroTitle.hasAttribute('data-type-effect')) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 50);
    }
}

// Uncomment to enable typing effect
// typeEffect();

// ========================================
// Project Card Hover Effect Enhancement
// ========================================
const projectCards = document.querySelectorAll('.project-card, .project-card-full');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// Skill Progress Bar Animation
// ========================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Initialize skill bar animations
animateSkillBars();

// ========================================
// Form Validation (if needed in future)
// ========================================
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// ========================================
// Lazy Loading Images (if images are added)
// ========================================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
lazyLoadImages();

// ========================================
// Parallax Effect for Hero Section
// ========================================
function parallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax effect
parallaxEffect();

// ========================================
// Gradient Blob Animation Enhancement
// ========================================
function enhanceGradientBlobs() {
    const blobs = document.querySelectorAll('.gradient-blob');
    
    blobs.forEach(blob => {
        // Random movement on mouse move
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const moveX = (x - 0.5) * 50;
            const moveY = (y - 0.5) * 50;
            
            blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Uncomment to enable enhanced blob animation
// enhanceGradientBlobs();

// ========================================
// Copy to Clipboard Function (for contact details)
// ========================================
function copyToClipboard(text, button) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            // Show feedback
            const originalText = button.textContent;
            button.textContent = 'Скопировано!';
            button.style.background = 'var(--gradient-primary)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
}

// Add copy functionality to contact links
const contactLinks = document.querySelectorAll('.method-link');
contactLinks.forEach(link => {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn btn-small btn-outline';
    copyBtn.textContent = 'Копировать';
    copyBtn.style.marginTop = '8px';
    
    copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const text = link.textContent.trim();
        copyToClipboard(text, copyBtn);
    });
    
    // Uncomment to add copy buttons
    // link.parentElement.appendChild(copyBtn);
});

// ========================================
// Keyboard Navigation Enhancement
// ========================================
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        if (menuToggle && navMenu) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Press 'T' to toggle theme (when not in input fields)
    if (e.key === 't' || e.key === 'T') {
        if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            toggleTheme();
        }
    }
});

// ========================================
// Performance: Reduce Motion for Users Who Prefer It
// ========================================
function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-normal', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    }
}

// Apply reduced motion preferences
respectReducedMotion();

// ========================================
// Console Easter Egg
// ========================================
console.log('%c👋 Привет, разработчик!', 'font-size: 24px; color: #a855f7; font-weight: bold;');
console.log('%cЕсли вы читаете это, значит вам интересен мой код! 🚀', 'font-size: 14px; color: #ec4899;');
console.log('%cСвяжитесь со мной: https://github.com/keshhha01', 'font-size: 12px; color: #3b82f6;');

// ========================================
// Initialize All Functions on Page Load
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized successfully! ✨');
    
    // Add a small delay to ensure all animations work smoothly
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Page Transition Effect (Optional)
// ========================================
function pageTransition() {
    const links = document.querySelectorAll('a:not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's an anchor link or external link
            if (href.startsWith('#') || href.startsWith('http')) {
                return;
            }
            
            // Uncomment to enable page transitions
            /*
            e.preventDefault();
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
            */
        });
    });
}

// Initialize page transitions
pageTransition();

// ========================================
// Service Worker Registration (for PWA, optional)
// ========================================
if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA features
    /*
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
    */
}

// ========================================
// Analytics (placeholder for future implementation)
// ========================================
function trackPageView() {
    // Add analytics tracking here (e.g., Google Analytics, Plausible)
    // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: window.location.pathname });
}

// Track initial page view
trackPageView();

// ========================================
// Error Handling
// ========================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You can add error reporting service here
});

// ========================================
// Online/Offline Detection
// ========================================
window.addEventListener('online', () => {
    console.log('Connection restored');
    // You can show a notification to the user
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    // You can show a notification to the user
});

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events for better performance
const optimizedScroll = throttle(() => {
    toggleBackToTop();
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ========================================
// Accessibility Enhancements
// ========================================

// Skip to main content link
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const main = document.querySelector('main');
        if (main) {
            main.tabIndex = -1;
            main.focus();
        }
    });
}

// Focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
}

// Apply focus trap to mobile menu when active
if (navMenu) {
    navMenu.addEventListener('transitionend', () => {
        if (navMenu.classList.contains('active')) {
            trapFocus(navMenu);
        }
    });
}

// ========================================
// Print Styles Handler
// ========================================
window.addEventListener('beforeprint', () => {
    // Remove animations before printing
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// ========================================
// End of Script
// ========================================
console.log('All scripts loaded successfully! 🎉');
