
function showAllHours() {
	document.getElementById("style-hours").innerHTML = ``;
	updateFilterStats();
}

function showOnlyAtHour(hour) {
	const hr = parseInt(hour);

	if (hr == -1) {
		showAllHours();
		return;
	}

	// what the fuck is this
	document.getElementById("style-hours").innerHTML = `
				.accident:not(.hr-${hr}) {
					display: none;
				}
			`;
	updateFilterStats();
}

function showAllVehicles() {
	document.getElementById("style-vehicles").innerHTML = ``;
	updateFilterStats();
}

const vehicles = new Set(["bike", "car", "pedestrian", "motorcycle", "hgv", "other"]);
function showVehicles() {

	let toHide = new Set(Array.from(vehicles));

	for (const v of vehicles) {
		console.log(`checking ${v}`);
		if (!document.getElementById(`involve-${v}`).checked) {
			toHide.delete(v);
			console.log(v, toHide);
		}

	}

	let nots = "";
	for (const v of toHide) {
		nots += `:not(.involves-${v})`;
	}

	console.log(toHide);

	document.getElementById("style-vehicles").innerHTML = `
				.accident${nots} {
					display: none;
				}
			`

	updateFilterStats();
}

for (const v of vehicles) {
	try {
		document.getElementById(`involve-${v}`).onchange = showVehicles;
		document.getElementById(`involve-${v}`).checked = true;
	} catch {
		console.log(`missing checkbox to set event listener? for ${v}`);
	}
}


const severities = new Set(["fatal", "serious", "minor"]);
function showSeverities() {

	let toHide = new Set(Array.from(severities));

	for (const s of severities) {
		console.log(`checking ${s}`);
		if (!document.getElementById(`severity-${s}`).checked) {
			toHide.delete(s);
			console.log(s, toHide);
		}

	}

	let nots = "";
	for (const s of toHide) {
		nots += `:not(.severity-${s})`;
	}

	console.log(toHide);

	document.getElementById("style-severity").innerHTML = `
				.accident${nots} {
					display: none;
				}
			`

	updateFilterStats();
}

for (const s of severities) {
	try {
		document.getElementById(`severity-${s}`).onchange = showSeverities;
		document.getElementById(`severity-${s}`).checked = true;
	} catch {
		console.log(`missing checkbox to set event listener? for ${s}`);
	}
}

// test time of day animation
// let time = 0;
// function timeLoop() {
// 	console.log(time);

// 	if(time >= 24) time = 0;

// 	showOnlyAtHour(time);

// 	time++;

// 	window.setTimeout(timeLoop, 500);
// }

// timeLoop();


const slider = document.getElementById("time-slider");
slider.style.width = "100%";
// slider.style.height = "100px";

noUiSlider.create(slider, {
	start: [-1],
	step: 1,
	connect: true,
	range: {
		'min': -1,
		'max': 23
	},

	//  tooltips: true,
	// 	format: wNumb({
	// 		decimals: 0
	// })

	direction: 'ltr',

	pips: {
		mode: 'steps',
		stepped: false,
		density: 12
	}

});


slider.noUiSlider.on('update', function (values, handle) {
	showOnlyAtHour(values[handle]);
});


slider.noUiSlider.on('load', function (values, handle) {
	showOnlyAtHour(values[handle]);
});

function toggleOptions() {
	if (document.getElementById("options").style.display == "none") {
		document.getElementById("options").style.display = "block";
	} else {
		document.getElementById("options").style.display = "none";
	}
}

function updateFilterStats() {
	const totalNearRoute = document.querySelectorAll(".near-route").length;
	let totalOnScreen = 0;
	for(const m of markers) {
		if(!isHidden(m._icon)) totalOnScreen++;
	}

	document.getElementById("filter-stats").innerHTML = `${totalOnScreen}/${totalNearRoute}`;
}

function isHidden(el) {
	var style = window.getComputedStyle(el);
	return (style.display === 'none')
}