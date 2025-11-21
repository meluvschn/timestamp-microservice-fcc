// server.js

const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Ruta base
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// ===============================
//       RUTA PRINCIPAL API
// ===============================

// Ruta con parámetro opcional
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  let date;

  // Caso sin parámetro -> fecha actual
  if (!dateString) {
    date = new Date();
  } else {
    // Si el parámetro es un número → timestamp
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      // Si es una fecha tipo string (YYYY-MM-DD)
      date = new Date(dateString);
    }
  }

  // Validación de fecha inválida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Devolver formato requerido
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Servidor
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor escuchando en puerto " + listener.address().port);
});
