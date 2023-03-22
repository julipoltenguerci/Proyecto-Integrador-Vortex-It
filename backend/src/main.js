// Importación de módulos y framework
const express = require("express");
const dotEnv = require("dotenv");
const routes = require("./routes");

//Configuración de variables de entorno
dotEnv.config();

//App de express
const app = express();

//Se establece puerto en el que se ejecutará la app
app.set("PORT", process.env.API_PORT || 8080);

//Middleware para parsear body de req HTTP en formato JSON
app.use(express.json({ limit: "50mb" }));

//Routes
app.use("/api/v1", routes);

//Middleware para manejo de error en toda la app
app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json(err.message || "Ha ocurrido un error en el servidor");
});

module.exports = app;
