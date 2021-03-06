# TimeAdder

This application was created to add/subtract minutes to a time and get the new time.  If you've got to be somewhere and know you should be there 45 minutes from now, you can put in the current time and 45 minutes and the application will return you the time you need to be at that place.

## Usage

This application has both an API and a Web Interface.  Both can be used and both return the same results.

### Getting Started

- Clone or Download the application.
- cd into the directory
- Run _npm install --production_
- Run _node app.js_

### API

The API is hosted at __*http://localhost:3000/api/*__

#### timeAdd

* query parameters or JSON body to POST request.
```
http://localhost:3000/api/timeAdd?startTime=11:47%20PM&addMinutes=100
```

```
curl -X POST -H "Content-Type: application/json" -d '{"startTime":"11:47 PM","addMinutes":100}' http://localhost:3000/api/timeAdd
```

### Web

The Web Interface is Available at __*http://localhost:3000/*__

### Running Tests

This module is setup to run tests with Mocha.

- Run _npm install_
- Run _npm test_

This will run both integration and unit tests.

### Generating Docs

This module will generate Documentation.

- Run _npm install_
- Run _npm run-script docs_

Docs will be available at __*http://localhost:3000/docs/*__
