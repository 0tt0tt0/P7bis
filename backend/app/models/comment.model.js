const sql = require("./db.js");

//Comment Model
const Comment = function(comment) {
  this.comment_content = comment.comment_content;
  this.comment_datetime = comment.comment_datetime;
  this.comment_post_id = comment.comment_post_id;
  this.comment_user_id = comment.comment_user_id;
};
//New comment
Comment.create = (newComment, result) => {
  sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    sql.query("SELECT c.*,u.pseudo FROM comments as c inner join users as u ON c.comment_user_id = u.id_user WHERE idcomment = ? ", res.insertId , (err,res)=>{
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  });
};
//Get all comments
Comment.getAll = result => {
  sql.query("SELECT * FROM comments as c inner join users as u ON c.comment_user_id = u.id_user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};
//Delete a comment
Comment.remove = (id, result) => {
  sql.query("DELETE FROM comments WHERE idcomment = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // Commentaire introuvable avec l'id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Suppression du Commentaire avec l'id: ", id);
    result(null, res);
  });
};

// Comment.updateById = (id, comment, result) => {
//   sql.query(
//     "UPDATE comments SET content = ? WHERE id = ?",
//     [comment.content, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
//       if (res.affectedRows == 0) {
//         // Commentaire introuvable avec l'id
//         result({ kind: "not_found" }, null);
//         return;
//       }
//       console.log("Commentaire mis à jour: ", { id: id, ...comment});
//       result(null, { id: id, ...comment });
//     }
//   );
// };

module.exports = Comment;