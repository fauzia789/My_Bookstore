const express = require("express");
const app = express();
require('dotenv').config();
require("./conn/conn");

// Middleware to parse JSON
app.use(express.json());

// Routes
const user = require("./routes/user");
app.use("/api/v1", user);

// Creating port
app.listen(process.env.PORT, () => {
    console.log(`PORT from .env: ${process.env.PORT}`);
});
