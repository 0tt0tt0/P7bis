const sql = require("./db.js");
// constructor
const Like = function(like) {
  this.like_post_id = like.like_post_id;
  this.like_user_id = like.like_user_id;
};
Like.create = (newLike, result) => {
  console.log(newLike);
  sql.query("INSERT INTO likes SET ?", newLike, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("like créé: ", { id: res.insertId, ...newLike });
    result(null, { id: res.insertId});
  });
};
Like.CountById = (post_id, result) => {
  sql.query(`SELECT COUNT(like_post_id) as count from likes where like_post_id = ?`, post_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res[0]);
    });
};
Like.GetById = (post_id, user_id, result) => {
  sql.query(`SELECT * FROM likes where like_post_id = ? AND like_user_id = ?`, [post_id, user_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else if(res.length==0){
      console.log(res.length);
      result(null, false);
      return;
    }
    result(null, true);
    });
};
Like.getAll = (result) => {
  let query = "SELECT * FROM likes";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
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
Like.remove = (like_post_id, like_user_id, result) => {
  sql.query('DELETE FROM likes WHERE like_post_id = ? and like_user_id = ?', [like_post_id, like_user_id], (err, res) => {
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
    console.log("Suppression du like");
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
