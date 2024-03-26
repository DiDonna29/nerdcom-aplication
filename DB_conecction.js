const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Establecer la conexión con la base de datos
    await mongoose.connect("mongodb://localhost:27017/almacen", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión a MongoDB establecida");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1); // Salir del proceso de Node.js con código de error
  }
};

module.exports = connectDB;
