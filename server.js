const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

// Página base
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// ===============================
//   RUTAS PARA /api y /api/
// ===============================
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

app.get("/api/", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// ===============================
//       RUTA PARA PARAMETROS
// ===============================
app.get("/api/:date_string", (req, res) => {
  const dateString = req.params.date_string;

  let date;

  // Si es número → timestamp
  if (!isNaN(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  // Fecha inválida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Fecha válida
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Servidor
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor escuchando en el puerto " + listener.address().port);
});
// … tu código express y cors arriba

app.get("/api", (req, res) => {
  console.log("LLEGÓ /api con req.path:", req.path, "req.params:", req.params);
  const now = new Date();
  res.json({ unix: now.getTime(), utc: now.toUTCString() });
});

app.get("/api/", (req, res) => {
  console.log("LLEGÓ /api/ con req.path:", req.path, "req.params:", req.params);
  const now = new Date();
  res.json({ unix: now.getTime(), utc: now.toUTCString() });
});

app.get("/api/:date_string", (req, res) => {
  console.log("LLEGÓ /api/:date_string con date_string =", req.params.date_string);
  const ds = req.params.date_string;
  let date;
  if (!isNaN(ds)) {
    date = new Date(parseInt(ds));
  } else {
    date = new Date(ds);
  }
  console.log("Parsed date:", date);

  if (date.toString() === "Invalid Date") {
    console.log("Invalid date detectada");
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});
