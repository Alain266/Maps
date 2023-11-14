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
    };


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

        // Stations de la ligne A
        {titre: 'Balma Gramont', latitude: 43.62973291200079, longitude: 1.4830699623765822,line: "A", icon: iconA},
        {titre: 'Argoulet', latitude: 43.624781188842334, longitude: 1.477322031676342, line: "A", icon: iconA},
        {titre: 'Roseraie', latitude: 43.62012121600574, longitude: 1.470240999830584, line: "A", icon: iconA},
        {titre: 'Jolimont', latitude: 43.61502589905508, longitude: 1.461915423160242, line: "A", icon: iconA},
        {titre: 'Marengo-SNCF', latitude: 43.61117305563954, longitude: 1.4558643594769847, line: "A", icon: iconA},
        {titre: 'Capitole', latitude: 43.604204437324434, longitude: 1.44501792923168, line: "A", icon: iconA},
        {titre: 'Esquirol', latitude: 43.600302077765214, longitude: 1.4441961788911348, line: "A", icon: iconA},
        {titre: 'Saint Cyprien-République', latitude: 43.598307742398035, longitude: 1.432690073626314, line: "A", icon: iconA},
        {titre: 'Patte d Oie', latitude: 43.59652067577794, longitude: 1.4238709705249035, line: "A", icon: iconA},
        {titre: 'Arenes', latitude: 43.59342060900095, longitude: 1.4185816325359704, line: "A", icon: iconA},
        {titre: 'Fontaine Lestang', latitude: 43.5876544863751, longitude: 1.419171740494422, line: "A", icon: iconA},
        {titre: 'Mermoz', latitude: 43.583675543869695, longitude: 1.4154381055433563, line: "A", icon: iconA},
        {titre: 'Bagatelle', latitude: 43.58006940006457, longitude: 1.412755896529242, line: "A", icon: iconA},
        {titre: 'Mirail-Université', latitude: 43.575001781236864, longitude: 1.4024562139126764, line: "A", icon: iconA},
        {titre: 'Reynerie', latitude: 43.57100645594316, longitude: 1.4021343488287106, line: "A", icon: iconA},
        {titre: 'Bellefontaine', latitude: 43.56637341232067, longitude: 1.398572375257711, line: "A", icon: iconA},
        {titre: 'Basso Combo', latitude: 43.569995010779195, longitude: 1.392272007908091, line: "A", icon: iconA},

        // Stations de la ligne B
        {titre: 'Borderouge', latitude: 43.64095427971196, longitude: 1.4523128906995424, line: "B", icon: iconB},
        {titre: 'Trois Cocus', latitude: 43.63841477743367, longitude: 1.4439293033586849, line: "B", icon: iconB},
        {titre: 'La Vache', latitude: 43.633607820672665, longitude: 1.434922813982374, line: "B", icon: iconB},
        {titre: 'Barrière de Paris', latitude: 43.62677407382106, longitude: 1.4337748284722862, line: "B", icon: iconB},
        {titre: 'Minimes - Claude Nougaro', latitude: 43.620692938993805, longitude: 1.4363068337686236, line: "B", icon: iconB},
        {titre: 'Canal du Midi', latitude: 43.615457855192595, longitude: 1.4339464898439607, line: "B", icon: iconB},
        {titre: 'Compans-Caffarelli', latitude: 43.610869376262634, longitude: 1.4360674364729886, line: "B", icon: iconB},
        {titre: 'Jeanne darc', latitude: 43.60890809203911, longitude: 1.4454711651186156, line: "B", icon: iconB},
        {titre: 'Jean Jaures', latitude: 43.60584678224465, longitude: 1.4491879083513524, line: "B", icon: iconB},
        {titre: 'François Verdier', latitude: 43.60084442451091, longitude: 1.4537993173215296, line: "B", icon: iconB},
        {titre: 'Carmes', latitude: 43.59821830584844, longitude: 1.4459887250930565, line: "B", icon: iconB},
        {titre: 'Palais de Justice', latitude: 43.592406251298584, longitude: 1.4466753706430895, line: "B", icon: iconB},
        {titre: 'Saint-Michel Marcel Langer', latitude: 43.58602517790226, longitude: 1.447168478089358,line: "B", icon: iconB},
        {titre: 'Empalot', latitude: 43.58006542950578, longitude: 1.4414826139818124, line: "B", icon: iconB},
        {titre: 'Saint-Agne', latitude: 43.58030864976819, longitude: 1.4497669823199246, line: "B", icon: iconB},
        {titre: 'Saouzelong', latitude: 43.579878898986365, longitude: 1.4604511959873618, line: "B", icon: iconB},
        {titre: 'Rangueil', latitude: 43.57499781039862, longitude: 1.4623823864633074, line: "B", icon: iconB},
        {titre: 'Faculté de Pharmacie', latitude: 43.568375064050244, longitude: 1.4644852383014293, line: "B", icon: iconB},
        {titre: 'Université-Paul-Sabatier', latitude: 43.561409512234725, longitude: 1.4625969631823894, line: "B", icon: iconB},
        {titre: 'Ramonville', latitude: 43.55570723649926, longitude: 1.4759403576756809, line: "B", icon: iconB},
    ];

    openMap(map);
    createStationsMarkers(map, stations, iconA, iconB);
    createLines(map, stations);
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
function createStationsMarkers(map, stations, iconA, iconB) {
    stations.forEach(element => {

        let marker = element.line == "A" 
            ? L.marker([element.latitude, element.longitude], {icon: iconA})
            : L.marker([element.latitude, element.longitude], {icon: iconB});


        marker.addTo(map).bindPopup(`<b>Station : ${element.titre} </b><br>Métro ligne ${element.line}.`);
        
        marker.addEventListener("click", () => {
            map.setView([marker.getLatLng().lat, marker.getLatLng().lng], 14);
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