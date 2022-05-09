module.exports = app => {
    const authController = require("../controllers/auth.controller.js");
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    const auth = require('../middleware/auth');

    // auth
    router.post("/register", authController.register);
    router.post("/login", authController.login);
    router.get("/logout", authController.logout);

    // Create a new user
    router.post("/", users.create);
    // Retrieve all users
    router.get("/", users.findAll);
    // Retrieve a single user with id
    router.get("/:id", users.findOne);
    // Update a user with id
    router.put("/:id", auth, users.update);
    // Delete a user with id
    router.delete("/:id", users.delete);
    // Delete all users
    router.delete("/", users.deleteAll);
    app.use('/api/users', router);   
};