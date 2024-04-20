async function highlightAroundRoute(e) {
	let route = e.route;

	
	const threshold = 0.05; // 50 metres
	
	// remove near-route from all markers
	for(const m of markers) {
		m._icon.classList.remove("near-route");
	}

	// // remove near-route from all bike lanes geojson
	// for(const layer of bikeLanes._layers) {
	// 	layer._path.classList.remove("near-route");
	// }
	
	let stats = {
		total: 0,
		
		fatal: 0,
		serious: 0,
		minor: 0,
		car: 0,
		pedestrian: 0,
		bike: 0,
		motorcycle: 0,
		hgv: 0,
		other: 0,
		
		dark: 0,
		twilight: 0,
		day: 0,

		dry: 0,
		wet: 0,
		snowy: 0
	}


	for(const coord of route.coordinates) {
		for (const m of markers) {
			if(m._icon.classList.contains("near-route")) continue; // we've already marked this one

			// if marker is within x metres of route, highlight it
			let marker = m.getLatLng();
			let distance = getDistanceFromLatLonInKm(marker.lat, marker.lng, coord.lat, coord.lng);

			if (distance <= threshold) {
				m._icon.classList.add("near-route");

				const span = m._icon.querySelector("span");

				// update the stats based on classes on the span
				stats.total++;
				if(m._icon.classList.contains("severity-fatal")) stats.fatal++;
				if(m._icon.classList.contains("severity-serious")) stats.serious++;
				if(m._icon.classList.contains("severity-minor")) stats.minor++;
				if(m._icon.classList.contains("involves-car")) stats.car++;
				if(m._icon.classList.contains("involves-pedestrian")) stats.pedestrian++;
				if(m._icon.classList.contains("involves-bike")) stats.bike++;
				if(m._icon.classList.contains("involves-motorcycle")) stats.motorcycle++;
				if(m._icon.classList.contains("involves-hgv")) stats.hgv++;
				if(m._icon.classList.contains("involves-other")) stats.other++;
				if(m._icon.classList.contains("dark")) stats.dark++;
				if(m._icon.classList.contains("twilight")) stats.twilight++;
				if(m._icon.classList.contains("day")) stats.day++;
				if(m._icon.classList.contains("dry")) stats.dry++;
				if(m._icon.classList.contains("wet")) stats.wet++;
				if(m._icon.classList.contains("snowy")) stats.snowy++;
			}
		}

		// do the same for bike lanes
		// for (const layer of bikeLanesG._layers) {
		// 	let distance = layer._latlng.distanceTo(coord);

		// 	if (distance <= threshold) {
		// 		layer._path.classList.add("near-route");
		// 	}
		// }
	}

	console.log(stats);

	document.getElementById("stats").innerHTML = `
		<h1>${stats.total} accidents near route</h1>
		<p>${stats.fatal} fatal, ${stats.serious} serious, ${stats.minor} minor &bull;
		${stats.car} involving a car, ${stats.pedestrian} pedestrian, ${stats.bike} bike, ${stats.motorcycle} motorcycle, ${stats.hgv} hgv, ${stats.other} other &bull;
		${stats.dark} in the dark, ${stats.twilight} at twilight, ${stats.day} during the day &bull;
		${stats.dry} dry, ${stats.wet} wet, ${stats.snowy} snowy &bull; have a nice trip!</p>
	`;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
	const R = 6371; // Radius of the Earth in kilometers
	const dLat = deg2rad(lat2 - lat1); // deg2rad below
	const dLon = deg2rad(lon2 - lon1);
	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}