const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./src/routes");

const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", route);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
    });

app.listen(PORT, () => {
    console.log(`Server is runnig on ${PORT}`);
});
