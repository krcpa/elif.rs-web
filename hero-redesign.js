// elif.rs Hero Redesign - Interactive Elements

document.addEventListener('DOMContentLoaded', () => {
  // Copy to clipboard functionality
  const copyButton = document.querySelector('.copy-button');
  const installCommand = document.querySelector('.install-command code');
  
  if (copyButton && installCommand) {
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(installCommand.textContent);
        
        // Visual feedback
        const originalHTML = copyButton.innerHTML;
        copyButton.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        copyButton.style.color = '#16a34a';
        
        setTimeout(() => {
          copyButton.innerHTML = originalHTML;
          copyButton.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  }
  
  // Intersection Observer for reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all elements with data-reveal attribute
  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
  
  // Add hover effects to floating cards
  const floatingCards = document.querySelectorAll('.floating-card');
  
  floatingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.animationPlayState = 'paused';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.animationPlayState = 'running';
    });
  });
  
  // Smooth scroll for CTA button
  const ctaButton = document.querySelector('.cta-primary');
  
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      // In a real implementation, this would scroll to the next section
      // or navigate to a getting started page
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  }
});