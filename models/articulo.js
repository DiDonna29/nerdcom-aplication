const mongoose = require("mongoose");

const ArticuloSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
  },
  fechaIngreso: {
    type: Date,
    required: true,
  },
  fechaVencimiento: {
    type: Date,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  costo: {
    type: Number,
    required: true,
  },
  estado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estado",
  },
});

const Articulo = mongoose.model("Articulo", ArticuloSchema);

module.exports = Articulo;
