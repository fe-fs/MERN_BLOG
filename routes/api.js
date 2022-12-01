const express = require("express");

const router = express.Router();

//import the blogPost.js model
const BlogPost = require("../models/blogPost"); //importing the schema models for the database

//define routes inside server (take off /api here and add to the app.use in server.js)
router.get("/", (req, res) => {
  //adding blogpost from mongo to this route localhost:8080/api
  BlogPost.find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", daerrorta);
    });
});

//route to backend to receive data from the client POST
router.post("/save", (req, res) => {
  console.log("Body: ", req.body); //will show the body in console
  const data = req.body;

  //create a new instance of the blogpost model >> to be able to use the .save()
  const newBlogPost = new BlogPost(data);

  //.save
  newBlogPost.save((error) => {
    if (error) {
        res.status(500).json({msg: 'Sorry internal server error - data not saved'});
      return;
    }
      //BlogPost status 200 is defaul, not necessary to include
      res.json({
        msg: "data received from client",
      }); //send data as json file
    
    
  });
});

router.get("/name", (req, res) => {
  const data = {
    username: "test2",
    age: 5,
  };
  res.json(data); //send data as json file
});

//export
module.exports = router;
