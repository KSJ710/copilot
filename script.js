// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully!');
    
    // Get elements
    const ctaButton = document.getElementById('cta-button');
    const showMessageBtn = document.getElementById('show-message-btn');
    const dynamicContent = document.getElementById('dynamic-content');
    
    // Counter for button clicks
    let clickCount = 0;
    
    // CTA Button Click Event with confetti and emoji
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            clickCount++;
            
            // Show dynamic content
            dynamicContent.textContent = `素晴らしい！ボタンが ${clickCount} 回クリックされました！ 🎉`;
            dynamicContent.classList.add('show');
            
            // Create confetti effect
            createConfetti(e.pageX, e.pageY);
            
            // Create emoji reaction
            createEmojiReaction(e.pageX, e.pageY, ['🎉', '✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 5)]);
            
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
    
    // ========== GAME FUNCTIONALITY ==========
    const startGameBtn = document.getElementById('start-game-btn');
    const gameGrid = document.getElementById('game-grid');
    const gameCells = document.querySelectorAll('.game-cell');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const gameResult = document.getElementById('game-result');
    
    let gameScore = 0;
    let gameTime = 30;
    let gameActive = false;
    let gameInterval;
    let targetInterval;
    
    if (startGameBtn) {
        startGameBtn.addEventListener('click', function() {
            startGame();
        });
    }
    
    function startGame() {
        // Reset game state
        gameScore = 0;
        gameTime = 30;
        gameActive = true;
        scoreDisplay.textContent = gameScore;
        timerDisplay.textContent = gameTime;
        gameResult.textContent = '';
        gameResult.classList.remove('show');
        
        // Activate game grid
        gameGrid.classList.add('active');
        startGameBtn.disabled = true;
        startGameBtn.textContent = 'プレイ中...';
        
        // Clear all active cells
        gameCells.forEach(cell => {
            cell.classList.remove('active');
            cell.textContent = '';
        });
        
        // Start timer
        gameInterval = setInterval(() => {
            gameTime--;
            timerDisplay.textContent = gameTime;
            
            if (gameTime <= 0) {
                endGame();
            }
        }, 1000);
        
        // Start spawning targets
        spawnTarget();
        targetInterval = setInterval(() => {
            if (gameActive) {
                spawnTarget();
            }
        }, 1200);
    }
    
    function spawnTarget() {
        // Clear previous targets
        gameCells.forEach(cell => {
            cell.classList.remove('active');
            cell.textContent = '';
        });
        
        // Spawn new target
        const randomCell = gameCells[Math.floor(Math.random() * gameCells.length)];
        const emojis = ['🎯', '⭐', '🌟', '💎', '🎁', '🍎', '🍕', '🎨'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        randomCell.classList.add('active');
        randomCell.textContent = randomEmoji;
    }
    
    // Add click handlers to game cells
    gameCells.forEach(cell => {
        cell.addEventListener('click', function(e) {
            if (gameActive && this.classList.contains('active')) {
                gameScore++;
                scoreDisplay.textContent = gameScore;
                
                // Visual feedback
                createConfetti(e.pageX, e.pageY);
                createEmojiReaction(e.pageX, e.pageY, '✨');
                
                // Clear the clicked cell
                this.classList.remove('active');
                this.textContent = '';
                
                // Spawn new target immediately
                setTimeout(() => {
                    if (gameActive) {
                        spawnTarget();
                    }
                }, 200);
            }
        });
    });
    
    function endGame() {
        gameActive = false;
        clearInterval(gameInterval);
        clearInterval(targetInterval);
        
        gameGrid.classList.remove('active');
        startGameBtn.disabled = false;
        startGameBtn.textContent = 'もう一度プレイ！';
        
        // Clear all cells
        gameCells.forEach(cell => {
            cell.classList.remove('active');
            cell.textContent = '';
        });
        
        // Show result
        let resultMessage = '';
        if (gameScore >= 25) {
            resultMessage = `🏆 素晴らしい！スコア: ${gameScore} - あなたは達人です！`;
        } else if (gameScore >= 15) {
            resultMessage = `🎉 よくできました！スコア: ${gameScore} - 上手ですね！`;
        } else if (gameScore >= 5) {
            resultMessage = `👍 いい感じ！スコア: ${gameScore} - もう少し頑張りましょう！`;
        } else {
            resultMessage = `😊 スコア: ${gameScore} - 次はもっと良くなりますよ！`;
        }
        
        gameResult.textContent = resultMessage;
        gameResult.classList.add('show');
        
        // Create celebration confetti
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createConfetti(
                    window.innerWidth / 2 + (Math.random() - 0.5) * 300,
                    window.innerHeight / 2
                );
            }, i * 50);
        }
    }
    
    // ========== FUN FACTS FUNCTIONALITY ==========
    const newFactBtn = document.getElementById('new-fact-btn');
    const funFactDisplay = document.getElementById('fun-fact-display');
    
    const funFacts = [
        '🐙 タコには3つの心臓があります！',
        '🌈 虹は実際には完全な円ですが、地上からは半円にしか見えません！',
        '🍯 蜂蜜は腐りません。3000年前の蜂蜜も食べられます！',
        '🐬 イルカは名前を持っていて、お互いを名前で呼び合います！',
        '🌙 月は毎年3.8センチメートルずつ地球から離れています！',
        '🦒 キリンの舌は約50センチメートルもあります！',
        '🍌 バナナは実は「ベリー」の一種ですが、イチゴは違います！',
        '🐝 ミツバチは人間の顔を認識できます！',
        '🌍 地球上には木よりも星の方が多いです！',
        '🦋 蝶は足で味を感じることができます！',
        '🎮 テトリスをプレイすると、悪い思い出を忘れやすくなるという研究結果があります！',
        '🍫 チョコレートは昔、薬として使われていました！',
        '🎵 音楽を聴くと植物の成長が促進されるという研究があります！',
        '🐧 ペンギンはプロポーズのとき、小石をプレゼントします！',
        '🌸 桜の花は実は香りがほとんどありません！',
        '🎨 ピカソの本名は23単語もあります！',
        '🦘 カンガルーは後ろに歩けません！',
        '🌊 海には地上よりも多くの歴史的遺物があります！',
        '🎪 サーカスのピエロの大きな靴は、笑いを誘うために発明されました！',
        '🎭 笑うと健康になります。笑いは免疫システムを強化します！'
    ];
    
    let currentFactIndex = -1;
    
    if (newFactBtn) {
        newFactBtn.addEventListener('click', function(e) {
            // Add animation
            funFactDisplay.classList.add('animate');
            
            setTimeout(() => {
                // Get a random fact different from the current one
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * funFacts.length);
                } while (newIndex === currentFactIndex && funFacts.length > 1);
                
                currentFactIndex = newIndex;
                
                funFactDisplay.querySelector('p').textContent = funFacts[currentFactIndex];
                
                funFactDisplay.classList.remove('animate');
            }, 300);
            
            // Create emoji reaction
            createEmojiReaction(e.pageX, e.pageY, ['😄', '😊', '🤗', '😃', '🥳'][Math.floor(Math.random() * 5)]);
        });
    }
});

// Add keyboard shortcut (Ctrl/Cmd + Home) to scroll to top
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Scrolled to top via keyboard shortcut');
    }
});

// Log when user scrolls (reduced frequency for performance)
let scrollTimeout;
let lastLoggedPosition = 0;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const scrollPosition = window.scrollY;
        // Only log if scrolled more than 200px from last logged position
        if (Math.abs(scrollPosition - lastLoggedPosition) > 200) {
            console.log('Current scroll position:', scrollPosition);
            lastLoggedPosition = scrollPosition;
        }
    }, 500);
});

// ========== HELPER FUNCTIONS FOR ENTERTAINMENT ==========

// Create confetti effect
function createConfetti(x, y) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#fdcb6e', '#e17055'];
    const confettiCount = 20;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Create emoji reaction
function createEmojiReaction(x, y, emoji) {
    const reaction = document.createElement('div');
    reaction.className = 'emoji-reaction';
    reaction.textContent = emoji;
    reaction.style.left = (x - 25) + 'px';
    reaction.style.top = (y - 25) + 'px';
    
    document.body.appendChild(reaction);
    
    // Remove after animation
    setTimeout(() => {
        reaction.remove();
    }, 2000);
}
