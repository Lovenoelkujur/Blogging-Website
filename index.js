const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const authMiddleware = require("./middlewares/auth");

const PORT = 9000;

const app = express();

dotenv.config();

// to get the body in json form
app.use(express.json());

// Connection with DB(MongoDB)
mongoose.connect("mongodb://localhost:27017/authapp")
.then(() => {
    console.log("DB Connection Succesfully !");
})
.catch((err) => {
    console.log(err);
})

// Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1/posts", authMiddleware, postRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at Port : ${PORT}.`);
})