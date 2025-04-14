const express = require("express");
const app = express();
const path = require("path");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("movies/movie.ejs"); // Correct path
});


app.listen(8080,()=>{
    console.log("Server sarted");
    
})