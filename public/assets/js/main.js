

// 1. Initialise fullPage.js
new fullpage('#fullpage', {
    autoScrolling: true,
    navigation: true, 
    navigationPosition: 'right',
    scrollingSpeed: 1000,
    controlArrows: true,
    keyboardScrolling: true,
    responsiveWidth: 0, 
});


// 2. Initialise AOS (Animate On Scroll)
AOS.init({
    duration: 1000, 
    once: false,    
    mirror: true   
});


// 3. Initialise Glide.js (Image Slider)
new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    autoplay: 3000,
    hoverpause: true,
    gap: 10
}).mount();


// 4. Initialise Leaflet.js (Interactive Map)
const map = L.map('map').setView([35.6595, 139.7005], 15);

// Add OpenStreetMap tiles (the visual style of the map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add a marker to point specifically to Shibuya Crossing
L.marker([35.6595, 139.7005])
    .addTo(map)
    .bindPopup('Shibuya Crossing - The heart of Tokyo.')
    .openPopup();