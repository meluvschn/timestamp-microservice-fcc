// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://express.js.com/en/starter/static-files.html
app.use(express.static('public'));

// http://express.js.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let dateObject;

  // 1. Si el parámetro está vacío (undefined), usa la fecha actual
  if (!dateString) {
    dateObject = new Date();
  } 
  // 2. Si la fecha tiene SOLO números, es un Timestamp Unix
  // Usamos una Expresión Regular para verificar que sean solo dígitos
  else if (/^\d+$/.test(dateString)) {
    dateObject = new Date(parseInt(dateString));
  } 
  // 3. Si es una fecha en formato texto (ej: 2015-12-25)
  else {
    dateObject = new Date(dateString);
  }

  // 4. Si la fecha es inválida, devolvemos el error
  if (dateObject.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // 5. Devolvemos el JSON con los formatos correctos
  res.json({
    unix: dateObject.getTime(),
    utc: dateObject.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});