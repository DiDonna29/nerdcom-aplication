const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Articulo = require("./models/articulo");
const Transaccion = require("./models/transaccion");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// **Ruta para agregar un artículo**
app.post("/articulos", async (req, res) => {
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
});

// **Ruta para obtener un artículo por ID**
app.get("/articulos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const articulo = await Articulo.findById(id);
    if (!articulo) {
      throw new Error("El artículo no existe");
    }
    res.json(articulo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **Ruta para actualizar un artículo por ID**
app.put("/articulos/:id", async (req, res) => {
  const { id } = req.params;
  const {
    Descripcion,
    FechaIngreso,
    FechaVencimiento,
    Cantidad,
    Costo,
    Estado,
  } = req.body;
  try {
    const articulo = await Articulo.findById(id);
    if (!articulo) {
      throw new Error("El artículo no existe");
    }
    articulo.Descripcion = Descripcion;
    articulo.FechaIngreso = FechaIngreso;
    articulo.FechaVencimiento = FechaVencimiento;
    articulo.Cantidad = Cantidad;
    articulo.Costo = Costo;
    articulo.Estado = Estado;
    await articulo.save();
    res.json(articulo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **Ruta para eliminar un artículo por ID**
app.delete("/articulos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Articulo.findByIdAndDelete(id);
    res.json({ message: "Artículo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **Ruta para agregar una transacción**
app.post("/transacciones", async (req, res) => {
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

    // Obtener el tipo de transacción por su ID
    const tipoTransaccion = await TipoTransaccion.findById(TipoTransaccionId);
    if (!tipoTransaccion) {
      throw new Error("El tipo de transacción no existe");
    }

    // Calcular el costo de la transacción
    const costoTransaccion = Cantidad * articulo.Costo;

    // Actualizar la cantidad de artículos según el tipo de transacción
    if (tipoTransaccion.nombre === "entrada") {
      articulo.Cantidad += Cantidad; // Sumar la cantidad de la transacción
    } else if (tipoTransaccion.nombre === "salida") {
      if (articulo.Cantidad < Cantidad) {
        throw new Error(
          "No hay suficientes artículos disponibles para esta transacción"
        );
      }
      articulo.Cantidad -= Cantidad; // Restar la cantidad de la transacción
    } else {
      throw new Error("Tipo de transacción no válido");
    }

    // Guardar el artículo actualizado en la base de datos
    await articulo.save();

    //
    // Crear y guardar la transacción
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
});

// **Ruta para obtener una transacción por ID**
app.get("/transacciones/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const transaccion = await Transaccion.findById(id);
    if (!transaccion) {
      throw new Error("La transacción no existe");
    }
    res.json(transaccion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **Ruta para actualizar una transacción por ID**
app.put("/transacciones/:id", async (req, res) => {
  const { id } = req.params;
  const { Descripcion, TipoTransaccionId, FechaDocumento, Cantidad, Estado } =
    req.body;
  try {
    const transaccion = await Transaccion.findById(id);
    if (!transaccion) {
      throw new Error("La transacción no existe");
    }
    transaccion.Descripcion = Descripcion;
    transaccion.TipoTransaccionId = TipoTransaccionId;
    transaccion.FechaDocumento = FechaDocumento;
    transaccion.Cantidad = Cantidad;
    transaccion.Estado = Estado;
    await transaccion.save();
    res.json(transaccion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **Ruta para eliminar una transacción por ID**
app.delete("/transacciones/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Transaccion.findByIdAndDelete(id);
    res.json({ message: "Transacción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
