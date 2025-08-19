async function init() {
  await customElements.whenDefined('gmp-map');

  const map = document.querySelector('#map');
  const placePicker = document.querySelector('gmpx-place-picker');
  const infoWindow = new google.maps.InfoWindow();
  const placesList = document.querySelector('#places-list');

  // Example hotels
  

  // Populate sidebar cards and add markers
  hotels.forEach((hotel, index) => {
    // Create marker
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

    // Card click centers map on marker
    card.addEventListener("click", (e) => {
      e.preventDefault();
      map.innerMap.setCenter(hotel.position);
      map.innerMap.setZoom(16);
      google.maps.event.trigger(marker, 'click');
    });
  });

  // Place picker search
  placePicker.addEventListener('gmpx-placechange', () => {
    const place = placePicker.value;

    if (!place.location) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    if (place.viewport) {
      map.innerMap.fitBounds(place.viewport);
    } else {
      map.center = place.location;
      map.zoom = 14;
    }

    const searchMarker = new google.maps.Marker({
      position: place.location,
      map: map.innerMap,
      title: place.displayName
    });

    infoWindow.setContent(`<strong>${place.displayName}</strong><br>${place.formattedAddress || ""}`);
    infoWindow.open(map.innerMap, searchMarker);
  });
}

document.addEventListener('DOMContentLoaded', init);
