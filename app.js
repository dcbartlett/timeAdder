var connect = require("connect"),
	http = require("http"),
	fs = require("fs"),
	extend = require("extend"),
	api = [];

//Configuration
var port = process.env.PORT || 3000;
//EndConfiguration

console.log("Loading API");
var apiFolder = fs.readdirSync("./api");
var re = /(?:\.([^.]+))?$/;
for (var file in apiFolder) {
	api[apiFolder[file].replace(re,"")] = require("./api/" + apiFolder[file]);
}

var app = connect()
	.use(connect.favicon())
	.use(connect.logger("dev"))
	.use(connect.static("public"))
	.use(connect.directory("public"))
	.use(connect.query())
	.use(connect.bodyParser())
	.use(function(req, res){
		req.body = extend(true,req.query,req.body);
		path = req._parsedUrl.pathname.split("/");
		path.shift();
		if (path[0] == "api") {
			if (api[path[1]]) {
				res.end(api[path[1]](req.body));
			}
		}
	});


console.log("Server launched on port "+port);
console.log("Visit http://localhost:"+port);
http.createServer(app).listen(port);