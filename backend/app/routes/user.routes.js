module.exports = app => {
    const authController = require("../controllers/auth.controller.js");
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();

    // auth
    router.post("/register", authController.signUp);
    router.post("/login", authController.signIn);
    //router.get("/logout", authController.logout);

    // Create a new user
    router.post("/", users.create);
    // Retrieve all users
    router.get("/", users.findAll);
    // Retrieve a single user with id
    router.get("/:id", users.findOne);
    // Update a user with id
    router.put("/:id", users.update);
    // Delete a user with id
    router.delete("/:id", users.delete);
    // Delete all users
    router.delete("/", users.deleteAll);
    app.use('/api/users', router);   
};