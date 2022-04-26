module.exports = app => {
    const likes = require("../controllers/like.controller.js");
    var router = require("express").Router();
    // Create a new like
    router.post("/", likes.create);
    // Retrieve all likes
    router.get("/", likes.findAll);
    // Retrieve a single like with id
    router.get("/:id", likes.findOne);
    // Update a like with id
    router.put("/:id", likes.update);
    // Delete a like with id
    router.delete("/:id", likes.delete);
    // Delete all likes
    router.delete("/", likes.deleteAll);
    app.use('/api/likes', router);   
};