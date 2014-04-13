process.env.environment = "test/unit";

var assert = require("better-assert"),
	timeAdd = require("../../api/timeAdd");

describe("timeAdd", function(){
	describe("getTimeAsMinutes()", function(){
		it("should return 90 minutes for a time of 1:30 AM", function(){
			var minutes = timeAdd.getTimeAsMinutes("1:30 AM");
			assert(minutes == 90);
		});
	});
	describe("getTimeAsArray()", function(){
		it("should return an array of time equal to 1:30 AM for a number of 90 minutes", function(){
			var timeArray = timeAdd.getTimeAsArray(90);
			assert(timeArray instanceof Array);
			assert(timeArray[0]);
			assert(timeArray[0][0]);
			assert(timeArray[0][0] == 1);
			assert(timeArray[0][1]);
			assert(timeArray[0][1] == 30);
			assert(timeArray[1]);
			assert(timeArray[1] == "AM");
		});
	});
	describe("getTimeAsString()", function(){
		it("should return a string of time equal to 1:30 AM for an array of [ [ 1, 30 ], \"AM\" ] minutes", function(){
			var time = timeAdd.getTimeAsString([[1,30],"AM"]);
			assert("string" == typeof time);
			assert(time == "1:30 AM");
		});
	});
});