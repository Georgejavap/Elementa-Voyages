function initMap() {
  document.getElementById("loading-spinner").style.display = "flex";

  const defaultLocation = { lat: 64.1265, lng: -21.8174 }; // Reykjavik

  const map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 12,
  });

  const autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("search-input")
  );

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;

    map.setCenter(place.geometry.location);
    map.setZoom(13);
    document.getElementById("loading-spinner").style.display = "none";

    // You’d continue loading places here...
  });

  // Initial delay to hide spinner
  setTimeout(() => {
    document.getElementById("loading-spinner").style.display = "none";
  }, 1000);
}
