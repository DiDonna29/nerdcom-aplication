const Transaccion = require("../models/transaccion");
const Articulo = require("../models/articulo");
const TipoTransaccion = require("../models/tipoTransaccion");

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
  const {
    Descripcion,
    TipoTransaccionId,
    ArticuloId,
    FechaDocumento,
    Cantidad,
    Estado,
  } = req.body;
  try {
    const articulo = await Articulo.findById(ArticuloId);
    if (!articulo) {
      throw new Error("El artículo no existe");
    }

    const tipoTransaccion = await TipoTransaccion.findById(TipoTransaccionId);
    if (!TipoTransaccion) {
      throw new Error("El tipo de transacción no existe");
    }

    const costoTransaccion = Cantidad * articulo.costo;

    if (tipoTransaccion.descripcion === "entrada") {
      articulo.cantidad += Cantidad;
    } else if (tipoTransaccion.descripcion === "salida") {
      if (articulo.cantidad < Cantidad) {
        throw new Error(
          "No hay suficientes artículos disponibles para esta transacción"
        );
      }
      articulo.cantidad -= Cantidad;
    } else {
      throw new Error("Tipo de transacción no válido");
    }

    await articulo.save();

    const transaccion = new Transaccion({
      Descripcion,
      TipoTransaccionId,
      FechaDocumento,
      Cantidad,
      Estado,
      Costo: costoTransaccion,
      ArticuloId,
    });
    await transaccion.save();

    res.json(transaccion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
