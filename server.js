const express = require('express');
const app = express();

// Middleware para evitar problemas de CORS.
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); 

// **************************************************
// 1. RUTA DE INICIO (Página de documentación simple)
// **************************************************
app.get("/", (req, res) => {
  res.send('<h1>Timestamp Microservice API</h1><p>Use /api/[date] or /api/[timestamp]</p>');
});


// **************************************************
// 2. MANEJO DE FECHA ACTUAL (TESTS 7 y 8)
// **************************************************
// Esta ruta simple maneja /api y /api/ sin confusión.
app.get("/api", (req, res) => {
    const now = new Date();
    res.json({
        unix: now.getTime(),
        utc: now.toUTCString()
    });
});


// **************************************************
// 3. MANEJO DE PARÁMETROS (TESTS 2 a 6) - Ruteo con REGEX
// **************************************************
// Usamos una expresión regular para CAPTURAR cualquier cosa que SIGA a /api/
app.get(/^\/api\/(.+)$/, (req, res) => {
    
    // El parámetro capturado por la expresión regular se encuentra en req.params[0]
    const dateString = req.params[0]; 
    let date;

    // A. Verificar si es un número (Timestamp)
    if (!isNaN(dateString)) {
        // Usamos Number() para manejar el timestamp grande (milisegundos)
        date = new Date(Number(dateString)); 
    } else {
        // B. Es una cadena de fecha normal
        date = new Date(dateString);
    }

    // Validación de Fecha Inválida
    if (date.toString() === "Invalid Date") {
        return res.json({ error: "Invalid Date" });
    }

    // Respuesta Válida
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});


// **************************************************
// INICIA EL SERVIDOR
// **************************************************
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Tu aplicación está escuchando en el puerto ' + listener.address().port);
});