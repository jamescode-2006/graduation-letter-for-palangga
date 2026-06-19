// The romantic graduation message
const messageText = `My Dearest Love,

Today is more than just a graduation day—it's the celebration of all your hard work, sacrifices, sleepless nights, and determination. I have witnessed how much effort you poured into reaching this moment, and seeing you achieve this milestone fills my heart with so much pride and happiness.

There were days when you felt tired, stressed, and unsure of yourself, yet you never gave up. You continued moving forward with courage and strength, and now all those challenges have led you to this beautiful achievement. You truly deserve every success and recognition that comes your way.

As you wear your graduation attire and step into a new chapter of your life, always remember how amazing, capable, and strong you are. This diploma is not just a piece of paper—it is proof of your perseverance, dedication, and dreams coming true.

Thank you for inspiring me every day with your passion and determination. No matter where life takes us, I will always be your biggest supporter, cheering for your victories and standing beside you through every challenge.

Congratulations, my beautiful graduate. I am beyond proud of you, and I can't wait to see all the wonderful things you will accomplish in the future. May this achievement be the beginning of even greater blessings, opportunities, and happiness.

I love you more than words can ever express, and today, my heart celebrates not only your graduation but also the incredible person you have become.

Forever proud of you. Forever grateful for you. Forever yours. 💖🎓✨`;

// Typing animation variables
let index = 0;
const typedTextElement = document.getElementById('typedText');
const typingSpeed = 40;
let typingStarted = false;

// Navigation buttons
const messageBtn = document.getElementById('messageBtn');
const albumBtn = document.getElementById('albumBtn');
const homeBtn1 = document.getElementById('homeBtn1');
const homeBtn2 = document.getElementById('homeBtn2');
const heroSection = document.getElementById('hero');
const messageSection = document.getElementById('message');
const albumSection = document.getElementById('album');
const footerSection = document.querySelector('.footer');
const gallery = document.getElementById('gallery');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

// Music control
let musicStarted = false;
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = null;
let audioSource = null;
let musicGain = null;
let chorusDelay = null;
let chorusFeedback = null;
let chorusFilter = null;
let chorusPanner = null;

function setupMusicEffects() {
    if (!bgMusic || !AudioContext) return;
    if (audioSource) return;

    audioContext = new AudioContext();
    audioSource = audioContext.createMediaElementSource(bgMusic);
    musicGain = audioContext.createGain();
    chorusDelay = audioContext.createDelay(0.5);
    chorusFeedback = audioContext.createGain();
    chorusFilter = audioContext.createBiquadFilter();
    chorusPanner = audioContext.createStereoPanner();

    chorusDelay.delayTime.value = 0.18;
    chorusFeedback.gain.value = 0.16;
    chorusFilter.type = 'lowpass';
    chorusFilter.frequency.value = 1600;
    chorusPanner.pan.value = 0.08;
    musicGain.gain.value = 0.55;

    audioSource.connect(musicGain);
    musicGain.connect(chorusFilter);
    chorusFilter.connect(chorusDelay);
    chorusDelay.connect(chorusFeedback);
    chorusFeedback.connect(chorusDelay);
    chorusDelay.connect(audioContext.destination);
    chorusPanner.connect(audioContext.destination);
    chorusFilter.connect(chorusPanner);
    musicGain.connect(audioContext.destination);
}

function fadeMusic(targetVolume, duration = 700) {
    if (!bgMusic) return;
    const startVolume = bgMusic.volume;
    const steps = 20;
    const interval = duration / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
        currentStep += 1;
        bgMusic.volume = Math.min(1, Math.max(0, startVolume + ((targetVolume - startVolume) * (currentStep / steps))));
        if (currentStep >= steps) {
            clearInterval(fadeInterval);
            if (targetVolume === 0) {
                bgMusic.pause();
            }
        }
    }, interval);
}

function startMusic() {
    if (!bgMusic || musicStarted) return;
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
    setupMusicEffects();
    bgMusic.volume = 0;
    bgMusic.play().then(() => {
        fadeMusic(0.58, 900);
        musicToggle.textContent = '🔊';
        musicToggle.classList.add('playing');
        musicStarted = true;
    }).catch(err => {
        console.log('Cannot play music:', err);
    });
}

// Music Toggle Button Handler
musicToggle.addEventListener('click', () => {
    if (!bgMusic) return;
    if (bgMusic.paused) {
        startMusic();
    } else {
        fadeMusic(0, 700);
        musicToggle.textContent = '🔇';
        musicToggle.classList.remove('playing');
        musicStarted = false;
    }
});

// Typing function
function typeText() {
    if (index < messageText.length) {
        typedTextElement.textContent += messageText.charAt(index);
        index++;
        setTimeout(typeText, typingSpeed);
    } else {
        // Hide cursor after typing is complete
        document.querySelector('.cursor').style.display = 'none';

        // Enable scrolling within the message section
        setTimeout(() => {
            // Keep the fullscreen letter view scrollable so the full message can be read.
        }, 1000); // Wait 1 second after typing completes
    }
}

