const sql = require("./db.js");


const Comment = function(comment) {
  this.comment_content = comment.comment_content;
  this.comment_datetime = comment.comment_datetime;
  this.comment_post_id = comment.comment_post_id;
  this.comment_user_id = comment.comment_user_id;
};

Comment.create = (newComment, result) => {
  sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(res.insertId);
    sql.query("SELECT * FROM comments as c inner join users as u ON c.comment_user_id = u.id_user WHERE idcomment = ? ", res.insertId , (err,res)=>{
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(res);
      result(null, res);
    });
  });
};

Comment.getAllPublishedByPostId = (id, result) => {
  sql.query("SELECT * FROM comments as c inner join users as u ON c.comment_user_id = u.id_user WHERE c.comment_post_id = ? ORDER BY c.comment_datetime ASC",id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Comment.getAll = result => {
  sql.query("SELECT * FROM comments as c inner join users as u ON c.comment_user_id = u.id_user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
    console.log(res);
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
// Comment.remove = (id, result) => {
//   sql.query("DELETE FROM comments WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     if (res.affectedRows == 0) {
//       // Commentaire introuvable avec l'id
//       result({ kind: "not_found" }, null);
//       return;
//     }
//     console.log("Suppression du Commentaire avec l'id: ", id);
//     result(null, res);
//   });
// };
module.exports = Comment;