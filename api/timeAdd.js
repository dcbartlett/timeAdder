/**
 * Represents a book.
 * @module
 * @param {object} body - The body of the request.
 */
module.exports = function(body) {
	var startTime = body.startTime,
		addMinutes = body.addMinutes;
	
	var minutes = getTimeAsMinutes(startTime);
	minutes = parseInt(minutes) + parseInt(addMinutes);
	var timeArray = getTimeAsString(minutes);

	time = "" + timeArray[0][0] + ":" + timeArray[0][1] + " " + timeArray[1];
	return time;
};

/**
 * This function will convert a String time of [H]H:MM {AM|PM} to numeric minutes.
 * @returns {Number}
 */
function getTimeAsMinutes(timeString) {
	var timeArray = timeString.split(" ");
	timeArray[0] = timeArray[0].split(":");

	if (timeArray[1] && timeArray[1] != "AM" && timeArray[1] != "PM") {
		return {error: {msg: "Invalid Period of Time: Suggestions AM/PM"}};
	}

	if (timeArray[1] == "PM") {
		if (timeArray[0][0] != 12) {
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


/**
 * This function will convert a numeric minutes to a String time of [H]H:MM {AM|PM}.
 * @returns {String}
 */
function getTimeAsString(minutes) {
	var timeArray = [];
	timeArray[0] = [];
	timeArray[0][0] = parseInt(minutes/60);
	timeArray[0][1] = parseInt(minutes%60) < 10? "0" + parseInt(minutes%60) : parseInt(minutes%60);
	timeArray[1] = parseInt(minutes/60) > 11? "PM" : "AM";
	
	if (minutes > 1439 ) {
		minutes -= 1440;
		timeArray[1] = "AM";
	}

	if (timeArray[0][0] > 12) {
		timeArray[0][0] = timeArray[0][0] - 12;
	}
	if (timeArray[1] == "AM") {
		if (timeArray[0][0] === 0) {
			timeArray[0][0] = 12;
		}
	}
	
	return timeArray;
}