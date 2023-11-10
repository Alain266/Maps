/**
 * Fonction d'initialisaton du code, listes des fonctions éxécutées dans le code
 */
function init() {

    let storedLatitude = localStorage.getItem("latitude"); // Recherche des coordonnes dans le localStorage
    let storedLongitude = localStorage.getItem("longitude"); // Recherche des coordonnes dans le localStorage
    let apformLat = 43.584038759746704; // Latitude ApFormation
    let apformLong = 1.4026039000992538; // Longitude ApFormation


    /**
     * Si les coordonnes existent dans le localStorage alors on les reprends
     */
    if (storedLatitude != null && storedLongitude != null) {
        initLatitude = storedLatitude;
        initLongitude = storedLongitude
    } else {
        initLatitude = apFormLat;
        initLongitude = apFormLong;
    }


    let map = L.map('map').setView([initLatitude, initLongitude], 12); // Centre de la carte au démarrage

    const stations = [ // Coordonnées des stations
        {titre: 'Capitole', latitude: 43.604204437324434, longitude: 1.44501792923168, ligne: "A"},
        {titre: 'Balma Gramont', latitude: 43.62973291200079, longitude: 1.4830699623765822,ligne: "A"},
        {titre: 'Basso Combo', latitude: 43.569995010779195, longitude: 1.392272007908091, ligne: "A"},
        {titre: 'Esquirol', latitude: 43.600302077765214, longitude: 1.4441961788911348, ligne: "A"},
        {titre: 'Arenes', latitude: 43.59342060900095, longitude: 1.4185816325359704, ligne: "A"},
        {titre: 'Jean Jaures', latitude: 43.60584678224465, longitude: 1.4491879083513524, ligne: "B"},
        {titre: 'Borderouge', latitude: 43.64095427971196, longitude: 1.4523128906995424, ligne: "B"},
        {titre: 'Ramonville', latitude: 43.55570723649926, longitude: 1.4759403576756809, ligne: "B"},
        {titre: 'Saint-Agnes', latitude: 43.58030864976819, longitude: 1.4497669823199246, ligne: "B"},
        {titre: 'Saint-Michel', latitude: 43.58602517790226, longitude: 1.447168478089358,ligne: "B"},
    ];

    openMap(map);
    stationsCircles(map, stations);
    newLocation(map);
    instantMapLocation(map);
    instantLocation(map);
    centerMapOnClick(map);
};

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
function stationsCircles(map, stations) { stations.forEach(element => {

    
    let icon_sizes = [40, 40]

    let iconA = L.icon({
        iconUrl: 'broche-de-localisation(rouge).png',
        iconSize: icon_sizes
    })

    let iconB = L.icon({
        iconUrl: 'broche-de-localisation(jaune).png',
        iconSize: icon_sizes
    })

    if (element.ligne == "A") {
        var marker = L.marker([element.latitude, element.longitude], {icon: iconA}).addTo(map).bindPopup(`<b>Station : ${element.titre} </b><br>Métro ligne ${element.ligne}.`);
    } else {
        var marker = L.marker([element.latitude, element.longitude], {icon: iconB}).addTo(map).bindPopup(`<b>Station : ${element.titre} </b><br>Métro ligne ${element.ligne}.`);
    };
    
        openMap(map);

            // marker.addEventListener("click", () => {
            // map.setView([marker.getLatLng().lat, marker.getLatLng().lng], 12);
    });
};

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

        openMap(map); 

        let marker = L.marker([userLatitude, userLongitude]).addTo(map).bindPopup("<b>Vous êtes ici !</b><br>Emplacement actuel").openPopup(); // Affichage d'un popup
        });
    });
};


/**
 * Ecoute quand l'utilisateur appuie sur un marker de la carte puis centre la carte sur ce point
 * @param {map}
 */

function centerMapOnClick(map) {
    circle.addEventListener("click", () => {
        map.setView([circle.getLatLng().lat, circle.getLatLng().lng], 12);
        openMap(map);
    })
}