// Message Button Click Handler
messageBtn.addEventListener('click', () => {
    // Start background music
    startMusic();

    // Hide hero, album, and footer sections
    heroSection.classList.add('hidden');
    albumSection.classList.add('hidden');
    footerSection.classList.add('hidden');

    // Make message section fullscreen and allow reading the full letter
    messageSection.classList.add('fullscreen');

    // Reset typing if needed
    if (typingStarted) {
        index = 0;
        typedTextElement.textContent = '';
        document.querySelector('.cursor').style.display = 'inline';
    }

    // Start typing animation
    setTimeout(() => {
        if (!typingStarted || index === 0) {
            typingStarted = true;
            typeText();
        }
    }, 300);
});

// Album Button Click Handler
albumBtn.addEventListener('click', () => {
    // Start background music
    startMusic();

    // Hide hero, message, and footer sections
    heroSection.classList.add('hidden');
    messageSection.classList.add('hidden');
    footerSection.classList.add('hidden');

    // Make album section fullscreen and disable scroll
    albumSection.classList.add('fullscreen');
    document.body.classList.add('no-scroll');

    // Show gallery with fade-in animation
    setTimeout(() => {
        gallery.classList.add('show');
    }, 300);
});

// Home Button Click Handlers
homeBtn1.addEventListener('click', () => {
    // Show all sections again
    heroSection.classList.remove('hidden');
    albumSection.classList.remove('hidden');
    footerSection.classList.remove('hidden');

    // Remove fullscreen mode
    messageSection.classList.remove('fullscreen');
    document.body.classList.remove('no-scroll');

    // Scroll to hero
    heroSection.scrollIntoView({ behavior: 'smooth' });
});

homeBtn2.addEventListener('click', () => {
    // Show all sections again
    heroSection.classList.remove('hidden');
    messageSection.classList.remove('hidden');
    footerSection.classList.remove('hidden');

    // Remove fullscreen mode
    albumSection.classList.remove('fullscreen');
    document.body.classList.remove('no-scroll');

    // Scroll to hero
    heroSection.scrollIntoView({ behavior: 'smooth' });
});

// Intersection Observer for album section (alternative trigger)
const observerOptions = {
    threshold: 0.2
};

const albumObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            gallery.classList.add('show');
        }
    });
}, observerOptions);

albumObserver.observe(albumSection);

// Create additional floating hearts dynamically
function createFloatingHeart() {
    const symbols = ['💖', '💕', '✨', '🎓', '⭐'];
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];

    const element = document.createElement('div');
    element.textContent = randomSymbol;
    element.style.position = 'fixed';
    element.style.left = Math.random() * 100 + '%';
    element.style.bottom = '-50px';
    element.style.fontSize = '2rem';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '1';
    element.style.opacity = '0';
    element.style.animation = `floatUp ${10 + Math.random() * 5}s linear forwards`;

    document.body.appendChild(element);

    setTimeout(() => {
        element.remove();
    }, 15000);
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 3000);

// Add CSS animation for floating symbols
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            bottom: -50px;
            opacity: 0;
            transform: translateX(0) rotate(0deg);
        }
        25% {
            opacity: 0.7;
        }
        50% {
            transform: translateX(50px) rotate(180deg);
        }
        75% {
            opacity: 0.4;
        }
        100% {
            bottom: 110%;
            opacity: 0;
            transform: translateX(-30px) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Console Easter Egg
console.log('%c💖 Congratulations, Graduate! 💖', 'font-size: 24px; color: #d946a6; font-weight: Italic;');
console.log('%cMade with love 💕', 'font-size: 16px; color: #8b5cf6;');

/* Lightbox / full-screen image viewer (mobile-friendly) */
const galleryImages = Array.from(document.querySelectorAll('#gallery img'));
if (galleryImages.length > 0) {
    let currentIndex = 0;

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close">✕</button>
            <button class="lightbox-prev" aria-label="Previous">‹</button>
            <img src="" alt="" />
            <button class="lightbox-next" aria-label="Next">›</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lbImg = lightbox.querySelector('img');
    const lbClose = lightbox.querySelector('.lightbox-close');
    const lbPrev = lightbox.querySelector('.lightbox-prev');
    const lbNext = lightbox.querySelector('.lightbox-next');

    function showImage(index) {
        currentIndex = (index + galleryImages.length) % galleryImages.length;
        const src = galleryImages[currentIndex].getAttribute('src');
        const alt = galleryImages[currentIndex].getAttribute('alt') || '';
        lbImg.src = src;
        lbImg.alt = alt;
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.classList.add('show');
        document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.classList.remove('no-scroll');
        lbImg.src = '';
    }

    function prevImage() { showImage(currentIndex - 1); }
    function nextImage() { showImage(currentIndex + 1); }

    // Click / touch handlers for gallery images
    galleryImages.forEach((img, i) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openLightbox(i));
        img.addEventListener('touchstart', (e) => { e.preventDefault(); openLightbox(i); });
    });

    // Lightbox controls
    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', prevImage);
    lbNext.addEventListener('click', nextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // Close when tapping the backdrop
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Simple touch swipe support
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    lightbox.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) prevImage(); else nextImage();
        }
    });
}
