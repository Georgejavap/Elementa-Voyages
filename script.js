function initMap() {
  // Show loading spinner while map is initializing
  document.getElementById("loading-spinner").style.display = "flex";

  // Default map location (Reykjavik)
  const defaultLocation = { lat: 64.1265, lng: -21.8174 };

  // Initialize Google Map
  const map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 12,
  });

  // Initialize autocomplete for search input
  const autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("search-input")
  );

  // When user selects a place from autocomplete
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return; // Exit if place has no geometry

    // Center map on selected place and zoom in
    map.setCenter(place.geometry.location);
    map.setZoom(13);

    // Hide loading spinner once place is loaded
    document.getElementById("loading-spinner").style.display = "none";

    // You can continue loading places/markers here...
  });

  // Fallback to hide spinner after 1 second
  setTimeout(() => {
    document.getElementById("loading-spinner").style.display = "none";
  }, 1000);
}
