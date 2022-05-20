const Like = require("../models/like.model.js");
const jwt = require('jsonwebtoken');

//New Like
exports.create = (req, res) => {
  token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const userId = decodedToken.id_user;
  const like = new Like({
    like_post_id: req.params.like_post_id,
    like_user_id: userId,  
  });
  Like.create(like, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur a eu lieu pendant la création du like."
      });
    else res.send(data);
  });
};
// Retrieve all likes from the database.
exports.findAll = (req, res) => {;
    Like.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Erreur"
        });
      else res.send(data);
    });
};
// Find like with User and Post id
exports.getLikesByUserPostId = (req, res) => {
  token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const id = decodedToken.id_user;
  Like.GetByUserPostId(req.params.post_id, id, (err, data) => {
      if (err) {
        res.status(500).send({
            message: "Erreur pour l'id " + id
        });
      }
      res.send(data);
  });
};
// Delete a like with the specified id in the request
exports.delete = (req, res) => {
  token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const userId = decodedToken.id_user;
  Like.remove(req.params.like_post_id, userId, (err, data) => {
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

// //POSSIBLE IMPROVES
// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//     Like.removeAll((err, data) => {
//         if (err)
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while removing all likes."
//           });
//         else res.send({ message: `All likes were deleted successfully!` });
//       });
// };
