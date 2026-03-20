// 1. Initialise fullPage.js
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
        // [SECTION 2] Shibuya - GSAP
        if (destination.index === 2) {
            gsap.to(".highlight-item", {
                duration: 0.8, opacity: 1, y: -10, stagger: 0.2, ease: "back.out(1.7)"
            });
        }

        // [SECTION 3] Ginza - Typed.js
        if (destination.index === 3) {
            const typedElement = document.getElementById('typed-text');
            if (typedElement && typedElement.innerHTML === "") {
                new Typed('#typed-text', {
                    strings: [
                        'The perfect end to your Tokyo journey.',
                        'Enjoy the magnificent architecture.',
                        'Experience the luxury of Ginza at night.'
                    ],
                    typeSpeed: 50, backSpeed: 30, loop: false, showCursor: false
                });
            }
        }
    },

    onLeave: function(origin, destination, direction) {
        if (origin.index === 2) {
            gsap.set(".highlight-item", { opacity: 0, y: 10 });
        }
    }
});

// 2. Manual Mouse Wheel Detection
window.addEventListener('wheel', function(e) {
    if (fullpage_api) {
        const activeSection = fullpage_api.getActiveSection();
        
        if (activeSection.index === 3 && e.deltaY < 0) {
            fullpage_api.moveSectionUp();
        }
    }
}, { passive: true });

// 3. Initialise AOS
AOS.init({
    duration: 1000, 
    once: false,    
    mirror: true   
});

// 4. Initialise Glide.js
if (document.querySelector('.glide')) {
    new Glide('.glide', {
        type: 'carousel', startAt: 0, perView: 1, autoplay: 3000, gap: 10
    }).mount();
}

// 5. Initialise Leaflet.js
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