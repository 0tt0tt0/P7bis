const Like = require("../models/like.model.js");
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut être nul"
    });
  }
  // Create a like
  const like = new Like({
    content: req.body.content,
  });
  // Save like in the database
Like.create(like, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur a eu lieu pendant la création du like."
      });
    else res.send(data);
  });
};
// Retrieve all likes from the database (with condition).
exports.findAll = (req, res) => {
    const content = req.query.content;
    Like.getAll(content, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Erreur"
        });
      else res.send(data);
    });
};
// Find a single like with a id
exports.findOne = (req, res) => {
    Like.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `like non trouvé avec l'id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Erreur pour l'id " + req.params.id
            });
          }
        } else res.send(data);
    });
};
// Update a like identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  Like.updateById(
    req.params.id,
    new like(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found like with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating like with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
// Delete a like with the specified id in the request
exports.delete = (req, res) => {
   Like.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found like with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete like with id " + req.params.id
            });
          }
        } else res.send({ message: `like was deleted successfully!` });
      });
};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    Like.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all likes."
          });
        else res.send({ message: `All likes were deleted successfully!` });
      });
};
