/**
 * Fonction d'initialisaton du code, listes des fonctions éxécutées dans le code
 */
function init() {

    let map = L.map('map').setView([43.58399990182485, 1.4025073405795074], 12); // Centre de la carte au démarrage

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
        if (element.ligne == "A") {
            var circle = L.circle([element.latitude, element.longitude], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 100
            }).addTo(map).bindPopup(`<b>Station : ${element.titre} </b><br>Métro ligne ${element.ligne}.`);
        } else {
            var circle = L.circle([element.latitude, element.longitude], {
                color: 'yellow',
                fillColor: '#fff800',
                fillOpacity: 0.5,
                radius: 100
            }).addTo(map).bindPopup(`<b>Station : ${element.titre} </b><br>Métro ligne ${element.ligne}.`);
        }
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

        openMap(map); 

        let marker = L.marker([userLatitude, userLongitude]).addTo(map).bindPopup("<b>Vous êtes ici !</b><br>Emplacement actuel").openPopup(); // Affichage d'un popup
        });
    });
};








