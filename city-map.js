// Map & markers
let map;
let markers = [];

// Destinations + hotels
const destinations = {
  santorini: {
    center: {lat:36.3932,lng:25.4615},
    hotels: [
      {name:'Luxury Hotel Santorini',position:{lat:36.396,lng:25.461},website:'#',img:'images/hotel1.jpg'},
      {name:'Beachside Resort',position:{lat:36.394,lng:25.460},website:'#',img:'images/hotel2.jpg'},
      {name:'Canaves Oia Suites',position:{lat:36.395,lng:25.463},website:'#',img:'images/hotel3.jpg'},
      {name:'Nobu Hotel Santorini',position:{lat:36.393,lng:25.464},website:'#',img:'images/hotel4.jpg'},
      {name:'Santorini View Hotel',position:{lat:36.392,lng:25.465},website:'#',img:'images/hotel5.jpg'}
    ]
  },
  maldives: {
    center: {lat:5.324,lng:73.512},
    hotels: [
      {name:'Soneva Jani',position:{lat:5.414,lng:73.508},website:'#',img:'images/maldives1.jpg'},
      {name:'Baros Maldives',position:{lat:4.322,lng:73.498},website:'#',img:'images/maldives2.jpg'},
      {name:'Constance Moofushi',position:{lat:3.993,lng:73.511},website:'#',img:'images/maldives3.jpg'},
      {name:'One&Only Reethi Rah',position:{lat:5.324,lng:73.512},website:'#',img:'images/maldives4.jpg'},
      {name:'COMO Maalifushi',position:{lat:5.101,lng:73.502},website:'#',img:'images/maldives5.jpg'}
    ]
  },
  shanghai: {
    center: {lat:31.228,lng:121.474},
    hotels: [
      {name:'The Peninsula Shanghai',position:{lat:31.226,lng:121.475},website:'#',img:'images/shanghai1.jpg'},
      {name:'Waldorf Astoria Shanghai',position:{lat:31.229,lng:121.473},website:'#',img:'images/shanghai2.jpg'},
      {name:'Four Seasons Shanghai',position:{lat:31.230,lng:121.472},website:'#',img:'images/shanghai3.jpg'},
      {name:'The PuLi Hotel',position:{lat:31.231,lng:121.474},website:'#',img:'images/shanghai4.jpg'},
      {name:'Mandarin Oriental',position:{lat:31.227,lng:121.476},website:'#',img:'images/shanghai5.jpg'}
    ]
  },
  paris: {
    center: {lat:48.871,lng:2.314},
    hotels: [
      {name:'Le Meurice',position:{lat:48.865,lng:2.328},website:'#',img:'images/paris1.jpg'},
      {name:'Ritz Paris',position:{lat:48.868,lng:2.328},website:'#',img:'images/paris2.jpg'},
      {name:'Four Seasons Hotel George V',position:{lat:48.869,lng:2.307},website:'#',img:'images/paris3.jpg'},
      {name:'Shangri-La Hotel Paris',position:{lat:48.865,lng:2.296},website:'#',img:'images/paris4.jpg'},
      {name:'Hôtel Plaza Athénée',position:{lat:48.866,lng:2.304},website:'#',img:'images/paris5.jpg'}
    ]
  },
  patagonia: {
    center: {lat:-50.330,lng:-72.900},
    hotels: [
      {name:'Explora Patagonia',position:{lat:-50.335,lng:-72.898},website:'#',img:'images/patagonia1.jpg'},
      {name:'Hotel Rio Serrano',position:{lat:-50.332,lng:-72.903},website:'#',img:'images/patagonia2.jpg'},
      {name:'Awasi Patagonia',position:{lat:-50.331,lng:-72.902},website:'#',img:'images/patagonia3.jpg'},
      {name:'The Singular Patagonia',position:{lat:-50.329,lng:-72.905},website:'#',img:'images/patagonia4.jpg'},
      {name:'Patagonia Eco Domes',position:{lat:-50.333,lng:-72.901},website:'#',img:'images/patagonia5.jpg'}
    ]
  }
};

// Detect destination from URL query string
const urlParams = new URLSearchParams(window.location.search);
let currentDestination = urlParams.get('dest')?.toLowerCase() || 'santorini';

function initMap() {
  const destination = destinations[currentDestination];
  const mapElement = document.querySelector('gmp-map');
  map = mapElement.innerMap;

  map.setCenter(destination.center);

  markers.forEach(m => m.setMap(null));
  markers = [];

  const placesList = document.getElementById('places-list');
  placesList.innerHTML = '';

  destination.hotels.forEach(hotel => {
  // Create marker
  const marker = new google.maps.Marker({
    position: hotel.position,
    map,
    title: hotel.name
  });
  marker.addListener('click', () => window.open(hotel.website,'_blank'));
  markers.push(marker);

  // Create hotel card
  const card = document.createElement('a');
  card.href = hotel.website;
  card.target = '_blank';
  card.className = 'place-card';
  card.innerHTML = `<img src="${hotel.img}" alt="${hotel.name}"><h3>${hotel.name}</h3>`;
  placesList.appendChild(card);
});
}


window.initMap = initMap;
