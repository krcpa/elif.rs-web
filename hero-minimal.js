// elif.rs Minimal Hero - Interactive functionality

document.addEventListener('DOMContentLoaded', () => {
  // Copy to clipboard
  const copyBtn = document.querySelector('.copy-btn');
  const codeText = document.querySelector('.install-box code');
  
  if (copyBtn && codeText) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(codeText.textContent);
        
        // Visual feedback
        const originalSVG = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        copyBtn.style.color = '#16a34a';
        
        setTimeout(() => {
          copyBtn.innerHTML = originalSVG;
          copyBtn.style.color = '';
        }, 1500);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  }
  
  // Terminal cursor typing effect
  const terminalText = document.querySelector('.prompt-text');
  const cursor = document.querySelector('.prompt-cursor');
  
  if (terminalText && cursor) {
    const fullText = terminalText.textContent;
    terminalText.textContent = '';
    cursor.style.display = 'inline-block';
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        terminalText.textContent += fullText[i];
        i++;
      } else {
        clearInterval(typeInterval);
        // Keep cursor blinking after typing
      }
    }, 50);
  }
  
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