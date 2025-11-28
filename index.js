var express = require('express');
var app = express();

// Habilitar CORS para que FreeCodeCamp pueda testear
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

// Archivos estáticos
app.use(express.static('public'));

// RUTA 1: La portada (para que no salga "Cannot GET /")
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// --- AQUÍ ESTÁ EL TRUCO PARA LOS TESTS 7 Y 8 ---

// RUTA 2: EXCLUSIVA para cuando NO hay fecha (/api)
// Esta ruta DEBE ir antes de la otra
app.get("/api", function (req, res) {
  let now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// RUTA 3: Para cuando SÍ hay fecha (/api/:date)
app.get("/api/:date", function (req, res) {
  let dateString = req.params.date;
  let dateObject;

  // 1. Si son solo números (Timestamp)
  if (/^\d+$/.test(dateString)) {
    dateObject = new Date(parseInt(dateString));
  } 
  // 2. Si es fecha texto
  else {
    dateObject = new Date(dateString);
  }

  // 3. Error
  if (dateObject.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // 4. Respuesta
  res.json({
    unix: dateObject.getTime(),
    utc: dateObject.toUTCString()
  });
});

// --- FIN ---

// Escuchar puerto
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});