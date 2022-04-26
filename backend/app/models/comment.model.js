const sql = require("./db.js");
// constructor
const Comment = function(comment) {
  this.content = comment.content;
};
Comment.create = (newComment, result) => {
  sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Commentaire créé: ", { id: res.insertId, ...newComment });
    result(null, { id: res.insertId, ...newComment });
  });
};
Comment.findById = (id, result) => {
  sql.query(`SELECT * FROM comments WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Commentaire trouvé: ", res[0]);
      result(null, res[0]);
      return;
    }
    // Commentaire introuvable
    result({ kind: "not_found" }, null);
  });
};
Comment.getAll = (content, result) => {
  let query = "SELECT * FROM comments";
  if (content) {
    query += ` WHERE content LIKE '%${content}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Commentaires : ", res);
    result(null, res);
  });
};
Comment.updateById = (id, comment, result) => {
  sql.query(
    "UPDATE comments SET content = ? WHERE id = ?",
    [comment.content, id],
    (err, res) => {
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
      console.log("Commentaire mis à jour: ", { id: id, ...comment});
      result(null, { id: id, ...comment });
    }
  );
};
Comment.remove = (id, result) => {
  sql.query("DELETE FROM comments WHERE id = ?", id, (err, res) => {
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
Comment.removeAll = result => {
  sql.query("DELETE FROM comments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} comments`);
    result(null, res);
  });
};
module.exports = Comment;
