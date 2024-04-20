const header = ['ObjectID', 'State', 'District', 'LOR_ab_2021', 'AccidentYear', 'AccidentMonth', 'AccidentHour', 'DayOfWeek', 'AccidentCategory', 'AccidentType', 'AccidentTypeDetail', 'LightingCondition', 'InvolvingBike', 'InvolvingCar', 'InvolvingPedestrian', 'InvolvingMotorcycle', 'InvolvingHGV', 'InvolvingOther', 'RoadCondition', 'GraphicCoord1', 'GraphicCoord2', 'LongitudeWGS84', 'LatitudeWGS84'];

function numberToDetails(element, number) {
	number = parseInt(number);

	switch(element) {
		case "DayOfWeek":
			switch(number) {
				case 1:
					return "Sunday";
				case 2:
					return "Monday";
				case 3:
					return "Tuesday";
				case 4:
					return "Wednesday";
				case 5:
					return "Thursday";
				case 6:
					return "Friday";
				case 7:
					return "Saturday";
			}
			break;

		case "AccidentCategory":
			switch(number) {
				case 1:
					return "🪦 Fatal";
				case 2:
					return "🏥 Serious";
				case 3:
					return "🤕 Minor";
			}
			break;

		case "AccidentType":
			switch(number) {
				case 1:
					return "Collision with standing/stopping/stationary vehicle";
				case 2:
					return "Collision with vehicle ahead/waiting vehicle";
				case 3:
					return "Collision with vehicle travelling sideways in same direction";
				case 4:
					return "Collision with oncoming traffic";
				case 5:
					return "Collision with turning/crossing vehicle";
				case 6:
					return "Collision between vehicle and pedestrian";
				case 7:
					return "Collision with road obstacle";
				case 8:
					return "a vehicle left the road to the right";
				case 9:
					return "a vehicle left the road to the left";
				case 0:
					return "an Other accident";
			}
			break;

			case "AccidentTypeDetail":
				switch(number) {
					case 1:
						return "a Driving accident"
					case 2:
						return "a Turning accident"
					case 3:
						return "a Turning/crossing accident"
					case 4:
						return "an Overshooting accident"
					case 5:
						return "an Accident involving stationary traffic"
					case 6:
						return "an Accident in parallel traffic"
					case 7:
						return "an Other accident"
				}

		case "LightingCondition":
			switch(number) {
				case 0:
					return "🌞 during the day";
				case 1:
					return "🌇 at dusk";
				case 2:
					return "🌚 in the dark";
			}
			break;

		case "RoadCondition":
			switch(number) {
				case 0:
					return "🫠 dry";
				case 1:
					return "🌧️ wet";
				case 2:
					return "☃️ snowy";
			}
			break;
	}

	return `Unknown ${element} (${number})`;
}