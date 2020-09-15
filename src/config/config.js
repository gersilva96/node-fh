// ========================================
// Puerto
// ========================================
process.env.PORT = process.env.PORT || 3000;


// ========================================
// Entorno
// ========================================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";   //Esta variable la establece Heroku, si no está definida (desarrollo) se usa "dev"


// ========================================
// Base de datos
// ========================================
let urlDB;
(process.env.NODE_ENV === "dev") ? urlDB = "mongodb://localhost:27017/cafe" : urlDB = process.env.URIDB;
process.env.URLDB = urlDB;