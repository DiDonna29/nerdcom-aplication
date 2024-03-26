// routes/index.js
const express = require("express");
const router = express.Router();

// Importa los routers individuales
const articulosRouter = require("./articulos");
const tipoTransaccionRouter = require("./tipoTransaccion");
const transaccionesRouter = require("./transacciones");

// Combina los routers
router.use("/articulos", articulosRouter);
router.use("/tipoTransaccion", tipoTransaccionRouter);
router.use("/transacciones", transaccionesRouter);

module.exports = router;
