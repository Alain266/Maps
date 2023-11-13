/**
 * Fonction d'initialisaton du code, listes des fonctions éxécutées dans le code
 */
function init() {

    let storedLatitude = localStorage.getItem("latitude"); // Recherche des coordonnes dans le localStorage
    let storedLongitude = localStorage.getItem("longitude"); // Recherche des coordonnes dans le localStorage
    let apFormLat = 43.584038759746704; // Latitude ApFormation
    let apFormLong = 1.4026039000992538; // Longitude ApFormation


    /**
     * Si les coordonnes existent dans le localStorage alors on les reprends
     */
    if (storedLatitude != null && storedLongitude != null) {
        initLatitude = storedLatitude;
        initLongitude = storedLongitude
    } else {
        initLatitude = apFormLat;
        initLongitude = apFormLong;
    


    let map = L.map('map').setView([initLatitude, initLongitude], 12); // Centre de la carte au démarrage

    let icon_sizes = [40, 40];

    let iconA = L.icon({
        iconUrl: 'broche-de-localisation(rouge).png',
        iconSize: icon_sizes,
        iconAnchor:[19,41],
    })

    let iconB = L.icon({
        iconUrl: 'broche-de-localisation(jaune).png',
        iconSize: icon_sizes,
        iconAnchor:[19,41],
    })

    const stations = [ // Coordonnées des stations
        {titre: 'Balma Gramont', latitude: 43.62973291200079, longitude: 1.4830699623765822,line: "A", icon: iconA},
        {titre: 'Capitole', latitude: 43.604204437324434, longitude: 1.44501792923168, line: "A", icon: iconA},
        {titre: 'Esquirol', latitude: 43.600302077765214, longitude: 1.4441961788911348, line: "A", icon: iconA},
        {titre: 'Arenes', latitude: 43.59342060900095, longitude: 1.4185816325359704, line: "A", icon: iconA},
        {titre: 'Basso Combo', latitude: 43.569995010779195, longitude: 1.392272007908091, line: "A", icon: iconA},
        {titre: 'Borderouge', latitude: 43.64095427971196, longitude: 1.4523128906995424, line: "B", icon: iconB},
        {titre: 'Jeanne darc', latitude: 43.60890809203911, longitude: 1.4454711651186156, line: "B", icon: iconB},
        {titre: 'Jean Jaures', latitude: 43.60584678224465, longitude: 1.4491879083513524, line: "B", icon: iconB},
        {titre: 'Saint-Michel', latitude: 43.58602517790226, longitude: 1.447168478089358,line: "B", icon: iconB},
        {titre: 'Saint-Agnes', latitude: 43.58030864976819, longitude: 1.4497669823199246, line: "B", icon: iconB},
        {titre: 'Ramonville', latitude: 43.55570723649926, longitude: 1.4759403576756809, line: "B", icon: iconB},
    ];

    openMap(map);
    createStationsMarkers(map, stations, iconA, iconB);
    createLines(map, stations);
    newLocation(map);
    instantMapLocation(map);
    instantLocation(map);
}};

init();

/**
 * Affichage de la carte et coordonées de l'utilisateur
 * @param {map}
 */
function openMap(map) { 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

}

/**
 * Pour chaque station si elle est sur la ligne A elle est rouge sinon elle est jaune
 * @param {map}
 * @param {stations}
 */
function createStationsMarkers(map, stations, iconA, iconB) {
    stations.forEach(element => {

        let marker = element.line == "A" 
            ? L.marker([element.latitude, element.longitude], {icon: iconA})
            : L.marker([element.latitude, element.longitude], {icon: iconB});


        marker.addTo(map).bindPopup(`<b>Station : ${element.titre} </b><br>Métro ligne ${element.line}.`);

        marker.addEventListener("click", () => {
            map.setView([marker.getLatLng().lat, marker.getLatLng().lng], 15);
        });

        marker.addEventListener("mouseover", () => {
            marker.setIcon(new L.Icon.Default);
        });

        marker.addEventListener("mouseout", () => {
            marker.setIcon(element.icon);
        });
    });
};

/**
 * Trace une ligne rouge entre les stations de la ligne A et une ligne jaune entre les stations de la ligne B
 */

function createLines(map, stations) {
    // Stations de la ligne A
    let lineAStations = stations.filter(station => station.line === 'A').map(station => [station.latitude, station.longitude]);

    // Stations de la ligne B
    let lineBStations = stations.filter(station => station.line === 'B').map(station => [station.latitude, station.longitude]);

    // Créer la ligne rouge pour la ligne A
    let lineAPolyline = L.polyline(lineAStations, { color: 'red' }).addTo(map);

    // Créer la ligne jaune pour la ligne B
    let lineBPolyline = L.polyline(lineBStations, { color: 'yellow' }).addTo(map);

}

/**
 * Ecoute quand l'utilisateur appuie sur le bouton geolocaliser
 * @param {map}
 */
function newLocation (map) {
    document.getElementById('localisation_form').addEventListener("submit", (event) => {
        event.preventDefault();

        let userNewLatitude = document.getElementById("latitude").value;
        let userNewLongitude = document.getElementById("longitude").value;

        map.setView([userNewLatitude,userNewLongitude], 12);
        openMap(map);
        instantMapLocation(map);
    })
};

/**
 * Affiche la localisation actuelle de la carte 
 * @param {map}
 */
function instantMapLocation(map) {
    document.getElementById("instantLocation").innerHTML = "Latitude : " + map.getCenter().lat + " / Longitude : " + map.getCenter().lng;

    localStorage.setItem("latitude", map.getCenter().lat); // Enregistrement des coordonnes dans le localStorage
    localStorage.setItem("longitude", map.getCenter().lng); // Enregistrement des coordonnes dans le localStorage

    var storedLatitude = localStorage.getItem("latitude");
    var storedLongitude = localStorage.getItem("longitude");

    if (storedLatitude != null && storedLongitude != null) {
        map.setView([storedLatitude, storedLongitude], 12);
        document.getElementById("instantLocation").innerHTML = "Latitude : " + storedLatitude + " <br> Longitude : " + storedLongitude;
    }; 

    console.log(localStorage);
    
};

/**
 * Affiche la localisation actuelle de l'utilisateur (geolocalisation)
 * @param {map}
 */
function instantLocation(map) {
    document.getElementById("geolocalisationIcon").addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition((position) => {

            let userLatitude = position.coords.latitude;
            let userLongitude = position.coords.longitude; 

            map.setView([userLatitude,userLongitude], 12);

            document.getElementById("instantLocation").innerHTML = "Latitude : " + userLatitude + " / Longitude : " + userLongitude;

            localStorage.setItem("latitude", map.getCenter().lat); // Enregistrement des coordonnes dans le localStorage
    localStorage.setItem("longitude", map.getCenter().lng); // Enregistrement des coordonnes dans le localStorage

        let marker = L.marker([userLatitude, userLongitude]).addTo(map).bindPopup("<b>Vous êtes ici !</b><br>Emplacement actuel").openPopup(); // Affichage d'un popup
        });
    });
};