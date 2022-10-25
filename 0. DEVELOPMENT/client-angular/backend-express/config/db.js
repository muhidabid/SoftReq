// Export mongoose
const  mongoose = require("mongoose");

//Assign MongoDB connection string to Uri and declare options settings
// var  uri = "mongodb+srv://user0:pass1234@softreq-main.beooq.mongodb.net/?retryWrites=true&w=majority"

// Declare a variable named option and assign optional settings
// const  options = {
// useNewUrlParser:  true,
// useUnifiedTopology:  true
// };

// // Connect MongoDB Atlas using mongoose connect method
// export const mongoose_inst = mongoose.connect(uri, options).then(() => {
// console.log("Database connection established!");
// },
// err  => {
// {
// console.log("Error connecting Database instance due to:", err);
// }
// });

const connectWithMongoDB = async () => {
    try {
      await mongoose
        .connect(
          // "mongodb+srv://user0:pass1234@softreq-main.beooq.mongodb.net/SoftReq?retryWrites=true&w=majority", // mongodb atlas string
          "mongodb://localhost:27017/SoftReq", //local mongodb compass string
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        )
        .then(console.log("Database Connected"));
    } catch (error) {
      console.error
    }
};

// exports.connectWithMongoDB = connectWithMongoDB;
module.exports = connectWithMongoDB;
