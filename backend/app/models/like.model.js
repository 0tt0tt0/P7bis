const sql = require("./db.js");
// constructor
const Like = function(user) {
  this.like = user.like;
};
Like.create = (newLike, result) => {
  sql.query("INSERT INTO likes SET ?", newLike, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("like créé: ", { id: res.insertId, ...newlike });
    result(null, { id: res.insertId, ...newLike });
  });
};
Like.findById = (id, result) => {
  sql.query(`SELECT * FROM likes WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("likeaire trouvé: ", res[0]);
      result(null, res[0]);
      return;
    }
    // likeaire introuvable
    result({ kind: "not_found" }, null);
  });
};
Like.getAll = (like, result) => {
  let query = "SELECT * FROM likes";
  if (like) {
    query += ` WHERE like LIKE '%${like}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("likes : ", res);
    result(null, res);
  });
};
Like.updateById = (id, user, result) => {
  sql.query(
    "UPDATE likes SET like = ? WHERE id = ?",
    [user.like, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // likeaire introuvable avec l'id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("like mis à jour: ", { id: id, ...user});
      result(null, { id: id, ...user });
    }
  );
};
Like.remove = (id, result) => {
  sql.query("DELETE FROM likes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // likeaire introuvable avec l'id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Suppression du likeaire avec l'id: ", id);
    result(null, res);
  });
};
Like.removeAll = result => {
  sql.query("DELETE FROM likes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} likes`);
    result(null, res);
  });
};
module.exports = Like;
