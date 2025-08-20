async function init() {
  // Wait until the gmp-map custom element is defined
  await customElements.whenDefined('gmp-map');

  const map = document.querySelector('#map');                  // The gmp-map element
  const placePicker = document.querySelector('gmpx-place-picker'); // Place picker input
  const infoWindow = new google.maps.InfoWindow();             // Info window for markers
  const placesList = document.querySelector('#places-list');   // Sidebar container

  // Example hotels (assume hotels array exists)

  // Populate sidebar cards and add markers
  hotels.forEach((hotel, index) => {
    // Create marker for each hotel
    const marker = new google.maps.Marker({
      position: hotel.position,
      map: map.innerMap,
      title: hotel.name,
      icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    });

    // Marker click shows info window and scrolls sidebar
    marker.addListener("click", () => {
      infoWindow.setContent(`<strong>${hotel.name}</strong>`);
      infoWindow.open(map.innerMap, marker);

      // Scroll sidebar to this card
      document.getElementById(`hotel-${index}`).scrollIntoView({ behavior: "smooth", block: "center" });
    });

    // Add card to sidebar
    const card = document.createElement("a");
    card.href = hotel.link;
    card.target = "_blank";
    card.className = "place-card";
    card.id = `hotel-${index}`;
    card.innerHTML = `<img src="${hotel.img}" alt="${hotel.name}"><h3>${hotel.name}</h3>`;
    placesList.appendChild(card);

    // Card click centers map on marker and triggers click
    card.addEventListener("click", (e) => {
      e.preventDefault();
      map.innerMap.setCenter(hotel.position);
      map.innerMap.setZoom(16);
      google.maps.event.trigger(marker, 'click');
    });
  });

  // Place picker search functionality
  placePicker.addEventListener('gmpx-placechange', () => {
    const place = placePicker.value;

    if (!place.location) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // Fit map bounds or center on selected place
    if (place.viewport) {
      map.innerMap.fitBounds(place.viewport);
    } else {
      map.center = place.location;
      map.zoom = 14;
    }

    // Add marker for searched place
    const searchMarker = new google.maps.Marker({
      position: place.location,
      map: map.innerMap,
      title: place.displayName
    });

    // Show info window for searched place
    infoWindow.setContent(`<strong>${place.displayName}</strong><br>${place.formattedAddress || ""}`);
    infoWindow.open(map.innerMap, searchMarker);
  });
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
