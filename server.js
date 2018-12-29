// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", function(req, res){
  var newDate = new Date();
  var UTC = newDate.toUTCString();
  var unix = newDate.getTime();

  res.json({"unix": unix, "utc": UTC});
});

app.get("/api/timestamp/:date_string", function(req, res){
  
  var newDate = new Date(req.params.date_string);
  var UTC = newDate.toUTCString();
  var unix = newDate.getTime();
  
  if (!unix){
    if (req.params.date_string.length == parseInt(req.params.date_string).toString().length) {
      newDate = new Date(parseInt(req.params.date_string));
      UTC = newDate.toUTCString();
      unix = newDate.getTime();
    }
  }
  
  res.json({unix: unix, utc: UTC});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});