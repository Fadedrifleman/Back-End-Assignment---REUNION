import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import main from "./routes/main.js";

//CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
mongoose.set("strictQuery", true);

//ROUTES
app.use("/api", main);

// SERVER & MONGOOSE SETUP
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: "majority",
    },
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🟢 🟢 🟢 Server Port: ${PORT} 🟢 🟢 🟢`)
    );
  })
  .catch((error) => console.log(`❌ ❌ ❌ ${error} ❌ ❌ ❌`));
