// Line 1–4 helps us use the packages we imported
var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");

//Next we instantiate a MongoDB database locally in lines 5–9, wherein in case of an error and the DB being unable to connect we throw the error to the user
var db = mongo.connect("mongodb://localhost:27017/AngularCRUD", function(err, response){
  if(err){ console.log(err); }
  else{ console.log('Connected to ' + db, ' + ', response); }
});

var app = express()
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {
  //allows us to define the website we wish to connect to, which in our case is http://localhost:4200.
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  // helps us define the request methods we wish to allow in our code.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // defines the request headers we wish to allow.
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // allows the website to include cookies in the request sent to the API.
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// Following lines help us define our database schema:
var Schema = mongo.Schema;

var UserSchema = new Schema({
  name: { type: String },
  address: { type: String },
},{ versionKey: false });

var model = mongo.model('users', UserSchema, 'users');

app.post("/api/SaveUser", function(req,res){
  var mod = new model(req.body);
  if(req.body.mode == "Save"){
    mod.save(function(err,data){
      if(err){
        res.send(err);
      }
      else{
        res.send({data:"Record has been inserted..."});
      }
    });
  }
  else{
    model.findByIdAndUpdate(req.body.id, {name: req.body.name, address: req.body.address},
      function(err,data){
        if(err){
          res.send(err);
        }
        else{
          res.send({data:"Record has been updated..."});
        }
      });
  }
})

app.post("/api/deleteUser", function(req,res){
  model.remove({_id: req.body.id}, function(err){
    if(err){
      res.send(err);
    }
    else{
      res.send({data: "Record has been deleted..."});
    }
  });
})
