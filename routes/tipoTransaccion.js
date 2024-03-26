const express = require("express");
const router = express.Router();
const tipoTransaccionController = require("../controllers/tipoTransaccionController");

router.get("/", tipoTransaccionController.getAll);
router.get("/:id", tipoTransaccionController.getById);

module.exports = router;
