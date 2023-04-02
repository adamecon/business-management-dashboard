import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import salestRoutes from "./routes/sales.js";
import clientRoutes from "./routes/client.js";
import managementRoutes from "./routes/management.js";
import generalRoutes from "./routes/general.js";
import mongoose from "mongoose";
import helmet from "helmet";

import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import { dataUser, dataProduct, dataProductStat } from "./data/data.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salestRoutes);

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`));

    //User.insertMany(dataUser);
    //console.log("inserted successfully");
    //Product.insertMany(dataProduct);
    //ProductStat.insertMany(dataProductStat);
  })
  .catch((error) => console.log(error));
