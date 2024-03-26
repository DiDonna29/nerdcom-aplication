// app.js
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/indexRoutes");
const connectDB = require("./DB_conecction");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(connectDB());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
