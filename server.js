require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/config");
const rateLimit = require("express-rate-limit");

const router = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT;


const limiter = rateLimit({
  windowMs: process.env.API_MAX_LIMIT_TIME * 60 * 1000, 
  max: process.env.API_MAX_LIMIT,
  message: "Too many requests from this IP, please try again after 1 minutes",
});

app.use(limiter);


app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({extended: true}));

app.use("/api/products", router);

let database = async () => {
  await sequelize.sync({ force: false });
};

database();
app.listen(PORT, () =>
  console.log(` Server running on http://localhost:${PORT}`)
);
