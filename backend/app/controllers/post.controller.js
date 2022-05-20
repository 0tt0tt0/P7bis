const Post = require("../models/post.model.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut être nul"
    });
  }
  // Create a Post
  var date = Date.now()+14400000;;
  var post_datetime = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
  token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const userId = decodedToken.id_user;
  const post = new Post({
    post_content: req.body.post_content,
    post_datetime : post_datetime,
    post_user_id : userId,
    post_dateVue : req.body.dateVue,
    //imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  // Save Post in the database
  Post.create(post, (err, data) => {
    //console.log(token);
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur a eu lieu pendant la création du post."
      });
    else {
      res.send(data);
    }
  });
};
// Retrieve all Posts from the database
exports.findAllPublished = (req, res) => {
  Post.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    else res.send(data);
  });
};
// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  Post.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Post with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Post with id " + req.params.id
          });
        }
      } else res.send({ message: `Post was deleted successfully!` });
    });
};

//POSSIBLE IMPROVES

// // Update a Post identified by the id in the request

// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }
//   console.log(req.body);
//   Post.updateById(
//     req.params.id,
//     new Post(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Post with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Post with id " + req.params.id
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };
// // Delete all Posts from the database.

// exports.deleteAll = (req, res) => {
//     Post.removeAll((err, data) => {
//         if (err)
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while removing all Posts."
//           });
//         else res.send({ message: `All Posts were deleted successfully!` });
//       });
// };
