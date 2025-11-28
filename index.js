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
// --- SOLUCIÓN FINAL (DIVIDIDA EN 2 PARTES) ---

// PARTE 1: Cuando NO hay fecha (devuelve la hora actual)
app.get("/api", function (req, res) {
  let now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// PARTE 2: Cuando SÍ hay fecha (parametro :date)
app.get("/api/:date", function (req, res) {
  let dateString = req.params.date;
  let dateObject;

  // Caso A: Es un número (Unix Timestamp)
  if (/^\d+$/.test(dateString)) {
    dateObject = new Date(parseInt(dateString));
  } 
  // Caso B: Es una fecha texto normal
  else {
    dateObject = new Date(dateString);
  }

  // Verificación de error
  if (dateObject.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Respuesta exitosa
  res.json({
    unix: dateObject.getTime(),
    utc: dateObject.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});