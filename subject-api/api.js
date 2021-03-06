var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var MongoClient = require('mongodb').MongoClient
var cors = require('cors')
var ObjectId = require('mongodb').ObjectID;

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride())

function mongo(callback) {
  MongoClient.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017",
      { useNewUrlParser: true , connectTimeoutMS: 3000,serverSelectionTimeoutMS: 3000}, 
      function (e, client) {
        if(e) {
          callback(e,null)
        } else {
          callback(null,client.db("schools"))
        }
  });
}


app.get("/subject/prop",(req,res)=> {
    res.json([
      {'name':'Subject Name','modalName':'name','inputType':'text'},
      {'name':'Language','modalName':'language','inputType':'text'},
      {'name':'Description','modalName':'desc','inputType':'text'},
      {'name':'Category','modalName':'category','inputType':'text'}
  ])
})

app.post("/subject",async (req,res, next)=> {

  mongo((e,d)=>{
    if(e) {
      next(e)
    } else {
      d.collection("subject").insertOne(req.body,(err,result) => {
        if (err){
          next(err)
        } else {
          res.status(200).json(result);
        }        
      });
    }
  })
  
});

app.get("/subject",(req,res,next)=> {

  mongo((e,d)=>{
    if(e) {
      next(e)
    } else {
      d.collection("subject").find().toArray(function (err, result) {
        if (err){
          next(err)
        } else {
          res.status(200).json(result);
        }        
      });
    }
  })

});

app.get("/subject/:id",(req,res, next)=> {

  mongo((e,d)=>{
    if(e) {
      next(e)
    } else {
      d.collection("subject").findOne({"_id": new ObjectId(req.params.id)},function (err, result) {
        if (err){
          next(err)
        } else {
          res.status(200).json(result);
        }        
      });
    }
  })
});


app.put("/subject/:id",(req,res, next)=> {

  mongo((e,d)=>{
    if(e) {
      next(e)
    } else {
      d.collection("subject").updateOne({"_id" : new ObjectId(req.params.id)}, { $set: req.body}, function(err, result) {
        if (err){
          next(err)
        } else {
          res.status(200).json(result);
        }        
      });
    }
  })
});

app.delete("/subject/:id",(req,res, next)=> {

  mongo((e,d)=>{
    if(e) {
      next(e)
    } else {
      d.collection("subject").deleteOne({"_id" : new ObjectId(req.params.id)}, function(err, result) {
        if (err){
          next(err)
        } else {
          res.status(200).json(result);
        }        
      });
    }
  })

});

app.use(function (err, req, res, next) {
  res.status(500).json({
    message: err.message,
    name: err.name
  })
})

const PORT = process.env.PORT || 3000
const HOST = "http://0.0.0.0"

app.listen(PORT,()=>{
  console.log(`${require('./package.json').name} started on ${HOST}:${PORT}`)
})