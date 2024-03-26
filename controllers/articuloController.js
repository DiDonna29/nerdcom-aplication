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
  const articulo = new Articulo(req.body);
  await articulo.save();
  res.json(articulo);
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
