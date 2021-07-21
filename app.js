//jshint esversion:6
const express=require('express');
const bodyParser=require("body-parser");
const ejs=require("ejs");
const _=require("lodash");
const mongoose=require('mongoose');

const homeInitialcontent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const aboutContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const contactContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://Saurabh:saurabh123@cluster0.ji1be.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema={
  title:String,
  content:String
};
const Post=mongoose.model("Post",postSchema);

app.get("/", function(req, res){
  Post.find({},function(err,posts){
    res.render("home", {
      startingContent: homeInitialcontent,
      posts: posts
      });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
      title: req.body.postTitle,
      content: req.body.postBody
    });
  post.save(function(err){
  if(!err){
      res.redirect("/");
  }
});});

app.get("/posts/:postId", function(req, res){
  const requestedPostId=req.params.postId;
  Post.findOne({_id:requestedPostId},function(err,post){
    res.render("post",{
      title:post.title,
      content:post.content
    });
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
