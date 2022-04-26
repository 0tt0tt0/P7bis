const User = require("../models/user.model.js");
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut être nul"
    });
  }
  // Create a User
  const user = new User({
    pseudo: req.body.pseudo,
    email: req.body.email,
    password: req.body.password
  });
  // Save User in the database
  User.create(user, (err, data) => {
    if (err) 
      res.status(500).send({
        message:
          err.message || "Une erreur a eu lieu pendant la création de l'utilisateur."
      });
    else res.send(data);
  });
};
// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
    const pseudo = req.query.pseudo;
    User.getAll(pseudo, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Erreur"
        });
      else res.send(data);
    });
};
// Find a single User with a id
exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Utilisateur non trouvé avec l'id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Erreur pour l'id " + req.params.id
            });
          }
        } else res.send(data);
    });
};
// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  User.updateById(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete User with id " + req.params.id
            });
          }
        } else res.send({ message: `User was deleted successfully!` });
      });
};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Users."
          });
        else res.send({ message: `All Users were deleted successfully!` });
      });
};
