// Minimal Refined Interactions

// Remove magnetic effect for cleaner interaction

// Animated counter
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target < 1) {
            element.textContent = current.toFixed(2);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counters on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const counter = entry.target.querySelector('.counter');
            const target = parseFloat(entry.target.dataset.counter);
            animateCounter(counter, target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => counterObserver.observe(stat));
});

// Copy to clipboard with ripple effect
document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-install');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', async (e) => {
            const code = copyBtn.querySelector('code').textContent;
            
            // Simple feedback without ripple
            
            try {
                await navigator.clipboard.writeText(code);
                
                // Visual feedback
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = `
                    <span>Copied!</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                    copyBtn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    }
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms ease-out;
        background: rgba(255, 255, 255, 0.5);
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Example tabs functionality with slide effect
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.example-tab');
    const panes = document.querySelectorAll('.example-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-example');
            
            // Update active states
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
});

// Smooth scrolling with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic navbar with hide/show on scroll
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Add shadow and background on scroll
    if (currentScroll > 10) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.boxShadow = 'none';
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
    }
    
    // Hide/show on scroll direction
    if (currentScroll > lastScroll && currentScroll > 200) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .eco-card, .philosophy-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        fadeObserver.observe(el);
    });
});

// Mouse position for card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
});

// Glitch effect on hover
document.addEventListener('DOMContentLoaded', () => {
    const glitchElement = document.querySelector('.glitch');
    
    if (glitchElement) {
        let glitchInterval;
        
        glitchElement.addEventListener('mouseenter', () => {
            glitchElement.style.animation = 'none';
            setTimeout(() => {
                glitchElement.style.animation = '';
            }, 10);
        });
    }
});

// Parallax for mesh gradient
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const meshGradient = document.querySelector('.mesh-gradient');
    
    if (meshGradient && scrolled < 1000) {
        meshGradient.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.05}px) scale(${1 + scrolled * 0.0001})`;
    }
});

// Type text animation
class TypeWriter {
    constructor(element, texts, wait = 3000) {
        this.element = element;
        this.texts = texts;
        this.text = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    
    type() {
        const current = this.wordIndex % this.texts.length;
        const fullText = this.texts[current];
        
        if (this.isDeleting) {
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            this.text = fullText.substring(0, this.text.length + 1);
        }
        
        this.element.innerHTML = `<span class="text-gradient">${this.text}</span>`;
        
        let typeSpeed = 100;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.text === fullText) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typewriter for dynamic text
document.addEventListener('DOMContentLoaded', () => {
    const typeElement = document.querySelector('.type-text');
    if (typeElement) {
        const texts = ['shipping fast', 'building better', 'coding smarter'];
        new TypeWriter(typeElement, texts);
    }
});