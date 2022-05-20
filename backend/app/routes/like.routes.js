module.exports = app => {
    const likes = require("../controllers/like.controller.js");
    var router = require("express").Router();
    const auth = require('../middleware/auth');

    // Create a new like
    router.post("/:like_post_id",auth, likes.create);
    // Retrieve all likes
    router.get("/",auth, likes.findAll);
    // Retrieve likes with user_id and post_id
    router.get("/userpost/:post_id",auth, likes.getLikesByUserPostId); 
    // Delete a like with id
    router.delete("/:like_post_id",auth, likes.delete);

    //POSSIBLE IMPROVES
    // // Delete all likes
    // router.delete("/", likes.deleteAll);
    
    app.use('/api/likes', router);   
};