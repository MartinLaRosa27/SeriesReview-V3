const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "Todas las review tienen que tener asignado un ID"],
  },

  titulo: {
    type: String,
    required: [true, "El titulo de la serie no puede ir vacio"],
    maxLength: [90, "El titulo de la serie debe tener hasta 25 caracteres"],
    minLength: [3, "El titulo de la serie debe tener desde 3 caracteres"],
  },

  contenido: {
    type: String,
    required: [true, "La review de la serie no puede ir vacia"],
    maxLength: [90, "La review de la serie debe tener hasta 90 caracteres"],
    minLength: [10, "La review de la serie debe tener desde 10 caracteres"],
  },

  calificacionId: {
    type: Number,
    required: [true, "La review debe tener una calificación"],
  },

  createdAd: {
    type: Date,
    immutable: [true, "La fecha de creación no se puede modificar."],
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("review", reviewSchema);
