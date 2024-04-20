
function showAllHours() {
	document.getElementById("style-hours").innerHTML = ``;
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
}

function showAllVehicles() {
	document.getElementById("style-vehicles").innerHTML = ``;
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
}

for (const v of vehicles) {
	try {
		document.getElementById(`involve-${v}`).onchange = showVehicles;
		document.getElementById(`involve-${v}`).checked = true;
	} catch {
		console.log(`missing checkbox to set event listener? for ${v}`);
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