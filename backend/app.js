const express = require("express");
const app = express();
require('dotenv').config();
require("./conn/conn");
const user = require("./routes/user");
const Books =require("./routes/book");
// Middleware to parse JSON
app.use(express.json());

// Routes

app.use("/api/v1", user);
app.use("/api/v1", Books);

// Creating port
app.listen(process.env.PORT, () => {
    console.log(`PORT from .env: ${process.env.PORT}`);
});
