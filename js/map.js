import { db } from "./firebase-config.js";
import { collection, addDoc, getDocs } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let map;

window.initMap = async function () {
  navigator.geolocation.getCurrentPosition((position) => {
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    map = new google.maps.Map(document.getElementById("map"), {
      center: userLocation,
      zoom: 10,
    });

    new google.maps.Marker({
      position: userLocation,
      map: map,
      title: "Du bist hier",
    });

    loadParking();
  });
};

async function loadParking() {
  const querySnapshot = await getDocs(collection(db, "parking"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    new google.maps.Marker({
      position: { lat: data.lat, lng: data.lng },
      map: map,
      title: data.name,
    });
  });
}

document.getElementById("addParking")?.addEventListener("click", async () => {
  const center = map.getCenter();
  await addDoc(collection(db, "parking"), {
    name: "Neuer Parkplatz",
    lat: center.lat(),
    lng: center.lng(),
  });
  alert("Gespeichert!");
  loadParking();
});
