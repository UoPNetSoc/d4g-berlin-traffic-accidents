let chartsCreated = false;
let severityChart, involvingChart, lightingChart, conditionsChart;

function createCharts() {
	let severityChartCtx = document.getElementById('chart-severity');
	severityChart = new Chart(severityChartCtx, {
		type: 'doughnut',
		data: {
			labels: ['Fatal', 'Serious', 'Minor'],
			datasets: [{
				label: 'Number of Accidents by Injury Severity',
				data: [0, 0, 0],
				backgroundColor: ["red", "orange", "green"],
				borderWidth: 1
			}]
		},
		options: {
			aspectRatio: 2
		}
	});

	severityChart.canvas.parentNode.style.height = '150px';
	severityChart.canvas.parentNode.style.width = '300px';


	let involvingChartCtx = document.getElementById('chart-involving');
	involvingChart = new Chart(involvingChartCtx, {
		type: 'bar',
		data: {
			labels: ['Bike', 'Car', 'Pedestrian', 'Motorcycle', 'HGV', 'Other'],
			datasets: [{
				label: 'Number of Accidents by Involvement',
				data: [0, 0, 0, 0, 0, 0],
				backgroundColor: ["red", "orange", "yellow", "green", "blue", "purple"],
				borderWidth: 1
			}]
		},
		options: {
			aspectRatio: 2
		}
	});
	involvingChart.canvas.parentNode.style.height = '150px';
	involvingChart.canvas.parentNode.style.width = '300px';

	let lightingChartCtx = document.getElementById('chart-lighting');
	lightingChart = new Chart(lightingChartCtx, {
		type: 'bar',
		data: {
			labels: ['Day', 'Twilight', 'Dark'],
			datasets: [{
				label: 'Number of Accidents by Lighting Conditions',
				data: [0, 0, 0],
				backgroundColor: ["yellow", "orange", "black"],
				borderWidth: 1
			}]
		},
		options: {
			aspectRatio: 2
		}
	});
	lightingChart.canvas.parentNode.style.height = '150px';
	lightingChart.canvas.parentNode.style.width = '300px';


	let conditionsChartCtx = document.getElementById('chart-weather');
	conditionsChart = new Chart(conditionsChartCtx, {
		type: 'bar',
		data: {
			labels: ['Dry', 'Wet', 'Snowy'],
			datasets: [{
				label: 'Number of Accidents by Weather Conditions',
				data: [0, 0, 0],
				backgroundColor: ["yellow", "blue", "white"],
				borderWidth: 1
			}]
		},
		options: {
			aspectRatio: 2
		}
	});
	conditionsChart.canvas.parentNode.style.height = '150px';
	conditionsChart.canvas.parentNode.style.width = '300px';
}

function generateCharts() {
	console.log("generating charts");

	if(!chartsCreated) {
		console.log("creating charts");
		createCharts();
		chartsCreated = true;
	}


	const fatalElements = document.querySelectorAll('.severity-fatal');
	let fatalCount = 0;
	const seriousElements = document.querySelectorAll('.severity-serious');
	let seriousCount = 0;
	const minorElements = document.querySelectorAll('.severity-minor');
	let minorCount = 0;

	fatalElements.forEach((e) => {
		if (!isHidden(e)) fatalCount++;
	});
	seriousElements.forEach((e) => {
		if (!isHidden(e)) seriousCount++;
	});
	minorElements.forEach((e) => {
		if (!isHidden(e)) minorCount++;
	});

	console.log(fatalCount, seriousCount, minorCount);


	// we've already created the chart, so just update the data
	severityChart.data.datasets[0].data = [fatalCount, seriousCount, minorCount];
	severityChart.update();


	const bikeElements = document.querySelectorAll('.involves-bike');
	let bikeCount = 0;
	const carElements = document.querySelectorAll('.involves-car');
	let carCount = 0;
	const pedestrianElements = document.querySelectorAll('.involves-pedestrian');
	let pedestrianCount = 0;
	const motorcycleElements = document.querySelectorAll('.involves-motorcycle');
	let motorcycleCount = 0;
	const hgvElements = document.querySelectorAll('.involves-hgv');
	let hgvCount = 0;
	const otherElements = document.querySelectorAll('.involves-other');
	let otherCount = 0;
	
	bikeElements.forEach((e) => {
		if (!isHidden(e)) bikeCount++;
	});
	carElements.forEach((e) => {
		if (!isHidden(e)) carCount++;
	});
	pedestrianElements.forEach((e) => {
		if (!isHidden(e)) pedestrianCount++;
	});
	motorcycleElements.forEach((e) => {
		if (!isHidden(e)) motorcycleCount++;
	});
	hgvElements.forEach((e) => {
		if (!isHidden(e)) hgvCount++;
	});
	otherElements.forEach((e) => {
		if (!isHidden(e)) otherCount++;
	});
	
	console.log(bikeCount, carCount, pedestrianCount, motorcycleCount, hgvCount, otherCount);

	involvingChart.data.datasets[0].data = [bikeCount, carCount, pedestrianCount, motorcycleCount, hgvCount, otherCount];
	involvingChart.update();


	const dayElements = document.querySelectorAll('.day');
	let dayCount = 0;
	const twilightElements = document.querySelectorAll('.twilight');
	let twilightCount = 0;
	const darkElements = document.querySelectorAll('.dark');
	let darkCount = 0;

	dayElements.forEach((e) => {
		if (!isHidden(e)) dayCount++;
	});
	twilightElements.forEach((e) => {
		if (!isHidden(e)) twilightCount++;
	});
	darkElements.forEach((e) => {
		if (!isHidden(e)) darkCount++;
	});
	
	console.log(dayCount, twilightCount, darkCount);

	lightingChart.data.datasets[0].data = [dayCount, twilightCount, darkCount];
	lightingChart.update();


	const dryElements = document.querySelectorAll('.dry');
	let dryCount = 0;
	const wetElements = document.querySelectorAll('.wet');
	let wetCount = 0;
	const snowyElements = document.querySelectorAll('.snowy');
	let snowyCount = 0;
	
	dryElements.forEach((e) => {
		if (!isHidden(e)) dryCount++;
	});
	wetElements.forEach((e) => {
		if (!isHidden(e)) wetCount++;
	});
	snowyElements.forEach((e) => {
		if (!isHidden(e)) snowyCount++;
	});

	console.log(dryCount, wetCount, snowyCount);

	conditionsChart.data.datasets[0].data = [dryCount, wetCount, snowyCount];
	conditionsChart.update();
}
