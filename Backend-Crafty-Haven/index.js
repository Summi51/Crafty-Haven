require("dotenv").config();
const express = require("express");
const { connection } = require("./db");
const { AuthRouter } = require("./routes/authRoutes");
const { CartRouter } = require("./routes/cartRoutes");
const { OrderRouter } = require("./routes/orderRoutes");
const { CatalogRouter } = require("./routes/catalogRoutes");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Masai");
  console.log("Hello Masai");
});

app.use("/api/auth", AuthRouter);
app.use("/api/cart", CartRouter);
app.use("/api/orders", OrderRouter);
app.use("/api", CatalogRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the DB");
  } catch (err) {
    console.log(err);
    console.log("cannot connect to the DB");
  }
  console.log(`Server is running at port ${process.env.port}`);
});