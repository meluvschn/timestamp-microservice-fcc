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
// FUNCIÓN ESPECÍFICA PARA LA FECHA ACTUAL (PARA TESTS 7 y 8)
// **************************************************
const handleCurrentTime = (req, res) => {
    // Esta función solo crea la fecha y la devuelve.
    const date = new Date();
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
};

// **************************************************
// FUNCIÓN CENTRAL CON LA LÓGICA DEL MICROSERVICE (MANEJA PARÁMETROS)
// **************************************************
const handleTimestamp = (req, res) => {
    // Nota: Esta función SOLO se llama cuando hay un :date en la URL.
    const dateString = req.params.date; 
    let date;

    // 1. Caso: El parámetro es un número largo (Posible Unix timestamp en milisegundos)
    if (!isNaN(dateString) && dateString.length > 8) {
        date = new Date(Number(dateString));
    
    // 2. Caso: Si es una cadena de texto (Fecha normal)
    } else {
        date = new Date(dateString);
    }

    // ********* VALIDACIÓN Y RESPUESTA *********
    if (date.toString() === "Invalid Date") {
        return res.json({ error: "Invalid Date" });
    }

    // Caso Válido
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
};

// **************************************************
// RUTAS MÁS SEGURAS (Dos rutas simples y separadas)
// **************************************************

// 1. MANEJA LOS TESTS 7 y 8 (ej: /api y /api/)
app.get("/api", handleCurrentTime); 

// 2. MANEJA LOS TESTS 2, 3, 4, 5, 6 (ej: /api/2015-12-25)
app.get("/api/:date", handleTimestamp); 


// **************************************************
// INICIA EL SERVIDOR
// **************************************************
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Tu aplicación está escuchando en el puerto ' + listener.address().port);
});