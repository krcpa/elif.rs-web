// elif.rs DX ∩ AX Hero - Interactive Elements

document.addEventListener('DOMContentLoaded', () => {
  // Copy functionality
  const copyBtn = document.querySelector('.copy-btn');
  const installCmd = document.querySelector('.install-command code');
  
  if (copyBtn && installCmd) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(installCmd.textContent);
        
        const originalSVG = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        
        setTimeout(() => {
          copyBtn.innerHTML = originalSVG;
        }, 1500);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  }
  
  // Animate confidence bar on scroll
  const confidenceBar = document.querySelector('.confidence-fill');
  if (confidenceBar) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          confidenceBar.style.width = '98%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(confidenceBar);
  }
  
  // Code transformation hover effect enhancement
  const codeTransform = document.querySelector('.code-transform');
  const codeBefore = document.querySelector('.code-before');
  const codeAfter = document.querySelector('.code-after');
  
  if (codeTransform) {
    let isHovered = false;
    
    codeTransform.addEventListener('mouseenter', () => {
      isHovered = true;
      animateCodeTransform();
    });
    
    codeTransform.addEventListener('mouseleave', () => {
      isHovered = false;
    });
    
    function animateCodeTransform() {
      if (!isHovered) return;
      
      // Simulate lines disappearing
      const beforeLines = codeBefore.querySelectorAll('code')[0];
      const originalText = beforeLines.textContent;
      const lines = originalText.split('\n');
      
      let currentLines = lines.length;
      const interval = setInterval(() => {
        if (!isHovered || currentLines <= 3) {
          clearInterval(interval);
          beforeLines.textContent = originalText;
          return;
        }
        
        currentLines--;
        beforeLines.textContent = lines.slice(0, currentLines).join('\n');
      }, 300);
    }
  }
  
  // Typing effect for AI prompt
  const promptText = document.querySelector('.prompt-text');
  if (promptText) {
    const fullText = promptText.textContent;
    promptText.textContent = '';
    
    setTimeout(() => {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < fullText.length) {
          promptText.textContent = fullText.slice(0, i + 1);
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 40);
    }, 1500);
  }
  
  // Subtle parallax effect on scroll
  const dxSection = document.querySelector('.dx-section');
  const axSection = document.querySelector('.ax-section');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const speed = 0.3;
    
    if (dxSection) {
      dxSection.style.transform = `translateY(${scrollY * speed * 0.05}px)`;
    }
    
    if (axSection) {
      axSection.style.transform = `translateY(${scrollY * speed * -0.05}px)`;
    }
  });
  
  // Smooth scroll for nav links
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
});