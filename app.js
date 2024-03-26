const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/DB_connection");
const mainRouter = require("./routes/indexRoutes");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", mainRouter);

(async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
  });
})();
