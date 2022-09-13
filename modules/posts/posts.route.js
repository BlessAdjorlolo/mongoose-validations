const router = require("express").Router;
const {getAllPost, createPost, deletePost, getSinglePost, updatePost,} = require("./posts.controllers");

const postRouter = router();

postRouter.route("/").get(getAllPost).post(createPost);
postRouter.route("/:postId").get(getSinglePost).patch(updatePost).delete(deletePost);


module.exports = postRouter;

