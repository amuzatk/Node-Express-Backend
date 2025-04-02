const mongoose = require("mongoose");

const connectDB = async (url)=>{
    try {
       const conn = await mongoose.connect(url);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);//exit with failure
    }
}

module.exports = connectDB;



// const mongoose = require('mongoose')

// const connectDB = (url) => {
//   return mongoose.connect(url
//   //   , {
//   //   useNewUrlParser: true,
//   //   useCreateIndex: true,
//   //   useFindAndModify: false,
//   //   useUnifiedTopology: true,
//   // }
// )
// }

// module.exports = connectDB
