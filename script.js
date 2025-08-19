// Terminal-themed interactions for elif.rs

// Tab switching for code examples
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const codeContents = document.querySelectorAll('.code-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-example');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding code
            codeContents.forEach(content => {
                if (content.id === targetId) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });
});

// Copy to clipboard functionality
document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.querySelector('.copy-btn');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const code = document.querySelector('.install-command code').textContent.trim();
            
            try {
                await navigator.clipboard.writeText(code);
                copyBtn.textContent = '✓';
                setTimeout(() => {
                    copyBtn.textContent = '📋';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    }
});

// Terminal typing effect
document.addEventListener('DOMContentLoaded', () => {
    const typedText = document.querySelector('.typed-text');
    if (typedText) {
        const originalText = typedText.textContent;
        typedText.textContent = '';
        
        let index = 0;
        const typeChar = () => {
            if (index < originalText.length) {
                typedText.textContent += originalText[index];
                index++;
                setTimeout(typeChar, 50);
            }
        };
        
        setTimeout(typeChar, 500);
    }
});

// Add matrix rain effect to background (subtle)
document.addEventListener('DOMContentLoaded', () => {
    const createMatrixRain = () => {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.02';
        canvas.style.zIndex = '0';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = '01';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * canvas.height;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff00';
            ctx.font = fontSize + 'px JetBrains Mono';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(draw, 50);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    };
    
    // Only add on desktop
    if (window.innerWidth > 1024) {
        createMatrixRain();
    }
});

// Smooth scrolling for anchor links
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

// Add glitch effect on hover for main title
document.addEventListener('DOMContentLoaded', () => {
    const asciiArt = document.querySelector('.ascii-art');
    if (asciiArt) {
        asciiArt.addEventListener('mouseenter', () => {
            asciiArt.style.animation = 'glitch 0.3s infinite';
        });
        
        asciiArt.addEventListener('mouseleave', () => {
            asciiArt.style.animation = 'none';
        });
    }
});

// Add glitch animation
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% {
            text-shadow: 
                0.05em 0 0 #00ffff,
                -0.05em -0.025em 0 #ff00ff,
                0.025em 0.05em 0 #ffff00;
        }
        15% {
            text-shadow: 
                0.05em 0 0 #00ffff,
                -0.05em -0.025em 0 #ff00ff,
                0.025em 0.05em 0 #ffff00;
        }
        16% {
            text-shadow: 
                -0.05em -0.025em 0 #00ffff,
                0.025em 0.025em 0 #ff00ff,
                -0.05em -0.05em 0 #ffff00;
        }
        49% {
            text-shadow: 
                -0.05em -0.025em 0 #00ffff,
                0.025em 0.025em 0 #ff00ff,
                -0.05em -0.05em 0 #ffff00;
        }
        50% {
            text-shadow: 
                0.025em 0.05em 0 #00ffff,
                0.05em 0 0 #ff00ff,
                0 -0.05em 0 #ffff00;
        }
        99% {
            text-shadow: 
                0.025em 0.05em 0 #00ffff,
                0.05em 0 0 #ff00ff,
                0 -0.05em 0 #ffff00;
        }
        100% {
            text-shadow: 
                -0.025em 0 0 #00ffff,
                -0.025em -0.025em 0 #ff00ff,
                -0.025em -0.05em 0 #ffff00;
        }
    }
`;
document.head.appendChild(style);

// Terminal command simulation
document.addEventListener('DOMContentLoaded', () => {
    const commandLines = document.querySelectorAll('.command-line');
    
    commandLines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.animation = 'fadeIn 0.5s ease';
        }, 2000 + (index * 1000));
    });
});