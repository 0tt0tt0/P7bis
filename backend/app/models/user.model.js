const sql = require("./db.js");


//USER MODEL
const User = function(user) {
  this.pseudo = user.pseudo;
  this.email = user.email;
  this.hash = user.hash;
  this.admin = user.admin;
};

//REQUESTS SQL
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
User.updatePseudoById = (id, pseudo, result) => {
  sql.query(
    "UPDATE users SET pseudo = ? WHERE id_user = ?",
    [pseudo, id],
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
      console.log("Utilisateur mis à jour: ", { id: id, pseudo: pseudo});
      result(null, { id: id, pseudo: pseudo });
    }
  );
};
User.updatePasswordById = (id, hash, result) => {
  sql.query(
    "UPDATE users SET hash = ? WHERE id_user = ?",
  [hash, id],
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
      console.log("Utilisateur mis à jour: ", { id: id});
      result(null, { id: id});
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


User.findById = (id, result) => {
  sql.query(`SELECT users.id_user, users.pseudo, users.email, users.admin FROM users WHERE id_user = ${id}`, (err, res) => {
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

module.exports = User;
