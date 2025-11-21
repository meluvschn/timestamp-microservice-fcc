const express = require('express');
const app = express();

// Middleware para evitar problemas de CORS.
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); 

// **************************************************
// RUTA DE INICIO (Página de documentación simple)
// **************************************************
app.get("/", (req, res) => {
  res.send('<h1>Timestamp Microservice API</h1><p>Use /api/date_string or /api/timestamp</p>');
});


// **************************************************
// RUTA ÚNICA Y DEFINITIVA (CAPTURA TODOS LOS TESTS)
// **************************************************
// Usamos :date_string? para capturar /api Y /api/2015-12-25
app.get("/api/:date_string?", (req, res) => {
    
    // El parámetro será undefined si la URL es /api
    const dateString = req.params.date_string; 
    
    // 1. CASO SIN PARÁMETRO (ej: /api) -> TESTS 7 y 8
    if (!dateString) {
        // Ejecutamos la lógica de fecha actual directamente.
        const date = new Date();
        return res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });
    } 
    
    // 2. CASO CON PARÁMETRO (ej: /api/2015-12-25) -> TESTS 2 a 6
    else {
        let date;
        
        // Si parece un número largo (Timestamp Unix), lo parseamos como número
        if (!isNaN(dateString) && dateString.length > 8) {
            date = new Date(Number(dateString));
        // Si es una cadena, lo parseamos como fecha
        } else {
            date = new Date(dateString);
        }

        // VALIDACIÓN DE FECHA INVÁLIDA
        if (date.toString() === "Invalid Date") {
            return res.json({ error: "Invalid Date" });
        }
        
        // Respuesta Válida
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });
    }
});


// **************************************************
// INICIA EL SERVIDOR
// **************************************************
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Tu aplicación está escuchando en el puerto ' + listener.address().port);
});