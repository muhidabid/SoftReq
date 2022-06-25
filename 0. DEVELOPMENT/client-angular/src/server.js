// 'use strict'

// // require express and bodyParser
// const  express = require("express");
// const  bodyParser = require("body-parser");

// // Import DB Connection
// require("./config/db");

// // Import API route
// var routes = require('./api/routes/todoRoutes'); //importing route
// routes(app);

// // create express app
// const  app = express();

// // define port to run express app
// const  port = process.env.PORT || 3000;

// // use bodyParser middleware on express app
// app.use(bodyParser.urlencoded({ extended:true }));
// app.use(bodyParser.json());

// // Add endpoint
// app.get('/', (req, res) => {
// res.send("Hello World");
// });

// // Listen to server
// app.listen(port, () => {

// console.log(`Server running at http://localhost:${port}`);
// });

'use strict'


// require express and bodyParser
const  express = require("express");
const  bodyParser = require("body-parser");

const {connectWithMongoDB} = require("../backend-express/config/db.js")

// const workspacemodel = require("../backend-express/api/models/workspace-model.js");
const workspaceModel = require("../backend-express/api/models/workspace-model.js");



// create express app
const  app = express();

// define port to run express app
const  port = process.env.PORT || 3000;

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

// Add endpoint
app.get('/', (req, res) => {

    workspaceModel.find(function (err, workspaceModels) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting Workspaec.',
                error: err
            });
        }

        return res.json(workspaceModels);
    });
});


// Listen to server

connectWithMongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost: ${port}`);
    });

    const newModel = new workspaceModel({
        name: 'Test999',
        description: 'SOmething even longer here'
    });

    // newModel.save();
})






// Import DB Connection
// require("../backend-express/config/db.js");

// Import API route
// var routes = require('../backend-express/api/routes/workspace-routes.js'); //importing route

console.log('SOMETHING WORKS HERE');

// routes(app);
