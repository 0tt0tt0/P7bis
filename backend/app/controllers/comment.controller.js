const Comment = require("../models/comment.model.js");
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut être nul"
    });
  }
  // Create a comment
  const comment = new Comment({
    content: req.body.content,
  });
  // Save comment in the database
  Comment.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur a eu lieu pendant la création du comment."
      });
    else res.send(data);
  });
};
// Retrieve all comments from the database (with condition).
exports.findAll = (req, res) => {
    const content = req.query.content;
    Comment.getAll(content, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Erreur"
        });
      else res.send(data);
    });
};
// Find a single comment with a id
exports.findOne = (req, res) => {
    Comment.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `comment non trouvé avec l'id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Erreur pour l'id " + req.params.id
            });
          }
        } else res.send(data);
    });
};
// Update a comment identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  Comment.updateById(
    req.params.id,
    new Comment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found comment with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating comment with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
// Delete a comment with the specified id in the request
exports.delete = (req, res) => {
   Comment.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found comment with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete comment with id " + req.params.id
            });
          }
        } else res.send({ message: `comment was deleted successfully!` });
      });
};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    Comment.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all comments."
          });
        else res.send({ message: `All comments were deleted successfully!` });
      });
};
