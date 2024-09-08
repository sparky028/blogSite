const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/blogDB', {});

// Define post schema and model
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

const homeStartingContent = "In a world that often feels chaotic and overwhelming, journaling offers a way to anchor yourself. It’s a practice of mindfulness, where you become fully present with your thoughts and feelings. By taking the time to write, you’re giving yourself permission to slow down, reflect, and truly experience life as it happens.As you document your journey, you’ll begin to notice patterns in your thoughts, emotions, and actions. You might uncover hidden desires, unresolved issues, or new insights about who you are and what you want from life. This journal is not just a record of your days; it’s a tool for personal growth and self-discovery...🚀🔝";
const aboutContent =  "Hello! I’m Abhishek Pravin Patil I’m currently pursuing a bachelor’s degree in engineering at Vishwakarma Institute of Information Technology. My journey through the world of technology has been both challenging and rewarding, fueling my passion for learning and growth.When I’m not diving into the latest tech trends or working on my studies, you’ll often find me lost in the pages of a good novel or out on the field playing football. Both reading and football offer me a break from the hustle of academic life, helping me stay balanced and grounded.Consistency and discipline are more than just words to me—they're principles I live by every day. Whether it's sticking to my study schedule, honing my skills in football, or staying committed to personal growth, I believe in giving my best in everything I do.I firmly believe that personal ethics should be the backbone of every individual. It’s not just about achieving goals; it’s about doing so with integrity and respect for others. This belief shapes how I approach my studies, relationships, and every decision I make.";
const contactContent = "We’d Love to Hear from You!Whether you have a question, feedback, or just want to say hello, feel free to reach out. Your thoughts and inquiries are important to us, and we’re here to help in any way we can.";

// GET routes
app.get("/", (req, res) => {
  Post.find({}).then((posts) => {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  }).catch((err) => {
    console.log(err);
  });
});

app.get("/about", (req, res) => {
  res.render("about", {content: aboutContent});
});

app.get("/contact", (req, res) => {
  res.render("contact", {contact: contactContent});
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

// POST route for composing
app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save().then(() => {
    res.redirect("/");
  });
});

// Dynamic route for posts
app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;

  Post.findById(requestedPostId).then((post) => {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  }).catch((err) => {
    console.log(err);
  });
});

app.listen(4000, function() {
  console.log("Server started on port 4000");
});
