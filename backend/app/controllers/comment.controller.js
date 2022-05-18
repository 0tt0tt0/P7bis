const Comment = require("../models/comment.model.js");
const jwt = require('jsonwebtoken');
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut être nul"
    });
  }

  // Create a comment
  var datenow = Date.now()+14400000;
  var comment_datetime = new Date(datenow).toISOString().slice(0, 19).replace('T', ' ');
  token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const userId = decodedToken.id_user;
  const comment = new Comment({
    comment_content: req.body.comment_content,
    comment_datetime : comment_datetime, 
    comment_post_id: req.body.comment_post_id,
    comment_user_id: userId,
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

//Get all comments for one post
exports.findOnePostComments = (req, res) => {
  Comment.getAllPublishedByPostId(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erreur"
      });
    else res.send(data);
  });
};

//Get all comments
exports.getAllComments = (req, res) => {
  Comment.getAll ((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erreur"
      });
    else res.send(data);
  });
};
// // Update a comment identified by the id in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }
//   console.log(req.body);
//   Comment.updateById(
//     req.params.id,
//     new Comment(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found comment with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating comment with id " + req.params.id
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };
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