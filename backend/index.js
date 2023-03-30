import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import salestRoutes from "./routes/sales";
import clientRoutes from "./routes/client";
import managementRoutes from "./routes/management";
import generalRoutes from "./routes/general";
import mongoose from "mongoose";

import User from "./models/User.js";
import dataUser from "./data/data.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("client", clientRoutes);
app.use("general", generalRoutes);
app.use("management", managementRoutes);
app.use("sales", salestRoutes);

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGODB_URI, {
    setNewUrlParser: true,
    setUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`));

    User.insertMany(dataUser);
  })
  .catch((error) => console.log(error));
