const mapDiv = document.getElementById("map");

if (mapDiv) {
  const location = mapDiv.dataset.location; // e.g. "Poland"

  // 1️⃣ Create map (default view)
  const map = L.map("map").setView([20, 0], 2);

  // 2️⃣ Add tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  // 3️⃣ If location exists → use API
  if (location) {
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${location}`,
      {
        headers: {
          "User-Agent": "student-project"
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        if (!data.length) return;

        const lat = data[0].lat;
        const lng = data[0].lon;

        map.setView([lat, lng], 5); // 👈 perfect for country

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(location)
          .openPopup();
      });
  }
}