document.addEventListener('DOMContentLoaded', () => {
    const messages = document.querySelectorAll('.message');
    const nextBtn = document.getElementById('next-btn');
    const rewindBtn = document.getElementById('rewind-btn');
    const finalSection = document.getElementById('final-section');
    const welcomePopup = document.getElementById('welcome-popup');
    const readBtn = document.getElementById('read-btn');
    const audio = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');
    const heartContainer = document.getElementById('hearts-container');
    
    let currentIndex = 0;
    let isPlaying = false;
    
    tryPlayAudio();
    isPlaying = true;

    // Popup handling
    readBtn.addEventListener('click', () => {
        welcomePopup.style.opacity = '0';
        setTimeout(() => {
            welcomePopup.style.display = 'none';
        }, 500);
        
        // Auto play music when popup is closed (if browser allows)
    });
    
    // Audio Controls
    audioToggle.addEventListener('click', () => {
        if (isPlaying) {
            audio.play();
            audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';

        } else {
            audio.pause();
            audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
        isPlaying = !isPlaying;
    });
    
    function tryPlayAudio() {
        audio.play().then(() => {
            isPlaying = true;
            audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }).catch(err => {
            console.log('Auto-play was prevented. User must interact with the document first.');
        });
    }
    
    // Create floating hearts
    function createHearts() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                
                // Random heart style
                const size = Math.random() * 25 + 10;
                const left = Math.random() * 100;
                const delay = Math.random() * 5;
                const drift = Math.random() * 2 - 1; // Random horizontal drift
                
                heart.style.cssText = `
                    left: ${left}%;
                    font-size: ${size}px;
                    animation-delay: ${delay}s;
                    --drift: ${drift};
                    color: ${getRandomHeartColor()};
                `;
                
                heart.innerHTML = '💕';
                heartContainer.appendChild(heart);
                
                // Remove heart after animation
                setTimeout(() => {
                    heart.remove();
                }, 6000 + delay * 1000);
            }, i * 300);
        }
        
        // Add more hearts periodically
        setTimeout(createHearts, 8000);
    }
    
    function getRandomHeartColor() {
        const colors = [
            '#ff6b93', '#ff97b7', '#ff7eb2', 
            '#ffaac9', '#ff5383', '#ff467e'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Update button states
    function updateButtons() {
        rewindBtn.disabled = currentIndex === 0;
        
        // Jika sudah di pesan terakhir
        if (currentIndex === messages.length - 1) {
            // Tampilkan bagian Chat Juan
            finalSection.classList.add('show');
            nextBtn.disabled = true;
        } else {
            finalSection.classList.remove('show');
            nextBtn.disabled = false;
        }
    }
    
    // Show message at current index
    function showMessage(index) {
        messages.forEach((message, i) => {
            message.classList.remove('active');
            if (i === index) {
                message.classList.add('active');
            }
        });
        updateButtons();
    }
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        if (currentIndex < messages.length - 1) {
            currentIndex++;
            showMessage(currentIndex);
        }
    });
    
    // Rewind button click
    rewindBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showMessage(currentIndex);
        }
    });
    
    // Initialize
    updateButtons();
    createHearts();
});