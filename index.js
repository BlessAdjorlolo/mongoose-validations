const express = require("express");
const postRouter =require("./modules/posts/posts.route");
const {dbConnect} = require("./config/dbConnect")
const {authRouter} = require("./modules/users/auth.route");


const app = express();

app.use(express.json());
app.get("/", (req, res) =>{
  res
  .status(200)
  .send("Welcome to my server")
})

app.use("/posts", postRouter);
app.use("/auth", authRouter);

async function start(){
  await dbConnect();

  app.listen(4000, ()=>{
    console.log("Server is running on http://localhost:4000")
  });
}

start();