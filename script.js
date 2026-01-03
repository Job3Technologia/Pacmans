// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    // Loader
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                initAnimations();
            }, 500);
        }, 1500);
    } else {
        initAnimations();
    }
    
    initModal();
    initMobileMenu();
    initHeroSlideshow();
});

function initHeroSlideshow() {
    const heroImage = document.getElementById('hero-image');
    if (!heroImage) return;

    const images = [
        'IMG-20260101-WA0008.png',
        'PSX_20251020_233755~3 (2) (1) (1) (1).png',
        'VideoCapture_20240807-220613~2.png'
    ];
    
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        
        // Fade out
        gsap.to(heroImage, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                heroImage.src = images[currentIndex];
                // Fade in
                gsap.to(heroImage, {
                    opacity: 1,
                    duration: 0.5
                });
            }
        });
    }, 5000); // Change every 5 seconds
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');
    let isOpen = false;

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            isOpen = !isOpen;
            if (isOpen) {
                // Open Menu
                menu.classList.remove('opacity-0', 'pointer-events-none');
                menuBtn.innerHTML = '<i class="fas fa-times"></i>';
                
                // Animate Links
                gsap.fromTo(links, 
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.2 }
                );
            } else {
                // Close Menu
                menu.classList.add('opacity-0', 'pointer-events-none');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Close on Link Click
        links.forEach(link => {
            link.addEventListener('click', () => {
                isOpen = false;
                menu.classList.add('opacity-0', 'pointer-events-none');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

function initAnimations() {
    // Navbar Animation
    gsap.from("nav", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
    });

    // Section 1: Hero
    gsap.from("#hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5
    });

    gsap.from("#hero-image", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
        delay: 0.8
    });

    // Floating animation for hero image
    gsap.to("#hero-image", {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Navigation Click Handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const container = document.querySelector('.snap-container');
            
            if (targetSection && container) {
                container.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax Effect on Mouse Move for Hero
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            gsap.to("#hero-image", {
                x: x,
                y: y + 20, // Keep the float offset
                duration: 1,
                ease: "power1.out"
            });
        });
    }

    // Section 2: Music Animations
    gsap.from(".album-cover", {
        scrollTrigger: {
            trigger: "#music",
            scroller: ".snap-container",
            start: "top 60%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    // Section 3: Booking Animations
    gsap.from("#booking-card", {
        scrollTrigger: {
            trigger: "#booking",
            scroller: ".snap-container",
            start: "top 70%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

    // Section 4: Gallery Animations
    gsap.from(".gallery-item", {
        scrollTrigger: {
            trigger: "#gallery",
            scroller: ".snap-container",
            start: "top 60%",
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)"
    });

    // Section 5: Events Animations
    gsap.from(".event-item", {
        scrollTrigger: {
            trigger: "#events",
            scroller: ".snap-container",
            start: "top 70%",
        },
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out"
    });
}

// Audio Player Logic
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const progressBar = document.getElementById('progress-bar');
const trackTitle = document.getElementById('current-track');
const trackArtist = document.getElementById('current-artist');

let isPlaying = false;
// Placeholder audio - using a silence or simple beep would be safer, 
// but for now we just simulate the UI state since no real file is provided.
// In a real scenario, playBtn.addEventListener('click', toggleAudio);

if (playBtn) {
    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
            // Simulate progress
            simulateProgress();
        } else {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    });
}

function simulateProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        if (!isPlaying || progress >= 100) {
            clearInterval(interval);
            if (progress >= 100) {
                isPlaying = false;
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
                if (progressBar) progressBar.value = 0;
            }
            return;
        }
        progress += 1; // 1% every 100ms = 10s song
        if (progressBar) progressBar.value = progress;
    }, 100);
}

// Album Selection (Mock)
const albums = document.querySelectorAll('.album-cover');
albums.forEach(album => {
    album.addEventListener('click', () => {
        // Reset active state
        albums.forEach(a => a.classList.remove('ring-2', 'ring-yellow-500'));
        // Set active
        album.classList.add('ring-2', 'ring-yellow-500');
        
        // Update Text
        if (trackTitle) trackTitle.innerText = album.dataset.track || "Unknown Track";
        if (trackArtist && album.dataset.artist) trackArtist.innerText = album.dataset.artist;
        
        // Reset player
        isPlaying = false;
        if (playIcon) {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
        if (progressBar) progressBar.value = 0;
    });
});

// Bio Modal Logic
function initModal() {
    const bioModal = document.getElementById('bio-modal');
    const openBioBtn = document.getElementById('open-bio-btn');
    const closeBioBtn = document.getElementById('close-bio');

    if (openBioBtn && bioModal && closeBioBtn) {
        openBioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            bioModal.classList.remove('hidden');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                bioModal.classList.remove('opacity-0');
            }, 10);
            // Optional: Blur main content
            const main = document.querySelector('main');
            if(main) main.classList.add('blur-sm');
        });

        closeBioBtn.addEventListener('click', () => {
            bioModal.classList.add('opacity-0');
            // Remove blur
            const main = document.querySelector('main');
            if(main) main.classList.remove('blur-sm');
            
            setTimeout(() => {
                bioModal.classList.add('hidden');
            }, 500);
        });
        
        // Close on clicking outside
        bioModal.addEventListener('click', (e) => {
            if (e.target === bioModal || e.target.classList.contains('absolute')) {
                // If clicking the overlay (absolute div) or container
                // Actually the absolute div covers inset-0.
                // Let's check if the click is NOT inside the content div
                // Easier: just attach to the overlay
            }
        });
        
        // Better way to handle outside click given the structure
        const overlay = bioModal.querySelector('.absolute');
        if(overlay) {
            overlay.addEventListener('click', () => {
                closeBioBtn.click();
            });
        }
    }
}
