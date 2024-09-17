const express = require("express");
const app = express();
require('dotenv').config();
require("./conn/conn");
const user = require("./routes/user");
const Books =require("./routes/book");
const Favourite = require("./routes/favourite")
// Middleware to parse JSON
app.use(express.json());

// Routes

app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);

// Creating port
app.listen(process.env.PORT, () => {
    console.log(`PORT from .env: ${process.env.PORT}`);
});
