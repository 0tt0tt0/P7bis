const sql = require("./db.js");
// constructor
const Post = function (post) {
  this.post_content = post.post_content;
  this.post_datetime = post.post_datetime;
  this.post_dateVue = post.post_dateVue;
  this.post_user_id = post.post_user_id;
  this.imageUrl = post.imageUrl;
  //this.user_id = post.user_id;
};
Post.create = (newPost, result) => {
  sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
    if (err) {
      console.log("error: Le post ne peut-être ajouter à la bdd", err);
      result(err, null);
      return;
    }
    sql.query("SELECT * FROM posts as p inner join users as u ON p.post_user_id = u.id_user WHERE id_post= ? ORDER BY p.post_datetime DESC", res.insertId , (err,res)=>{
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

Post.getAllPublished = result => {
  sql.query("SELECT p.*,u.pseudo,u.id_user FROM posts as p inner join users as u ON p.post_user_id = u.id_user ORDER BY p.post_datetime DESC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};
Post.remove = (id, result) => {
  sql.query("DELETE FROM posts WHERE id_post = ?", id, (err, res) => {
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

//POSSIBLE IMPROVES

// Post.updateById = (id, post, result) => {
//   sql.query(
//     "UPDATE posts SET content = ?, imageUrl = ? WHERE id = ?",
//     [post.content, post.imageUrl, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
//       if (res.affectedRows == 0) {
//         // Post introuvable avec l'id
//         result({ kind: "not_found" }, null);
//         return;
//       }
//       console.log("updated post: ", { id: id, ...post });
//       result(null, { id: id, ...post });
//     }
//   );
// };
// Post.removeAll = result => {
//   sql.query("DELETE FROM posts", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log(`deleted ${res.affectedRows} posts`);
//     result(null, res);
//   });
// };
module.exports = Post;
