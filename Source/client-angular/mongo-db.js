const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://user0:pass1234@softreq-main.beooq.mongodb.net/SoftReq_DB?retryWrites=true&w=majority'

// mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => console.log('connected to DB'))
//     .catch((err) => console.log(err));

mongoose.connect(dbURI, (err)=>{
    if (!err){
        console.log('DB Connection Successful')
    }
    else {
        console.log('Error in DB Connection', + err)
    }
})

module.exports = mongoose;
