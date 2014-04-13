process.env.environment = "test/integration";

var assert = require("better-assert"),
	timeAdd = require("../../api/timeAdd");

describe("timeAdd", function(){
	describe("timeAdd()", function(done){
		it("should return a string of 1:40 AM for a time of 1:30 AM and 10 Minutes", function(){
			var body = {
				"startTime": "1:30 AM",
				"addMinutes": 10
			};
			var time = timeAdd(body);
			assert(time == "1:40 AM");
		});
	});
	describe("timeAdd()", function(){
		it("should return a string of 1:40 AM for a time of 1:30 AM and 1450 Minutes", function(){
			var body = {
				"startTime": "1:30 AM",
				"addMinutes": 1450
			};
			var time = timeAdd(body);
			assert(time == "1:40 AM");
		});
	});
	describe("timeAdd()", function(){
		it("should not return a string of 1:40 AM for a time of 1:30 AM and 5 Minutes", function(){
			var body = {
				"startTime": "1:30 AM",
				"addMinutes": 5
			};
			var time = timeAdd(body);
			assert(time != "1:40 AM");
		});
	});
	describe("timeAdd()", function(){
		it("should not return a string of 1:40 AM for a time of 1:30 AM and 1445 Minutes", function(){
			var body = {
				"startTime": "1:30 AM",
				"addMinutes": 1445
			};
			var time = timeAdd(body);
			assert(time != "1:40 AM");
		});
	});
	describe("timeAdd()", function(){
		it("should return \"Invalid Time Format\" when an invalid startTime is sent.", function(){
			var body = {
				"startTime": "19:30 AM",
				"addMinutes": 1445
			};
			var time = timeAdd(body);
			assert(time == "Invalid Time Format");
		});
	});
	describe("timeAdd()", function(){
		it("should return \"Invalid Minutes Format\" when an invalid addMinutes is sent.", function(){
			var body = {
				"startTime": "1:30 AM",
				"addMinutes": "abcd"
			};
			var time = timeAdd(body);
			assert(time == "Invalid Minutes Format");
		});
	});
});