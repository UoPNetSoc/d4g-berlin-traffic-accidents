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

// openstreatmap is temp
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let routeControl = L.Routing.control({
	routeWhileDragging: false,
	lineOptions: {
		styles: [{ color: 'blue', opacity: 1, weight: 5 }]
	}
}).on('routeselected', highlightAroundRoute).addTo(map);

// Define start and end points
const start = L.Routing.waypoint([52.5224, 13.4095], 'Start', {
	waypointIcon: greenIcon // Use green icon for start marker
});

const end = L.Routing.waypoint([52.5128, 13.3893], 'End', {
	waypointIcon: redIcon // Use red icon for end marker
});


function createButton(label, container) {
	var btn = L.DomUtil.create('button', '', container);
	btn.setAttribute('type', 'button');
	btn.innerHTML = label;
	return btn;
}


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

	if (row.AccidentCategory == "1") classList.push("fatal");
	if (row.AccidentCategory == "2") classList.push("serious");
	if (row.AccidentCategory == "3") classList.push("minor");

	if (row.LightingCondition == "2") classList.push("dark");
	if (row.LightingCondition == "1") classList.push("twilight");
	if (row.LightingCondition == "0") classList.push("day");

	if (row.RoadCondition == "0") classList.push("dry");
	if (row.RoadCondition == "1") classList.push("wet");
	if (row.RoadCondition == "2") classList.push("snowy");

	return L.divIcon({
		className: `accident ${classList.join(" ")}`,

		// cursed but it works
		html: `<span style="display: none;" data-lat="${row.LatitudeWGS84}" data-lon="${row.LongitudeWGS84}" data-severity="${row.AccidentCategory}"></span>`,

		iconSize: [iconSize, iconSize],
		iconAnchor: [iconSize / 2, iconSize / 2],
		popupAnchor: [0, 0],
	});
}