const selectedLocations = [
    {title: 'אולם ספורט מרום נווה', order: 1, videoUrl: 'assets/videos/1.mp4', latlng: { lat: 32.073191, lng: 34.832483 }},
    {title: 'רולדין', order: 2, latlng: { lat: 32.07176, lng: 34.82921 }},
    {title: 'פארק מרום נווה', order: 3, latlng: { lat: 32.07169, lng: 34.83081 }},
    {title: 'מרכז נהורה', order: 4, latlng: { lat: 32.07204, lng: 34.82907 }},
    {title: 'קניון עופר', order: 5, latlng: { lat: 32.07159, lng: 34.82826 }},
    {title: 'מן בורגר', order: 6, latlng: { lat: 32.07215, lng: 34.82893 }},
    {title: 'גינת כלבים', order: 7, latlng: { lat: 32.07096, lng: 34.82924 }},
];

let map;

const initMap = () => {
    map = new google.maps.Map(document.getElementById("map-container"), {
        zoom: 15,
        center: selectedLocations[0].latlng,
    });
};

const setMarkers = () => {
    selectedLocations.forEach((location) => {
        var marker = new google.maps.Marker({
            position: location.latlng,
            map,
            title: location.title,
        });

        if (location.videoUrl) {
            marker.addListener('click', () => {
                $('.modal-title').text(location.title);
                $('#modal').modal('show');
                $('.modal-body').html(`
                    <video class='video' controls autoplay>
                        <source src='${location.videoUrl}' type="video/mp4">
                    </video>
                `);
            });
        }
    });
}

const setRoute = () => {
    const directionsService = new google.maps.DirectionsService();

    selectedLocations.forEach((location, index) => {
        if (index >= selectedLocations.length - 1) {
            return;
        }

        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        directionsRenderer.setOptions({suppressMarkers: true});

        directionsService.route({
            origin: location.latlng,
            destination: selectedLocations[index + 1].latlng,
            travelMode: google.maps.TravelMode.WALKING,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + e.status));
    });
};

$(document).ready(() => {
    selectedLocations.sort(({order: firstOrder}, {order: secondOrder}) => firstOrder - secondOrder);

    initMap();
    setMarkers();
    setRoute();
});