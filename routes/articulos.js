const express = require("express");
const router = express.Router();
const articuloController = require("../controllers/articuloController");

router.get("/", articuloController.getAll);
router.get("/:id", articuloController.getById);
router.post("/", articuloController.create);
router.put("/:id", articuloController.update);
router.delete("/:id", articuloController.deleted);

module.exports = router;
