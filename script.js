// DOM Elements
const loader = document.getElementById('loader');
const header = document.getElementById('header');
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const typedText = document.getElementById('typed-text');
const contactForm = document.getElementById('contact-form');
const submitStatus = document.getElementById('submit-status');

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';

function setTheme(theme) {
    document.body.className = theme + '-theme';
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Initialize theme
setTheme(currentTheme);

// Theme toggle event
themeToggle.addEventListener('click', () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('menu-open');
    nav.classList.toggle('nav-open');
});

// Close mobile menu when clicking nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('menu-open');
        nav.classList.remove('nav-open');
    });
});

// Smooth scrolling for anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerHeight = header.offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target);
    });
});

// Typing Animation
const texts = [
    'MERN Stack Developer',
    'AI/ML Enthusiast', 
    'Full Stack Engineer',
    'Python Developer',
    'Tech Innovator'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before next text
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation
typeText();

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
                if (target === 100) {
                    counter.textContent = '100';
                }
            }
        };
        
        updateCounter();
    });
}

// Skills Progress Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 500);
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation classes
            if (entry.target.classList.contains('fade-in-up')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            if (entry.target.classList.contains('fade-in-left')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
            if (entry.target.classList.contains('fade-in-right')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
            
            // Animate counters when about section is visible
            if (entry.target.id === 'about') {
                animateCounters();
                observer.unobserve(entry.target);
            }
            
            // Animate skill bars when skills section is visible
            if (entry.target.id === 'skills') {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, #about, #skills').forEach(el => {
    // Set initial states for animation elements
    if (el.classList.contains('fade-in-up')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
    }
    if (el.classList.contains('fade-in-left')) {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-30px)';
        el.style.transition = 'all 0.8s ease-out';
    }
    if (el.classList.contains('fade-in-right')) {
        el.style.opacity = '0';
        el.style.transform = 'translateX(30px)';
        el.style.transition = 'all 0.8s ease-out';
    }
    
    observer.observe(el);
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                const category = card.getAttribute('data-category');
                if (category === filter) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        if (card.classList.contains('hidden')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            }
        });
    });
});

// Contact Form Handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const formData = new FormData(contactForm);
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('submitting');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate form submission (replace with actual form handling)
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        submitStatus.style.display = 'flex';
        submitStatus.className = 'submit-status success';
        submitStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            submitStatus.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        // Show error message
        submitStatus.style.display = 'flex';
        submitStatus.className = 'submit-status error';
        submitStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again.';
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.classList.remove('submitting');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
});

// Photo Upload Functionality
const photoPlaceholder = document.querySelector('.photo-placeholder');
if (photoPlaceholder) {
    photoPlaceholder.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    photoPlaceholder.style.backgroundImage = `url(${e.target.result})`;
                    photoPlaceholder.style.backgroundSize = 'cover';
                    photoPlaceholder.style.backgroundPosition = 'center';
                    photoPlaceholder.innerHTML = ''; // Remove placeholder content
                };
                reader.readAsDataURL(file);
            }
        });
        
        input.click();
    });
}

// Resume Download Function
function downloadResume() {
    // Create a sample resume content (in a real scenario, you'd have an actual PDF file)
    const resumeContent = `
MD AQUIB
Full Stack Developer & AI/ML Enthusiast

CONTACT INFORMATION
Email: aquibbinali369@gmail.com
Location: Punjab, India
GitHub: github.com/cyberfunky1010
LinkedIn: https://www.linkedin.com/in/muhammed-aquib-74251a1a0/

EDUCATION
Master of Computer Applications (MCA)
Lovely Professional University (LPU) - 2024-Present

EXPERIENCE
AI/ML Intern | Tech Innovation Labs | Jun 2023 - Aug 2023
- Developed predictive models using scikit-learn and TensorFlow
- Analyzed large datasets with Pandas and NumPy
- Implemented data preprocessing pipelines

CERTIFICATIONS
Full Stack Web Development - Udemy (2023)
- MERN Stack specialization
- Authentication & Deployment
- Real-time Applications

TECHNICAL SKILLS
Frontend: React.js, JavaScript (ES6+), HTML5, CSS3
Backend: Node.js, Express.js, MongoDB, RESTful APIs
AI/ML: Python, TensorFlow, scikit-learn, Pandas, NumPy
Tools: Git, VS Code, Docker, AWS Basics

PROJECTS
- E-Commerce MERN Application
- AI-Powered Task Manager
- Real-time Chat Application
- Weather Prediction Model
`;

    // Create and download the resume as a text file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'md_aquib.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show notification
    alert('Resume downloaded! In a real scenario, this would download a professionally formatted PDF resume.');
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects for project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize tooltips for social links
const socialLinks = document.querySelectorAll('.hero-social a, .social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        
        // Get the icon class to determine the platform
        const icon = link.querySelector('i');
        let platform = 'Social';
        
        if (icon.classList.contains('fa-github')) platform = 'GitHub';
        else if (icon.classList.contains('fa-linkedin')) platform = 'LinkedIn';
        else if (icon.classList.contains('fa-twitter')) platform = 'Twitter';
        else if (icon.classList.contains('fa-envelope')) platform = 'Email';
        
        tooltip.textContent = platform;
        tooltip.style.cssText = `
            position: absolute;
            bottom: 120%;
            left: 50%;
            transform: translateX(-50%);
            background: var(--text-primary);
            color: var(--bg-primary);
            padding: 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            white-space: nowrap;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        
        link.style.position = 'relative';
        link.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 100);
    });
    
    link.addEventListener('mouseleave', () => {
        const tooltip = link.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            themeToggle.click();
        }
    }
    
    // Press 'M' to toggle mobile menu
    if (e.key.toLowerCase() === 'm' && !e.ctrlKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            menuToggle.click();
        }
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll-heavy functions
const debouncedUpdateActiveNavLink = debounce(updateActiveNavLink, 100);
window.addEventListener('scroll', debouncedUpdateActiveNavLink);

// Console welcome message
console.log(`
%c🚀 Welcome to Aquib's Portfolio! 
%c
Built with vanilla HTML, CSS, and JavaScript
Feel free to explore the code and reach out for collaborations!

%cKeyboard shortcuts:
- Press 'T' to toggle theme
- Press 'M' to toggle mobile menu

%cConnect with me:
📧 aquibbinali369@gmail.com
🐙 github.com/cyberfunky1010
💼 https://www.linkedin.com/in/muhammed-aquib-74251a1a0/
`, 
'color: #2563eb; font-size: 16px; font-weight: bold;',
'color: #6b7280; font-size: 14px;',
'color: #10b981; font-size: 12px; font-weight: bold;',
'color: #f59e0b; font-size: 12px; font-weight: bold;'
);

// Initialize all animations and features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! 🎉');
    
    // Add a subtle entrance animation to the body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Error handling for missing elements
window.addEventListener('error', (e) => {
    console.warn('An error occurred:', e.error);
    // Gracefully handle missing elements
});

// Add loading states for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    img.addEventListener('error', () => {
        console.warn('Failed to load image:', img.src);
        // You could set a fallback image here
    });
});
