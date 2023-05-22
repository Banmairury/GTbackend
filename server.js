const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const allRoute = require("./routes/route")
const authRoute = require("./routes/auth")
require("dotenv").config();

const app = express();
const { PORT, URL_DATABASE ,DATABASE} = process.env;

// connect mongoDB with mongoose
const connectMongoDB = async () => {
  try {
    await mongoose.connect(URL_DATABASE,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect MongoDB Success");
  } catch (error) {
    console.log(error);
  }
  const port = PORT || 8080;
  app.listen(port, () => console.log(`start server in port ${port}`));
};
connectMongoDB();


//middleware = .use
app.use(express.json()); //ตั้งค่าrestAPI response json ให้ client
app.use(cors());
app.use(morgan("dev")); //เก็บlog request

//route
app.use('/api',allRoute)
//app.use('/api',authRoute)


