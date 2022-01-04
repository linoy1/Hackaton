const initMap = () => {
    map = new google.maps.Map(document.getElementById("map-container"), {
        zoom: 13,
        center: { lat: 32.078526836006596, lng: 34.80609995107827},
    });
}

$(document).ready(() => {
    initMap();
});