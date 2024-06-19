require("dotenv").config();

const express = require("express");

const app = express();
const authRouter = require("./router/authRoute"); //7
const databaseconnect = require("./config/databaseConfig"); //9
const cookieParser = require("cookie-parser"); //20
const cors = require("cors"); //22

databaseconnect();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use("/api/auth", authRouter); //6

app.use("/", (req, res) => {
  res.status(200).json({ data: "JWTauth server" });
});

module.exports = app;