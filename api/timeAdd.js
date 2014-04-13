var Type = require("type-of-is");
/**
 * @module timeAdd
 */

/**
 * This is the module function that will be accessable from the main app.
 * @param {object} body - The body of the request.
 * @returns {String}
 */
module.exports = function(body) {
	var startTime = body.startTime,
		addMinutes = body.addMinutes,
		reg = /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/;
		
	if(Type(startTime) != "[Function: String]") {
		if (!(startTime.match(reg))) {
			return "Invalid Time Format";
		}
	}
	if(!Type.is(addMinutes, Number)) {
		return "Invalid Minutes Format";
	}

	var minutes = getTimeAsMinutes(startTime);
	minutes = parseInt(minutes) + parseInt(addMinutes);
	var timeArray = getTimeAsArray(minutes);
	var time = getTimeAsString(timeArray);
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
 * This function will convert a numeric minutes to an array of time.
 * @returns {String}
 */
function getTimeAsArray(minutes) {
	var timeArray = [];
	timeArray[0] = [];
	timeArray[1] = parseInt(minutes/60) > 11? "PM" : "AM";
	
	if (minutes > 1439 ) {
		var divideBy = parseInt(minutes/1440);
		minutes -= 1440 * divideBy;
		timeArray[1] = "AM";
	}

	timeArray[0][0] = parseInt(minutes/60);
	// take the remainder of the minutes and check if its less than 10, if so, add a padding 0
	timeArray[0][1] = parseInt(minutes%60) < 10? "0" + parseInt(minutes%60) : parseInt(minutes%60);
	
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

/**
 * This function will convert an array of time to a String time of [H]H:MM {AM|PM}.
 * @returns {String}
 */
function getTimeAsString(timeArray) {
	time = "" + timeArray[0][0] + ":" + timeArray[0][1] + " " + timeArray[1];
	return time;
}

if (process.env.environment == "test/unit") {
	module.exports = {
		getTimeAsMinutes: getTimeAsMinutes,
		getTimeAsArray: getTimeAsArray,
		getTimeAsString: getTimeAsString
	};
}