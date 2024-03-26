const Transaccion = require("../models/transaccion");
const Articulo = require("../models/articulo");

const getAll = async (req, res) => {
  const transacciones = await Transaccion.find()
    .populate("tipoTransaccion")
    .populate("articulo");
  res.json(transacciones);
};

const getById = async (req, res) => {
  const transaccion = await Transaccion.findById(req.params.id)
    .populate("tipoTransaccion")
    .populate("articulo");
  res.json(transaccion);
};

const create = async (req, res) => {
  const { tipoTransaccion, articulo, cantidad, costo } = req.body;

  const transaccion = new Transaccion({
    tipoTransaccion,
    articulo,
    cantidad,
    costo,
  });

  const articuloToUpdate = await Articulo.findById(articulo);

  if (tipoTransaccion === "Entrada") {
    articuloToUpdate.cantidad += cantidad;
  } else {
    if (articuloToUpdate.cantidad < cantidad) {
      return res
        .status(400)
        .json({ message: "Cantidad insuficiente en el inventario" });
    }
    articuloToUpdate.cantidad -= cantidad;
  }

  await transaccion.save();
  await articuloToUpdate.save();

  res.json(transaccion);
};

const update = async (req, res) => {
  const transaccion = await Transaccion.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.json(transaccion);
};

const deleted = async (req, res) => {
  await Transaccion.findByIdAndDelete(req.params.id);
  res.json({ message: "Transacción eliminada" });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleted,
};
