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

app.get("/student/prop",(req,res)=> {
    res.json([])
})

app.post("/student",async (req,res,next)=> {
  mongo((e,d)=>{
    if(e) {
      next(e)
    } else {
      d.collection("student").insertOne(req.body,(err,result) => {
        if (err){
          next(err)
        } else {
          res.status(200).json(result);
        }        
      });
    }
  })
  
});

app.get("/student",(req,res,next)=> {
  mongo((e,d)=>{
    if(e) {
      next(e)
    } else {
      d.collection("student").find().toArray(function (err, result) {
        if (err){
          next(err)
        } else {
          res.status(200).json(result);
        }        
      });
    }
  })
});

app.get("/student/:id",(req,res,next)=> {
  mongo((e,d)=>{
    if(e) {
      next(e)
    } else {
      d.collection("student").findOne({"_id": new ObjectId(req.params.id)},function (err, result) {
        if (err){
          next(err)
        } else {
          res.status(200).json(result);
        }        
      });
    }
  })
});

app.put("/student/:id",(req,res,next)=> {
  mongo((e,d)=>{
    if(e) {
      next(e)
    } else {
      d.collection("student").updateOne({"_id" : new ObjectId(req.params.id)}, { $set: req.body}, function(err, result) {
        if (err){
          next(err)
        } else {
          res.status(200).json(result);
        }        
      });
    }
  })

});

app.delete("/student/:id",(req,res,next)=> {
  mongo((e,d)=>{
    if(e) {
      next(e)
    } else {
      d.collection("student").deleteOne({"_id" : new ObjectId(req.params.id)}, function(err, result) {
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
