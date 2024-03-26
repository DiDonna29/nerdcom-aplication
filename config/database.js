const mongoose = require("mongoose");

const connectionString = `mongodb://localhost:27017/database`;

mongoose.connect(connectionString, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB database");
});
