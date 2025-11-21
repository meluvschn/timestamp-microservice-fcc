const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ optionsSuccessStatus: 200 }));

// Ruta base
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

//  RUTA PARA /api → fecha actual
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

//  RUTA PARA /api/:date
app.get("/api/:date", (req, res) => {
  const dateString = req.params.date;
  let date;

  // Si es número, interpretarlo como timestamp
  if (!isNaN(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  // Validar fecha
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Respuesta correcta
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Servidor
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor funcionando en el puerto " + listener.address().port);
});
