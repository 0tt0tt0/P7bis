const sql = require("./db.js");
// constructor
const Post = function(post) {
  this.content = post.content;
  this.imageUrl = post.imageUrl;
};
Post.create = (newPost, result) => {
  sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created post: ", { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
};
Post.findById = (id, result) => {
  sql.query(`SELECT * FROM posts WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found post: ", res[0]);
      result(null, res[0]);
      return;
    }
    // Post introuvable
    result({ kind: "not_found" }, null);
  });
};
Post.getAll = (title, result) => {
  let query = "SELECT * FROM posts";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Posts : ", res);
    result(null, res);
  });
};
Post.updateById = (id, post, result) => {
  sql.query(
    "UPDATE posts SET content = ?, imageUrl = ? WHERE id = ?",
    [post.content, post.imageUrl, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // Post introuvable avec l'id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated post: ", { id: id, ...post});
      result(null, { id: id, ...post });
    }
  );
};
Post.remove = (id, result) => {
  sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // Post introuvable avec l'id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Suppression de Post avec l'id: ", id);
    result(null, res);
  });
};
Post.removeAll = result => {
  sql.query("DELETE FROM posts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} posts`);
    result(null, res);
  });
};
module.exports = Post;
