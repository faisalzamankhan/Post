const express = require("express");
const bodyParser=require("body-parser")
const Post=require("./models/post");
const mongoose  = require("mongoose");
const multer = require('multer');



mongoose.connect("mongodb+srv://faisal:faisal@cluster0.y3cxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(()=>{
console.log("Connected to Database !!!!")
})
.catch(()=>{
console.log("connection Failed !!!")
})
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/api/posts",(req,res)=>{
 Post.find()
 .then(result=>{
  // console.log(result)
   res.json({
    message:"Message Fetch Suceesfully",
    posts:result
  })
  })
  console.log("Message fetch Succesfully")
})

app.post("/api/posts",(req,res,next)=>{
  const post=new Post({
    title:req.body.title,
    content:req.body.content
  })
  post.save().then(createdpost=>{
    res.json({
      id:createdpost._id,
      message:"Post Add Sucefully"})    
  })
})

app.delete("/api/posts/:id",(req,res,next)=>{
 
    Post.deleteOne({ _id : req.params.id})
    .then(result=>{
      res.json({message:"Post Deleted"})

    })
    })

app.put("/api/posts/:id",(req,res,next)=>{
  const post=new Post({
    _id:req.body.id,
    title:req.body.title,
    content:req.body.content
  })
  Post.updateOne({_id:req.params.id},post)
  .then(result=>{
    res.json({message:"Post Updated Sucessfully"})
  })
})    

/// File Upload //////
let upload = multer({ dest: 'uploads/' })
app.post('/file', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file);
})





module.exports = app;
