document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const musicToggleBtn = document.getElementById('music-toggle');
    const confettiBackground = document.querySelector('.confetti-background');

    // --- Music Player Logic ---
    let isMusicPlaying = localStorage.getItem('isMusicPlaying') === 'true';

    const updateMusicControls = () => {
        if (isMusicPlaying) {
            playPauseBtn.classList.remove('fa-play');
            playPauseBtn.classList.add('fa-pause');
            musicToggleBtn.textContent = 'Pause Music';
            if (audio.paused) { // Only play if not already playing
                audio.play().catch(e => console.log("Music auto-play prevented:", e));
            }
        } else {
            playPauseBtn.classList.remove('fa-pause');
            playPauseBtn.classList.add('fa-play');
            musicToggleBtn.textContent = 'Play Music';
            audio.pause();
        }
    };

    // Attempt to play music on user interaction (recommended for autoplay policies)
    const initMusicOnInteraction = () => {
        if (isMusicPlaying && audio.paused) {
            audio.play().then(() => {
                console.log("Music started successfully on user interaction.");
            }).catch(e => {
                console.warn("Music auto-play failed, user interaction needed:", e);
                // Fallback: If autoplay fails, ensure controls reflect paused state
                isMusicPlaying = false;
                localStorage.setItem('isMusicPlaying', 'false');
                updateMusicControls();
            });
        }
        // Remove listener after first interaction to prevent multiple calls
        document.removeEventListener('click', initMusicOnInteraction);
        document.removeEventListener('touchend', initMusicOnInteraction);
    };

    // Add event listeners for initial user interaction
    document.addEventListener('click', initMusicOnInteraction);
    document.addEventListener('touchend', initMusicOnInteraction);

    // Initial state update for controls
    updateMusicControls();

    playPauseBtn.addEventListener('click', () => {
        isMusicPlaying = !isMusicPlaying;
        localStorage.setItem('isMusicPlaying', isMusicPlaying);
        updateMusicControls();
    });

    musicToggleBtn.addEventListener('click', () => {
        isMusicPlaying = !isMusicPlaying;
        localStorage.setItem('isMusicPlaying', isMusicPlaying);
        updateMusicControls();
    });

    // --- Navigation Logic ---
    const setupNavigation = () => {
        const path = window.location.pathname;

        // Index Page -> Gallery Page
        if (path.includes('index.html') || path === '/') {
            const continueBtn = document.getElementById('continueBtn1');
            if (continueBtn) {
                continueBtn.addEventListener('click', () => {
                    window.location.href = 'gallery.html';
                });
            }
        }
        // Gallery Page -> Wishes Page
        else if (path.includes('gallery.html')) {
            const nextBtn = document.querySelector('.next-btn'); // This selects the first next-btn
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    window.location.href = 'wishes.html';
                });
            }
        }
        // Wishes Page -> Journey Page (UPDATED FLOW HERE)
        else if (path.includes('wishes.html')) {
            const nextBtn = document.getElementById('proceedToJourney'); // Using ID for precision
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    window.location.href = 'journey.html';
                });
            }
        }
        // Journey Page -> Dreams Page
        else if (path.includes('journey.html')) {
            const nextBtn = document.querySelector('.next-btn');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    window.location.href = 'dreams.html';
                });
            }
        }
        // Dreams Page -> Celebration Page
        else if (path.includes('dreams.html')) {
            const nextBtn = document.querySelector('.next-btn');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    window.location.href = 'celebration.html';
                });
            }
        }
        // Celebration Page -> Index Page (Return to Start)
        else if (path.includes('celebration.html')) {
            const returnBtn = document.querySelector('.return-to-start-btn');
            if (returnBtn) {
                returnBtn.addEventListener('click', () => {
                    window.location.href = 'index.html';
                });
            }
        }
    };

    setupNavigation();

    // --- Confetti Effect Logic ---
    if (confettiBackground) {
        const createConfetti = () => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            const colors = ['#ff6f91', '#ffc72c', '#a1c4fd', '#99e2b4', '#f77f00', '#6a0572']; // Festive colors
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.setProperty('--confetti-color', randomColor);

            const startX = Math.random() * 100 + 'vw';
            const endX = (Math.random() * 200 - 50) + 'vw'; // Allow confetti to drift
            const duration = Math.random() * 3 + 4; // 4 to 7 seconds
            const rotation = Math.random() * 360;
            const rotationEnd = Math.random() * 720;

            confetti.style.setProperty('--start-x', startX);
            confetti.style.setProperty('--end-x', endX);
            confetti.style.setProperty('--confetti-duration', `${duration}s`);
            confetti.style.setProperty('--confetti-rotation', `${rotation}deg`);
            confetti.style.setProperty('--confetti-rotation-end', `${rotationEnd}deg`);
            confetti.style.left = startX; // Initial X position
            confetti.style.animationDelay = `-${Math.random() * duration}s`; // Stagger animation start

            confettiBackground.appendChild(confetti);

            // Remove confetti after it falls out of view to prevent DOM bloat
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        };

        // Generate a continuous stream of confetti
        // Only run confetti if the page is designed for it (i.e., has confetti-background)
        if (document.body.classList.contains('index-page') ||
            document.body.classList.contains('gallery-page') ||
            document.body.classList.contains('wishes-page') || // If you want confetti on the new wishes page
            document.body.classList.contains('journey-page') ||
            document.body.classList.contains('dreams-page') ||
            document.body.classList.contains('celebration-page')) {
            setInterval(createConfetti, 100); // Create a new confetti every 100ms
        }
    }

    // --- Balloon Generation Logic ---
    const balloonBackground = document.querySelector('.balloon-background');
    if (balloonBackground) {
        const createBalloon = () => {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');

            // Randomize size, position, duration, and drift for each balloon
            const size = Math.random() * 50 + 60; // 60px to 110px
            const height = size * 1.25; // Keep aspect ratio
            const left = Math.random() * 100; // 0% to 100% of viewport width
            const duration = Math.random() * 10 + 15; // 15s to 25s
            const delay = Math.random() * 10; // Stagger start times
            const driftAmount = (Math.random() - 0.5) * 150; // -75px to 75px horizontal drift
            const rotateAmount = (Math.random() - 0.5) * 60; // -30deg to 30deg rotation

            balloon.style.setProperty('--balloon-size', `${size}px`);
            balloon.style.setProperty('--balloon-height', `${height}px`);
            balloon.style.setProperty('--float-duration', `${duration}s`);
            balloon.style.setProperty('--drift-amount', `${driftAmount}px`);
            balloon.style.setProperty('--rotate-amount', `${rotateAmount}deg`);
            balloon.style.left = `${left}vw`;
            balloon.style.animationDelay = `-${delay}s`; // Negative delay to start animation immediately

            balloonBackground.appendChild(balloon);

            // Remove balloon after its animation ends to prevent DOM bloat
            balloon.addEventListener('animationend', () => {
                balloon.remove();
            });
        };

        // Create initial balloons to fill the screen
        for (let i = 0; i < 20; i++) { // Start with 20 balloons
            createBalloon();
        }

        // Continuously add new balloons
        setInterval(createBalloon, 2000); // Add a new balloon every 2 seconds
    }
});
