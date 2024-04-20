// let bikeLanesG;

async function loadData() {
	// const bikeLanes = await fetch("../data/bike_lanes_Berlin.geojson");
	// const bikeLanesData = await bikeLanes.json();
	// bikeLanesG = L.geoJSON(bikeLanesData, { className: "bike-lane" });
	// bikeLanesG.addTo(map);

	const data = await fetch("../data/accidents_Berlin_2021.csv");
	const text = await data.text();

	const header = ['ObjectID', 'State', 'District', 'LOR_ab_2021', 'AccidentYear', 'AccidentMonth', 'AccidentHour', 'DayOfWeek', 'AccidentCategory', 'AccidentType', 'AccidentTypeDetail', 'LightingCondition', 'InvolvingBike', 'InvolvingCar', 'InvolvingPedestrian', 'InvolvingMotorcycle', 'InvolvingHGV', 'InvolvingOther', 'RoadCondition', 'GraphicCoord1', 'GraphicCoord2', 'LongitudeWGS84', 'LatitudeWGS84'];

	const rows = parseCSV(text);

	for (const row of rows) {
		let thisRow = {};

		for (const cell in row) {
			thisRow[header[cell]] = row[cell];
		}

		let involving = new Set();
		if (thisRow.InvolvingBike == "1") involving.add("bike");
		if (thisRow.InvolvingCar == "1") involving.add("car");
		if (thisRow.InvolvingPedestrian == "1") involving.add("pedestrian");
		if (thisRow.InvolvingMotorcycle == "1") involving.add("motorcycle");
		if (thisRow.InvolvingHGV == "1") involving.add("hgv");
		if (thisRow.InvolvingOther == "1") involving.add("other");

		const emoji = {
			"bike": "🚲",
			"car": "🚗",
			"pedestrian": "🚶🏻",
			"motorcycle": "🏍️",
			"hgv": "🚚",
			"other": "🛸"
		}

		let involvingString = "";
		for (const v of involving) {
			involvingString += `${emoji[v]} + `;
		}
		involvingString = involvingString.slice(0, -3);

		try {
			const marker = L.marker([thisRow.LatitudeWGS84, thisRow.LongitudeWGS84], { icon: getIcon(thisRow) }).bindPopup(`
				<h1>${involvingString}</h1>

				<p>${thisRow.AccidentHour}:00 &ndash; ${parseInt(thisRow.AccidentHour) + 1 >= 24 ? "0" : parseInt(thisRow.AccidentHour) + 1}:00, on a ${numberToDetails("DayOfWeek", thisRow.DayOfWeek)}</p>

				<hr>

				<p>
					A <b>${numberToDetails("AccidentCategory", thisRow.AccidentCategory).toLowerCase()}</b>, 
					<b>${numberToDetails("AccidentType", thisRow.AccidentType).toLowerCase()}</b>
				</p>

				<p>It was <b>${numberToDetails("AccidentTypeDetail", thisRow.AccidentTypeDetail).toLowerCase()}</b> that happened
				<b>${numberToDetails("LightingCondition", thisRow.LightingCondition)}</b> when the road was <b>${numberToDetails("RoadCondition", thisRow.RoadCondition)}</b>.</p>
			`);

			markers.push(marker);
		} catch {
			console.log("couldn't create marker", thisRow);
		}

		
		for(const m of markers) {
			try {
				m.addTo(map);
			} catch {
				console.log("couldn't add marker to map", m);
			}
		}
	}

	routeControl.setWaypoints([
		start, end
	]);
}


loadData();




// function getCurrentLocation() {
// 	navigator.geolocation.getCurrentPosition((position) => {
// 		map.setView([position.coords.latitude, position.coords.longitude], 12);

// 		// put a circle on the map based on the user's location and precision
// 		const circle = L.circle([position.coords.latitude, position.coords.longitude], {
// 			color: 'blue',
// 			fillColor: 'blue',
// 			fillOpacity: 0.5,
// 			radius: position.coords.accuracy
// 		}).addTo(map);

// 		// find accidents within 1km
// 		// this is really jank but it works
// 		let counts = { "1": 0, "2": 0, "3": 0 };
// 		const accidents = document.querySelectorAll(".accident");
// 		for (const accident of accidents) {
// 			const lat = parseFloat(accident.querySelector("span").dataset.lat);
// 			const lon = parseFloat(accident.querySelector("span").dataset.lon);
// 			const severity = accident.querySelector("span").dataset.severity;

// 			const R = 6371; // Radius of the Earth in kilometers

// 			const distance = 2 * R * Math.asin(Math.sqrt(Math.pow(Math.sin((lat - position.coords.latitude) * Math.PI / 180 / 2), 2) + Math.cos(lat * Math.PI / 180) * Math.cos(position.coords.latitude * Math.PI / 180) * Math.pow(Math.sin((lon - position.coords.longitude) * Math.PI / 180 / 2), 2)));

// 			if (distance < 1) {
// 				accident.style.backgroundColor = "blue";
// 				counts[severity]++;
// 			}
// 		}
// 	});
// }

// window.onload = getCurrentLocation;