const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port  = process.env.PORT || 3000;
require('dotenv').config()

// parse requests of content-type: application/json
app.use(express.json());
app.use(cors())
// parse requests of content-type: application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MOngodb connection established')
})
// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to wolffkraft." });
// });

const casestudyRouter = require("./routes/casestudy.route.js");
const blogRouter = require("./routes/blog.route.js");

app.use('/casestudy', casestudyRouter)
app.use('/blog', blogRouter)
// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});