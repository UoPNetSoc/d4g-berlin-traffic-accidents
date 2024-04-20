// centre is berlin TV tower
const map = L.map('map').setView([52.520834, 13.409429829], 13);
let markers = [];

const greenIcon = L.icon({
	iconUrl: 'images/marker-icon-green.png',
	iconSize: [25, 41],
});

const redIcon = L.icon({
	iconUrl: 'images/marker-icon-red.png',
	iconSize: [25, 41]
});


const southWest = L.latLng(52.6709, 13.04128),
	northEast = L.latLng(52.3432, 13.7634),
	bounds = L.latLngBounds(southWest, northEast);

const accessToken = 'LLRKmYSkrp1Az5HNzMzgM4PuUzfxYw1sBSUBwOKHaihIKTU4UwJM4Fh3uMzVvIFU'; // for jawg.io
L.tileLayer(`https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${accessToken}`, {
	bounds: bounds,
	maxZoom: 16,
	minZoom: 12,
	attribution: '<a href="https://jawg.io?utm_medium=map&utm_source=attribution" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib" >&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>'
}).addTo(map);

// log zoom level on change
map.on('zoomend', function () {
	console.log(map.getZoom());
});

let routeControl = L.Routing.control({
	routeWhileDragging: false,
	lineOptions: {
		styles: [{ color: 'blue', opacity: 1, weight: 5 }]
	}
})
.on('routingstart', function(){
	routingStatus("start");
})
.on('routingerror', function(){
	routingStatus("error");
})
.on('routesfound', function(){
	routingStatus("found");
})
.on('routeselected', highlightAroundRoute)
.addTo(map);

// Define start and end points
const start = L.Routing.waypoint([52.5224, 13.4095], 'Start', {
	waypointIcon: greenIcon // Use green icon for start marker
});

const end = L.Routing.waypoint([52.5128, 13.3893], 'End', {
	waypointIcon: redIcon // Use red icon for end marker
});

showOnRoute();


function getIcon(row) {
	const iconSize = 10;
	let classList = [];

	classList.push(`hr-${parseInt(row.AccidentHour)}`);

	if (row.InvolvingBike == "1") classList.push("involves-bike");
	if (row.InvolvingCar == "1") classList.push("involves-car");
	if (row.InvolvingPedestrian == "1") classList.push("involves-pedestrian");
	if (row.InvolvingMotorcycle == "1") classList.push("involves-motorcycle");
	if (row.InvolvingHGV == "1") classList.push("involves-hgv");
	if (row.InvolvingOther == "1") classList.push("involves-other");


	// todo: these need to have prefixes
	// we also need to include the category and type (turning, stationary, etc)

	if (row.AccidentCategory == "1") classList.push("severity-fatal");
	if (row.AccidentCategory == "2") classList.push("severity-serious");
	if (row.AccidentCategory == "3") classList.push("severity-minor");

	if (row.LightingCondition == "2") classList.push("dark");
	if (row.LightingCondition == "1") classList.push("twilight");
	if (row.LightingCondition == "0") classList.push("day");

	if (row.RoadCondition == "0") classList.push("dry");
	if (row.RoadCondition == "1") classList.push("wet");
	if (row.RoadCondition == "2") classList.push("snowy");

	return L.divIcon({
		className: `accident ${classList.join(" ")}`,

		// cursed but it works
		html: `
		<span style="display: none;"#
		data-lat="${row.LatitudeWGS84}"
		data-lon="${row.LongitudeWGS84}"
		data-severity="${row.AccidentCategory}"	
		></span>`,

		iconSize: [iconSize, iconSize],
		iconAnchor: [iconSize / 2, iconSize / 2],
		popupAnchor: [0, 0]
	});
}

function routingStatus(status) {
	document.getElementById("status").innerHTML = `routing ${status}...`;

	if(status == "start" || status == "error") {
		document.getElementById("options").style.opacity = 0.5;
		document.getElementById("options").style["pointer-events"] = "none";
	} else {
		document.getElementById("options").style.opacity = 1;
		document.getElementById("options").style.removeProperty("pointer-events");
	}
}

function showAll() {
	// remove the routing engine
	map.removeControl(routeControl);

	// remove the CSS that only shows markers near the route
	document.getElementById("style-near-route").innerHTML = ``;

	document.getElementById("show-all-button").classList.add("active");
	document.getElementById("show-on-route-button").classList.remove("active");
	generateCharts();
}

function showOnRoute() {
	document.getElementById("style-near-route").innerHTML = `
		.accident:not(.near-route) {
		display: none;
		}

		.bike-lane:not(.near-route) {
		display: none;
		}
	`;

	routeControl.addTo(map);

	document.getElementById("show-all-button").classList.remove("active");
	document.getElementById("show-on-route-button").classList.add("active");
	generateCharts();
}