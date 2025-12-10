// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully!');
    
    // Get elements
    const callToActionButton = document.getElementById('cta-button');
    const showMessageButton = document.getElementById('show-message-btn');
    const dynamicContent = document.getElementById('dynamic-content');
    
    // Counter for button clicks
    let clickCount = 0;
    
    // CTA Button Click Event with confetti and emoji
    if (callToActionButton) {
        callToActionButton.addEventListener('click', function(event) {
            clickCount++;
            
            // Show dynamic content
            dynamicContent.textContent = `素晴らしい！ボタンが ${clickCount} 回クリックされました！ 🎉`;
            dynamicContent.classList.add('show');
            
            // Create confetti effect
            createConfetti(event.pageX, event.pageY);
            
            // Create emoji reaction
            createEmojiReaction(event.pageX, event.pageY, ['🎉', '✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 5)]);
            
            // Smooth scroll to the dynamic content
            dynamicContent.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Add a small animation effect to the button
            callToActionButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                callToActionButton.style.transform = 'scale(1)';
            }, 100);
            
            console.log(`CTA button clicked ${clickCount} times`);
        });
    }
    
    // Show Message Button Click Event
    if (showMessageButton) {
        showMessageButton.addEventListener('click', function() {
            // Create a custom message with current time
            const currentTime = new Date();
            const timeString = currentTime.toLocaleTimeString('ja-JP');
            
            // Show alert with message
            alert(`こんにちは！ 現在の時刻は ${timeString} です。\n\nお問い合わせありがとうございます！`);
            
            // Change button text temporarily
            const originalText = showMessageButton.textContent;
            showMessageButton.textContent = '送信完了 ✓';
            showMessageButton.disabled = true;
            
            setTimeout(() => {
                showMessageButton.textContent = originalText;
                showMessageButton.disabled = false;
            }, 2000);
            
            console.log('Message button clicked at:', timeString);
        });
    }
    
    // Add smooth scrolling to all navigation links
    const navigationLinks = document.querySelectorAll('.nav-links a');
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
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
    const currentHour = new Date().getHours();
    let timeBasedGreeting;
    
    if (currentHour < 12) {
        timeBasedGreeting = 'おはようございます';
    } else if (currentHour < 18) {
        timeBasedGreeting = 'こんにちは';
    } else {
        timeBasedGreeting = 'こんばんは';
    }
    
    console.log(`${timeBasedGreeting}! 訪問ありがとうございます。`);
    
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
    const startGameButton = document.getElementById('start-game-btn');
    const gameGrid = document.getElementById('game-grid');
    const gameCells = document.querySelectorAll('.game-cell');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const gameResult = document.getElementById('game-result');
    
    let gameScore = 0;
    let remainingGameTime = 30;
    let isGameActive = false;
    let gameTimerInterval;
    let targetSpawnInterval;
    
    if (startGameButton) {
        startGameButton.addEventListener('click', function() {
            startGame();
        });
    }
    
    function startGame() {
        // Reset game state
        gameScore = 0;
        remainingGameTime = 30;
        isGameActive = true;
        scoreDisplay.textContent = gameScore;
        timerDisplay.textContent = remainingGameTime;
        gameResult.textContent = '';
        gameResult.classList.remove('show');
        
        // Activate game grid
        gameGrid.classList.add('active');
        startGameButton.disabled = true;
        startGameButton.textContent = 'プレイ中...';
        
        // Clear all active cells
        gameCells.forEach(cell => {
            cell.classList.remove('active');
            cell.textContent = '';
        });
        
        // Start timer
        gameTimerInterval = setInterval(() => {
            remainingGameTime--;
            timerDisplay.textContent = remainingGameTime;
            
            if (remainingGameTime <= 0) {
                endGame();
            }
        }, 1000);
        
        // Start spawning targets
        spawnTarget();
        targetSpawnInterval = setInterval(() => {
            if (isGameActive) {
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
        cell.addEventListener('click', function(event) {
            if (isGameActive && this.classList.contains('active')) {
                gameScore++;
                scoreDisplay.textContent = gameScore;
                
                // Visual feedback
                createConfetti(event.pageX, event.pageY);
                createEmojiReaction(event.pageX, event.pageY, '✨');
                
                // Clear the clicked cell
                this.classList.remove('active');
                this.textContent = '';
                
                // Spawn new target immediately
                setTimeout(() => {
                    if (isGameActive) {
                        spawnTarget();
                    }
                }, 200);
            }
        });
    });
    
    function endGame() {
        isGameActive = false;
        clearInterval(gameTimerInterval);
        clearInterval(targetSpawnInterval);
        
        gameGrid.classList.remove('active');
        startGameButton.disabled = false;
        startGameButton.textContent = 'もう一度プレイ！';
        
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
        for (let celebrationIndex = 0; celebrationIndex < 30; celebrationIndex++) {
            setTimeout(() => {
                createConfetti(
                    window.innerWidth / 2 + (Math.random() - 0.5) * 300,
                    window.innerHeight / 2
                );
            }, celebrationIndex * 50);
        }
    }
    
    // ========== FUN FACTS FUNCTIONALITY ==========
    const newFactButton = document.getElementById('new-fact-btn');
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
    
    if (newFactButton) {
        newFactButton.addEventListener('click', function(event) {
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
            createEmojiReaction(event.pageX, event.pageY, ['😄', '😊', '🤗', '😃', '🥳'][Math.floor(Math.random() * 5)]);
        });
    }
});

// Add keyboard shortcut (Ctrl/Cmd + Home) to scroll to top
document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Home') {
        event.preventDefault();
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
function createConfetti(mouseX, mouseY) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#fdcb6e', '#e17055'];
    const confettiCount = 20;
    
    for (let confettiIndex = 0; confettiIndex < confettiCount; confettiIndex++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = mouseX + 'px';
        confetti.style.top = mouseY + 'px';
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
function createEmojiReaction(mouseX, mouseY, emoji) {
    const reaction = document.createElement('div');
    reaction.className = 'emoji-reaction';
    reaction.textContent = emoji;
    reaction.style.left = (mouseX - 25) + 'px';
    reaction.style.top = (mouseY - 25) + 'px';
    
    document.body.appendChild(reaction);
    
    // Remove after animation
    setTimeout(() => {
        reaction.remove();
    }, 2000);
}
