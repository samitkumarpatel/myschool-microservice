var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var MongoClient = require('mongodb').MongoClient
var cors = require('cors')
var ObjectId = require('mongodb').ObjectID;

var application = {
    "port": 3001,
    "mongo" : {
        "address": "mongodb://localhost:27017",
        "db": "schools",
        "collection": "subject"
    }
}

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride())


app.get("/subject/prop",(req,res)=> {
    properties= [
        {'name':'Subject Name','modalName':'name','inputType':'text'},
        {'name':'Language','modalName':'language','inputType':'text'},
        {'name':'Description','modalName':'desc','inputType':'text'},
        {'name':'Category','modalName':'category','inputType':'text'}
    ]
    res.json(properties)
})

app.post("/subject",async (req,res)=> {
  
  MongoClient.connect(application.mongo.address,{ useNewUrlParser: true }, function (err, client) {
    if (err) 
      res.status(500).json({'error':err})
    var db = client.db(application.mongo.db)
    db.collection(application.mongo.collection).insertOne(req.body,(err,result) => {
      if (err) 
        res.status(500).json({'error':err})
      res.status(200).json(result);
    });
  });
});

app.get("/subject",(req,res)=> {
  MongoClient.connect(application.mongo.address,{ useNewUrlParser: true }, function (err, client) {
    if (err) 
      res.status(500).json({'error':err})
    var db = client.db(application.mongo.db)
    db.collection(application.mongo.collection).find().toArray(function (err, result) {
      if (err) 
        res.status(500).json({'error':err})
      res.status(200).json(result);
    });
  });
});

app.get("/subject/:id",(req,res)=> {
  if(req.params.id!=undefined && req.params.id.length < 24) {
    res.status(500).json({'error': 'not a valid Id'})
    return null;
  }
  MongoClient.connect(application.mongo.address,{ useNewUrlParser: true }, function (err, client) {
    if (err) 
      res.status(500).json({'error':err})
    var db = client.db(application.mongo.db)
    db.collection(application.mongo.collection).findOne({"_id": new ObjectId(req.params.id)},function (err, result) {
      if (err) res.status(500).json({'error':err})
      res.status(200).json(result);
    });
  });
});

app.put("/subject/:id",(req,res)=> {
  if(req.params.id!=undefined && req.params.id.length < 24) {
    res.status(500).json({'error': 'not a valid Id'})
    return null;
  }
  MongoClient.connect(application.mongo.address,{ useNewUrlParser: true }, function (err, client) {
    if (err) 
      res.status(500).json({'error':err})
    var db = client.db(application.mongo.db)
    //update
    db.collection(application.mongo.collection).updateOne({"_id" : new ObjectId(req.params.id)}, { $set: req.body}, function(err, result) {
      if (err) 
        res.status(500).json({'error':err})
      res.status(200).json(result);
    });
  });
});

app.delete("/subject/:id",(req,res)=> {
  if(req.params.id!=undefined && req.params.id.length < 24) {
    res.status(500).json({'error': 'not a valid Id'})
    return null;
  } 
  MongoClient.connect(application.mongo.address,{ useNewUrlParser: true }, function (err, client) {
    if (err) 
      res.status(500).json({'error':err})
    var db = client.db(application.mongo.db)
    db.collection(application.mongo.collection).deleteOne({"_id" : new ObjectId(req.params.id)}, function(err, result) {
      if (err) 
        res.status(500).json({'error':err})
      res.status(200).json(result);
    });
  });
});

app.listen(application.port,()=>{
  console.log('SERVER STARTED on %s',application.port)
})