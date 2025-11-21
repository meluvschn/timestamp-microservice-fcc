const express = require('express');
const app = express();

// Middleware para evitar problemas de CORS.
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); 

// 1. RUTA DE EJEMPLO DE INICIO
// Esta ruta es opcional, pero ayuda a freeCodeCamp a verificar tu proyecto.
app.get("/", (req, res) => {
  // Nota: Deberías tener un archivo index.html simple en tu carpeta.
  res.send('<h1>Timestamp Microservice API</h1><p>Use /api/date_string or /api/timestamp</p>');
});

// **************************************************
// FUNCIÓN CENTRAL CON LA LÓGICA DEL MICROSERVICE
// **************************************************
const handleTimestamp = (req, res) => {
  // Intenta obtener el parámetro de la URL; si es la ruta "/api/", será undefined.
  const dateString = req.params.date; 
  let date;

  // 1. Caso: Sin parámetro de fecha (ej: /api/) -> Usar la hora actual
  if (!dateString) {
    date = new Date();
  
  // 2. Caso: Si el parámetro es un número largo (Posible Unix timestamp en milisegundos)
  } else if (!isNaN(dateString) && dateString.length > 8) {
    // Convertir la cadena numérica a número
    date = new Date(Number(dateString));
  
  // 3. Caso: Si es una cadena de texto (Fecha normal)
  } else {
    // Intentar parsear la cadena
    date = new Date(dateString);
  }

  // ********* VALIDACIÓN Y RESPUESTA *********

  // 4. Caso: Fecha Inválida
  // Si new Date() falla, devuelve "Invalid Date"
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // 5. Caso: Fecha Válida
  // Devolver el Unix timestamp y la fecha en formato UTC
  res.json({
    unix: date.getTime(),      // Unix timestamp en milisegundos
    utc: date.toUTCString()    // Fecha en formato UTC
  });
};

// **************************************************
// RUTAS CORREGIDAS PARA EVITAR EL ERROR DEL '?'
// **************************************************

// Ruta A: Para el caso SIN PARÁMETRO (ej: /api)
app.get("/api", handleTimestamp); 

// Ruta B: Para el caso CON PARÁMETRO (ej: /api/2015-12-25)
app.get("/api/:date", handleTimestamp); 


// **************************************************
// INICIA EL SERVIDOR
// **************************************************
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Tu aplicación está escuchando en el puerto ' + listener.address().port);
});
