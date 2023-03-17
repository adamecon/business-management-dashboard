import express from "express";
import bodyParser from "body-parser";
import mongoos from "mongoose";
import nodmon from "nodemon";
import cors from "cors";
import dotenv from "dotenv";

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello app");
});

app.listen(port, () => {
  console.log("Hello app");
});
