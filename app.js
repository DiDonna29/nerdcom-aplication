const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./DB_connection");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

(async () => {
  await connectDB(); // Conectar a la base de datos

  app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
  });
})();
