module.exports = function (start, add) {

	// [H]H:MM {AM|PM}
	// 9:23 AM + 10 = 9:33 AM
	
	var minutes = getTimeInMinutes(start);
	var timeArray = setTimeInMinutes(minutes);

	time = "" + timeArray[0][0] + ":" + timeArray[0][1] + " " + timeArray[1];
	console.log(time);

	return time;
}

var minutes = getTimeInMinutes(process.argv[2]) + 10;
setTimeInMinutes(minutes, "12");


function getTimeInMinutes(timeString) {
	var timeArray = timeString.split(" ");
	timeArray[0] = timeArray[0].split(":");

	console.log(timeArray)
	if (timeArray[1] && timeArray[1] != "AM" && timeArray[1] != "PM") {
		return {error: {msg: "Invalid Period of Time: Suggestions AM/PM"}}
	}

	if (timeArray[1] == "PM") {
		if (!(timeArray[0][0] == 12)) {
			timeArray[0][0] = parseInt(timeArray[0][0]) + 12;
		}
	} else {
		if (timeArray[0][0] == 12) {
			timeArray[0][0] = 0;
		}
	}
	
	minutes = parseInt(timeArray[0][0] * 60) + parseInt(timeArray[0][1]);
	return minutes;
}
function setTimeInMinutes(minutes) {
	var timeArray = [];
	timeArray[0] = [];
	timeArray[0][0] = parseInt(minutes/60);
	timeArray[0][1] = parseInt(minutes%60);
	timeArray[1] = parseInt(minutes/60) > 11? "PM" : "AM";
	
	if (timeArray[0][0] > 12) {
		timeArray[0][0] = timeArray[0][0] - 12;
	}
	if (timeArray[1] == "AM") {
		if (timeArray[0][0] == 0) {
			timeArray[0][0] = 12;
		}
	}
	
	console.log(timeArray)
	return timeArray;
}