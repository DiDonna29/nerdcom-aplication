const express = require("express");
const router = express.Router();
const transaccionController = require("../controllers/transaccionController");

router.get("/", transaccionController.getAll);
router.get("/filtrar", transaccionController.getFiltered);
router.get("/:id", transaccionController.getById);
router.post("/", transaccionController.create);
router.put("/:id", transaccionController.update);
router.delete("/:id", transaccionController.deleted);

module.exports = router;
