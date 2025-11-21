const express = require('express');
const app = express();

// Middleware para evitar problemas de CORS.
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); 

// 1. RUTA DE EJEMPLO DE INICIO
app.get("/", (req, res) => {
  res.send('<h1>Timestamp Microservice API</h1><p>Use /api/date_string or /api/timestamp</p>');
});

// **************************************************
// FUNCIÓN CENTRAL CON LA LÓGICA DEL MICROSERVICE
// **************************************************
const handleTimestamp = (req, res) => {
  const dateString = req.params.date; 
  let date;

  // 1. Caso: Sin parámetro (ej: /api) -> Usar la hora actual
  if (!dateString) {
    date = new Date();
  
  // 2. Caso: Si el parámetro es un número largo (Posible Unix timestamp en milisegundos)
  } else if (!isNaN(dateString) && dateString.length > 8) {
    date = new Date(Number(dateString));
  
  // 3. Caso: Si es una cadena de texto (Fecha normal)
  } else {
    date = new Date(dateString);
  }

  // ********* VALIDACIÓN Y RESPUESTA *********
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // 5. Caso: Fecha Válida
  res.json({
    unix: date.getTime(),      // Unix timestamp en milisegundos
    utc: date.toUTCString()    // Fecha en formato UTC
  });
};

// **************************************************
// ÚLTIMA CORRECCIÓN DE RUTAS (Una sola ruta opcional)
// **************************************************
app.get("/api/:date?", handleTimestamp);


// **************************************************
// INICIA EL SERVIDOR
// **************************************************
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Tu aplicación está escuchando en el puerto ' + listener.address().port);
});
