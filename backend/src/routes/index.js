// Importación de objeto router y rutas de entidades
const router = require("express").Router();
const employeeRoutes = require("./employee-route");
const assetRoutes = require("./asset-route");

//Rutas
router.use("/employees", employeeRoutes);
router.use("/assets", assetRoutes);

module.exports = router;
