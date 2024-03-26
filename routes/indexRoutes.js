const express = require("express");
const router = express.Router();

const articulosRouter = require("./articulos");
const tipoTransaccionRouter = require("./tipoTransaccion");
const transaccionesRouter = require("./transacciones");

router.use("/articulos", articulosRouter);
router.use("/tipoTransaccion", tipoTransaccionRouter);
router.use("/transacciones", transaccionesRouter);

module.exports = router;
