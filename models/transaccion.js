const mongoose = require("mongoose");

const TransaccionSchema = new mongoose.Schema({
  descripcion: {
    type: String,
  },
  tipoTransaccion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TipoTransaccion",
  },
  articulo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Articulo",
  },
  fechaDocumento: {
    type: Date,
    required: true,
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

const Transaccion = mongoose.model("Transaccion", TransaccionSchema);

module.exports = Transaccion;
