const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('./mongo-db.js');
const routes = require('./routes/routes.js')

const app = express();

//connecting to mongodb
const dbURI = 'mongodb+srv://user0:pass1234@softreq-main.beooq.mongodb.net/?retryWrites=true&w=majority'

app.use(bodyParser.json());

app.use(cors({origin: 'http://localhost:4200'}))

app.listen(3000, () => console.log('Server started at port: 3000'))

app.use('/cars', routes);