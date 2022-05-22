const sql = require("./db.js");

// Like Model
const Like = function(like) {
  this.like_post_id = like.like_post_id;
  this.like_user_id = like.like_user_id;
};
//New Like
Like.create = (newLike, result) => {
  sql.query("INSERT INTO likes SET ?", newLike, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId});
  });
};
// Find like with User and Post id
Like.GetByUserPostId = (post_id, user_id, result) => {
  sql.query(`SELECT * FROM likes where like_post_id = ? AND like_user_id = ?`, [post_id, user_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else if(res.length==0){
      result(null, false);
      return;
    }
    result(null, res);
    });
};
// Retrieve all likes from the database.
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
// Delete a like with the specified id in the request
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
    result(null, res);
  });
};

module.exports = Like;
