
// 1. Header Entrance Animation on Page Load
gsap.from("header", {
    duration: 1.2,
    y: -100, 
    opacity: 0,
    ease: "elastic.out(1, 0.5)",
    delay: 0.5 
});


// 2. Initialise fullPage.js
new fullpage('#fullpage', {
    autoScrolling: true,
    scrollBar: false,
    navigation: true, 
    navigationPosition: 'right',
    scrollingSpeed: 1000,
    keyboardScrolling: true,
    
    normalScrollElements: '#map',
    touchSensitivity: 15,
    bigSectionsDestination: 'top',

    afterLoad: function(origin, destination, direction) {
        
        // Shibuya & Shinjuku
        if (destination.index === 2) {
            gsap.to(".highlight-item", {
                duration: 0.8, 
                opacity: 1, 
                y: -10, 
                stagger: 0.2, 
                ease: "back.out(1.7)"
            });
        }

        // Ginza
        if (destination.index === 3) {

            gsap.to("#section3 .time-badge", {
                opacity: 0.4,
                duration: 0.1,
                repeat: 7,
                yoyo: true,
                ease: "power1.inOut",
                onComplete: () => { 
                    gsap.set("#section3 .time-badge", { opacity: 1 }); 
                }
            });

            const typedElement = document.getElementById('typed-text');
            if (typedElement && typedElement.innerHTML === "") {
                new Typed('#typed-text', {
                    strings: [
                        'The perfect end to your Tokyo journey.',
                        'Enjoy the magnificent architecture.',
                        'Experience the luxury of Ginza at night.'
                    ],
                    typeSpeed: 50,
                    backSpeed: 30,
                    backDelay: 2000, 
                    loop: true,      
                    showCursor: false
                });
            }
        }
    },

    // Function triggered when leaving a section
    onLeave: function(origin, destination, direction) {
        // Reset Shibuya GSAP items to hidden state
        if (origin.index === 2) {
            gsap.set(".highlight-item", { opacity: 0, y: 10 });
        }
    }
});

// 3. Manual Mouse Wheel Detection
window.addEventListener('wheel', function(e) {
    if (typeof fullpage_api !== 'undefined') {
        const activeSection = fullpage_api.getActiveSection();

        if (activeSection.index === 3 && e.deltaY < 0) {
            fullpage_api.moveSectionUp();
        }
    }
}, { passive: true });

// 4. Initialise AOS
AOS.init({
    duration: 1000, 
    once: false,    
    mirror: true   
});

// 5. Initialise Glide.js
if (document.querySelector('.glide')) {
    new Glide('.glide', {
        type: 'carousel', 
        startAt: 0, 
        perView: 1, 
        autoplay: 3000, 
        gap: 10
    }).mount();
}

// 6. Initialise Leaflet.js
const map = L.map('map', {
    scrollWheelZoom: false 
}).setView([35.6691, 139.7045], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([35.6691, 139.7045])
    .addTo(map)
    .bindPopup('<b>Harajuku & Omotesando</b><br>The fashion heart of Tokyo.')
    .openPopup();