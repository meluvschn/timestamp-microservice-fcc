const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

// 1. RUTA DE INICIO
app.get("/", (req, res) => {
  res.send('<h1>Timestamp Microservice API</h1><p>Use /api/date_string or /api/timestamp</p>');
});


// **************************************************
// FUNCIÓN CENTRAL CON LA LÓGICA DE VALIDACIÓN
// **************************************************

// Nota: Esta función ya no necesita manejar el caso de fecha actual (Tests 7 y 8)
// porque la ruta lo maneja por separado.
const handleTimestampLogic = (req, res) => {
    const dateString = req.params.date_string;
    let date;

    // A. Verificar si es un número (Timestamp)
    if (!isNaN(dateString)) {
        // CORRECCIÓN CLAVE: Usamos Number() para manejar el timestamp grande (milisegundos)
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
};

// **************************************************
// RUTAS SEGURAS Y SEPARADAS (Solución a Tests 7 y 8)
// **************************************************

// 1. RUTA PARA FECHA ACTUAL (TESTS 7 y 8)
// Maneja solicitudes a /api y /api/
app.get("/api", (req, res) => {
    const now = new Date();
    res.json({
        unix: now.getTime(),
        utc: now.toUTCString()
    });
});

// 2. RUTA PARA PARÁMETROS (TESTS 2 a 6)
// Maneja solicitudes con parámetro (ej: /api/2015-12-25)
app.get("/api/:date_string", handleTimestampLogic);


// **************************************************
// INICIA EL SERVIDOR
// **************************************************
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Tu aplicación está escuchando en el puerto ' + listener.address().port);
});