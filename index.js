// index.js

var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  let input = req.params.date;
  let dateObject;

  if (!input) {
    dateObject = new Date(); // Fecha actual
  } 
  else if (/^\d+$/.test(input)) {
    dateObject = new Date(parseInt(input));
  } 

  else {
    dateObject = new Date(input);
  }

  if (dateObject.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: dateObject.getTime(),
    utc: dateObject.toUTCString()
  });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});