module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    var router = require("express").Router();
    // Create a new comment
    router.post("/", comments.create);
    // Retrieve all comments for one post with id
    router.get("/:id", comments.findOnePostComments);
    // Retrieve all comments
    router.get("/", comments.getAllComments);
    // Update a comment with id
    //router.put("/:id", comments.update);
    //Delete a comment with id
    router.delete("/:id", comments.delete);
    app.use('/api/comments', router);   
};