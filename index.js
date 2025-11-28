// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;
  let dateObject;

  // 1. Si el parámetro está vacío, usa la fecha actual
  if (!dateInput) {
    dateObject = new Date();
  } 
  // 2. Si es un número (Timestamp Unix), conviértelo a entero primero
  else if (!isNaN(dateInput)) {
    dateObject = new Date(parseInt(dateInput));
  } 
  // 3. Si es una fecha normal (String), deja que Date lo procese
  else {
    dateObject = new Date(dateInput);
  }

  // 4. Si la fecha es inválida, devuelve el error
  if (dateObject.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // 5. Devuelve el JSON correcto
  res.json({
    unix: dateObject.getTime(),
    utc: dateObject.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
