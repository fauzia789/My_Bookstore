const express = require("express");
const app = express();
require('dotenv').config();
require("./conn/conn");
const user = require("./routes/user");
const Books =require("./routes/book");
const Favourite = require("./routes/favourite")
const Cart = require("./routes/cart")
const Order = require("./routes/order")
// Middleware to parse JSON
app.use(express.json());

// Routes

app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Creating port
app.listen(process.env.PORT, () => {
    console.log(`PORT from .env: ${process.env.PORT}`);
});
