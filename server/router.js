const express = require("express");
const router = express.Router();
const reviewController = require("./controllers/reviewController.js");

module.exports = () => {
  router.get("/get-review", reviewController.getReview);
  router.post("/post-review", reviewController.postReview);
  router.delete("/delete-review/:id", reviewController.deleteReview);
  router.patch("/patch-review/:id", reviewController.patchReview);
  return router;
};
