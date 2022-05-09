module.exports = app => {
    const likes = require("../controllers/like.controller.js");
    var router = require("express").Router();
    // Create a new like
    router.post("/:like_post_id/:like_user_id", likes.create);
    // Retrieve all likes
    router.get("/", likes.findAll);
    // Retrieve likes with user_id and post_id
    router.get("/:post_id/:user_id", likes.getLikesByUserPostId);
    // Retrieve a single like with id
    router.get("/:id", likes.countbyPostId);
    // Update a like with id
    router.put("/:id", likes.update);
    // Delete a like with id
    router.delete("/:like_post_id/:like_user_id", likes.delete);
    // Delete all likes
    router.delete("/", likes.deleteAll);
    app.use('/api/likes', router);   
};