const mongoose = require("mongoose");
const Movie = require("./models.ejs/Movie");
// const Movie = require("./models/Movie");


mongoose.connect("mongodb+srv://roshnibarodiya1:W8x3diKX7Gq0GpxC@cluster0.owptsfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0c", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleMovies = [
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    genre: ["Action", "Sci-Fi", "Thriller"],
    language: "English",
    posterUrl: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg"
  },
  {
    title: "3 Idiots",
    description: "Two friends embark on a quest to find a lost buddy. On this journey, they encounter many lessons about friendship and life.",
    genre: ["Comedy", "Drama"],
    language: "Hindi",
    posterUrl: "https://m.media-amazon.com/images/I/81313k5ZKUL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "Parasite",
    description: "Greed and class discrimination threaten the relationship between the wealthy Park family and the destitute Kim clan.",
    genre: ["Drama", "Thriller"],
    language: "Korean",
    posterUrl: "https://m.media-amazon.com/images/I/91EUro56k+L._AC_UF1000,1000_QL80_DpWeblab_.jpg"
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker emerges, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: ["Action", "Crime", "Drama"],
    language: "English",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg"
  },
  {
    title : "Inception",
    description: "A skilled thief who steals corporate secrets through dream-sharing technology is given a chance to have his criminal history erased.",
    genre: "Sci-Fi, Action, Thriller",
    language: "English",
    posterUrl: "https://m.media-amazon.com/images/I/91G0gTLz6GL._AC_UF1000,1000_QL80_.jpg"
  },

  {
    title: "Spirited Away",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, spirits, and a witch, where humans are changed into beasts.",
    genre: "Animation, Fantasy, Adventure",
    language: "Japanese",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  },
  {
    title: "The Dark Knight",
    description: "Batman raises the stakes in his war on crime, facing off against the Joker—a criminal mastermind who wants to watch the world burn.",
    genre: "Action, Crime, Drama",
    language: "English",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg"

  },
  {
    title: "Amélie",
  description: "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
    genre: "Romance, Comedy",
    language: "French",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BOTNmYzY0MWQtZGZmNy00Y2Y4LWFmMDQtMTZjYTdiYzEwZGQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  }
];

async function seedMovies() {
  await Movie.insertMany(sampleMovies);
  // await Movie.deleteMany();
  console.log("Sample movies inserted 🚀");
  mongoose.connection.close();
}

seedMovies();
