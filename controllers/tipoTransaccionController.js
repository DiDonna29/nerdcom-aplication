const TipoTransaccion = require("../models/tipoTransaccion");

const getAll = async (req, res) => {
  const tiposTransaccion = await TipoTransaccion.find();
  res.json(tiposTransaccion);
};

const getById = async (req, res) => {
  const tipoTransaccion = await TipoTransaccion.findById(req.params.id);
  res.json(tipoTransaccion);
};

module.exports = {
  getAll,
  getById,
};
