// Create an instance of a server
const express = require("express");
const connectDB = require("../config/db");
var cors = require("cors");
// const path = require('path');
const app = express();
//Connect DB
connectDB();

var corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.get("/", (req, res) => res.json({ msg: "We are Here" }));

//Initialize Middleware
app.use(express.json({ extended: false }));

const port = process.env.PORT || 5050;

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/logs", require("./routes/logs"));
app.use("/api/techs", require("./routes/techs"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/authtech", require("./routes/authtech"));

app.listen(port, () => console.log(`Server Started at ${port}`));
