const express = require("express");
const Movie = require("../models.ejs/Movie");
const router = express.Router();
// const Movie = require("../models/Movie");

// Middleware: Simulated isAdmin check (replace with real auth in production)
function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
      return next();
    } else {
      return res.status(403).send("Access denied. Admins only.");
    }
  }


  // GET: Admin dashboard
router.get("/admin/dashboard", isAdmin, (req, res) => {
    res.render("admin/dashboard", { user: req.user });
  });


// Show all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movie.ejs", { movies });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Show single movie (optional)
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.render("movies/show", { movie });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

/* ===========================
   ADMIN ROUTES (CRUD)
=========================== */

// GET: Form to add new movie
router.get("/admin/new", isAdmin, (req, res) => {
  res.render("movies/new");
});

// POST: Create new movie
router.post("/admin", isAdmin, async (req, res) => {
  try {
    const { title, description, genre, language, posterUrl } = req.body;

    const newMovie = new Movie({
      title,
      description,
      genre: genre.split(",").map(g => g.trim()), // Convert comma-separated to array
      language,
      posterUrl,
    });

    await newMovie.save();
    res.redirect("/movies");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating movie");
  }
});

// GET: Form to edit movie
router.get("/admin/:id/edit", isAdmin, async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");
  res.render("movies/edit", { movie });
});

// POST: Update movie
router.post("/admin/:id", isAdmin, async (req, res) => {
  try {
    const { title, description, genre, language, posterUrl } = req.body;

    await Movie.findByIdAndUpdate(req.params.id, {
      title,
      description,
      genre: genre.split(",").map(g => g.trim()),
      language,
      posterUrl,
    });

    res.redirect("/movies");
  } catch (err) {
    res.status(500).send("Error updating movie");
  }
});

// POST: Delete movie
router.post("/admin/:id/delete", isAdmin, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (err) {
    res.status(500).send("Error deleting movie");
  }
});

module.exports = router;
