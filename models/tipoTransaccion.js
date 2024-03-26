const mongoose = require("mongoose");

const TipoTransaccionSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
  },
});

const TipoTransaccion = mongoose.model(
  "TipoTransaccion",
  TipoTransaccionSchema
);

module.exports = TipoTransaccion;
