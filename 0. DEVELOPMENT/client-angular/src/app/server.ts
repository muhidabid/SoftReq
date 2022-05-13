import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

mongoose.connect('mongodb://localhost/angular8-crud', { useNewUrlParser: true, useFindAndModify: false })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var express = require('express');
// var path = require("path");
// var bodyParser = require('body-parser');
// var mongo = require("mongoose");

// var db = mongo.connect("mongodb://localhost:27017/AngularCRUD", function(err, response){
//   if(err){ console.log(err); }
//   else{ console.log('Connected to ' + db, ' + ', response); }
// });

// var app = express()
// app.use(bodyParser());
// app.use(bodyParser.json({limit:'5mb'}));
// app.use(bodyParser.urlencoded({extended:true}));

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// var Schema = mongo.Schema;

// var UsersSchema = new Schema({
//   name:
// })
