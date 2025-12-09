// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully!');
    
    // Get elements
    const ctaButton = document.getElementById('cta-button');
    const showMessageBtn = document.getElementById('show-message-btn');
    const dynamicContent = document.getElementById('dynamic-content');
    
    // Counter for button clicks
    let clickCount = 0;
    
    // CTA Button Click Event
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            clickCount++;
            
            // Show dynamic content
            dynamicContent.textContent = `素晴らしい！ボタンが ${clickCount} 回クリックされました！ 🎉`;
            dynamicContent.classList.add('show');
            
            // Smooth scroll to the dynamic content
            dynamicContent.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Add a small animation effect to the button
            ctaButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                ctaButton.style.transform = 'scale(1)';
            }, 100);
            
            console.log(`CTA button clicked ${clickCount} times`);
        });
    }
    
    // Show Message Button Click Event
    if (showMessageBtn) {
        showMessageBtn.addEventListener('click', function() {
            // Create a custom message with current time
            const now = new Date();
            const timeString = now.toLocaleTimeString('ja-JP');
            
            // Show alert with message
            alert(`こんにちは！ 現在の時刻は ${timeString} です。\n\nお問い合わせありがとうございます！`);
            
            // Change button text temporarily
            const originalText = showMessageBtn.textContent;
            showMessageBtn.textContent = '送信完了 ✓';
            showMessageBtn.disabled = true;
            
            setTimeout(() => {
                showMessageBtn.textContent = originalText;
                showMessageBtn.disabled = false;
            }, 2000);
            
            console.log('Message button clicked at:', timeString);
        });
    }
    
    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            console.log('Navigated to:', targetId);
        });
    });
    
    // Add a welcome message to console
    console.log('%c Welcome to MyWebsite! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    
    // Dynamic greeting based on time of day
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = 'おはようございます';
    } else if (hour < 18) {
        greeting = 'こんにちは';
    } else {
        greeting = 'こんばんは';
    }
    
    console.log(`${greeting}! 訪問ありがとうございます。`);
    
    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            console.log('Feature card hovered');
        });
    });
    
    // Display initial message after a short delay
    setTimeout(() => {
        if (dynamicContent) {
            dynamicContent.textContent = '👋 上のボタンをクリックして、動的なコンテンツを体験してください！';
            dynamicContent.classList.add('show');
        }
    }, 1000);
});

// Add keyboard shortcut (Ctrl/Cmd + K) to scroll to top
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Scrolled to top via keyboard shortcut');
    }
});

// Log when user scrolls
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const scrollPosition = window.scrollY;
        console.log('Current scroll position:', scrollPosition);
    }, 100);
});
