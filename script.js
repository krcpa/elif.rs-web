// Modern minimalist interactions

// Copy to clipboard functionality
document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-install');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const code = copyBtn.querySelector('code').textContent;
            
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
                copyBtn.style.background = 'var(--color-accent)';
                copyBtn.style.color = 'var(--color-white)';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                    copyBtn.style.background = '';
                    copyBtn.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    }
});

// Example tabs functionality
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed nav
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll behavior
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Add shadow on scroll
    if (currentScroll > 10) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for subtle animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and other elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .eco-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add subtle hover effect to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .eco-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < 800) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.001);
    }
});