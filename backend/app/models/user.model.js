const sql = require("./db.js");
// constructor
const User = function(user) {
  this.pseudo = user.pseudo;
  this.email = user.email;
  this.hash = user.hash;
  this.admin = user.admin;
};
User.signUp = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Utilisateur créé: ", { id_user: res.insertId, ...newUser });
    result(null, { id_user: res.insertId, ...newUser });
  });
};
User.signIn = async (email, result) => {
  sql.query("SELECT * FROM users WHERE email = ?;", email, (err,res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else if(res.length ==0){
      console.log(res.length);
      result(err, err);
      return;
    }
    console.log(res); 
    result(null, res[0]);
  });
}

/*User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Utilisateur créé: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};*/
User.findById = (id, result) => {
  sql.query(`SELECT users.pseudo, users.email, users.admin FROM users WHERE id_user = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Utilisateur trouvé: ", res[0]);
      result(null, res[0]);
      return;
    }
    // Utilisateur introuvable
    result({ kind: "not_found" }, null);
  });
};
User.getAll = result => {
  let query = "SELECT * FROM users";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
    console.log(res);
  });
};
User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET pseudo = ?, email = ?, password = ? WHERE id = ?",
    [user.pseudo, user.email, user.password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // Utilisateur introuvable avec l'id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Utilisateur mis à jour: ", { id: id, ...user});
      result(null, { id: id, ...user });
    }
  );
};
User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id_user = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // Utilisateur introuvable avec l'id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Suppression de l'utilisateur avec l'id: ", id);
    result(null, res);
  });
};
User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};
module.exports = User;
