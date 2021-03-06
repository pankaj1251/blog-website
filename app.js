const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const ejs = require("ejs");

app.set("view engine", "ejs");

app.use(express.static("public"));

const _ = require("lodash");

const posts = []; //to store all the compose objects;

const Homecontent = `Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit
   amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque 
   sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae
    ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. 
    Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.`;

const aboutContent = `Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit
 ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam 
 vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet 
 massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa 
 tincidunt dui.`;

const contactContent = `Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus 
arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis 
aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum 
dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. 
Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.`;

app.get("/", (req, res) => {
  res.render("home", { Homecontent_: Homecontent, posts: posts });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent_: contactContent });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent_: aboutContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  posts.push(post);

  res.redirect("/"); //redirect to root route
});

// to convert postName(which user types in the url ) and  storedTitle strings in same format we use lodash.
app.get("/posts/:postName", (req, res) => {
  let requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach((post) => {
    let storedtitle = _.lowerCase(post.title);
    if (requestedTitle === storedtitle) {
      res.render("post", {
        //as we are inside this for loop, we still have access to the post object
        title: post.title,
        content: post.content,
      });
    }
  });
});

app.listen(port, function () {
  console.log("Server started on port 3000");
});
