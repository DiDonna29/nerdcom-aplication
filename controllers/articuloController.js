const Articulo = require("../models/articulo");

const getAll = async (req, res) => {
  const articulos = await Articulo.find();
  res.json(articulos);
};

const getById = async (req, res) => {
  const articulo = await Articulo.findById(req.params.id);
  res.json(articulo);
};

const create = async (req, res) => {
  const {
    Descripcion,
    FechaIngreso,
    FechaVencimiento,
    Cantidad,
    Costo,
    Estado,
  } = req.body;
  try {
    const articulo = new Articulo({
      Descripcion,
      FechaIngreso,
      FechaVencimiento,
      Cantidad,
      Costo,
      Estado,
    });
    await articulo.save();
    res.json(articulo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const articulo = await Articulo.findByIdAndUpdate(req.params.id, req.body);
  res.json(articulo);
};

const deleted = async (req, res) => {
  await Articulo.findByIdAndDelete(req.params.id);
  res.json({ message: "Artículo eliminado" });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleted,
};
