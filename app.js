const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://roshnibarodiya1:W8x3diKX7Gq0GpxC@cluster0.owptsfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Server Connection stablish by Roshni");
    
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("movies/index.ejs"); // Correct path


});
app.get("/loading", (req, res) => {
    res.render("movies/loading");
  });
  

// const userRoutes = require("./router/userRoutes")
// app.use("/")
const userRoutes = require("./router/userRoutes.js");
app.use("/", userRoutes);
const movieRoutes = require("./router/movieRoutes.js");
app.use("/movies", movieRoutes);





app.listen(8080,()=>{
    console.log("Server sarted");
    
})