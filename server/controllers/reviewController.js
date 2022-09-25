const Review = require("../models/Review.js");
const shortid = require("shortid");

exports.getReview = async (req, res) => {
  const review = await Review.find();
  res.send(review);
};

exports.deleteReview = async (req, res) => {
  const _id = req.params.id;
  try {
    const review = await Review.deleteOne({ _id });
    if (review.deletedCount > 0) {
      res.send("review eliminada");
    } else {
      res.send("No se elimino la review");
    }
  } catch (e) {
    res.send("No se pudo eliminar la review");
  }
};

exports.patchReview = async (req, res) => {
  const _id = req.params.id;
  const { titulo, contenido } = req.body;
  try {
    await Review.updateOne(
      {
        _id: _id,
      },
      {
        titulo: titulo,
        contenido: contenido,
      }
    );
    res.send("Review modificada");
  } catch (e) {
    res.send(e.message);
  }
};

exports.postReview = async (req, res) => {
  const { titulo, contenido, calificacion } = req.body;
  try {
    const review = await Review.create({
      _id: shortid.generate(),
      titulo: titulo,
      contenido: contenido,
      calificacionId: calificacion,
    });
    review.save();
    res.send("Review publicada");
  } catch (e) {
    res.send(e.message);
  }
};
