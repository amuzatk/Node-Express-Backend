//REQUIRES PRODUCTION PAYMENT
require('dotenv').config();
require('express-async-errors');
const setupSwagger = require("./swagger");

// extra security packages
const helmet = require('helmet');// Helmet enhances security by setting various HTTP headers to prevent common web vulnerabilities.
const cors = require('cors');
const xss = require('xss-clean');//Prevents cross-site scripting (XSS) attacks by sanitizing user input
const rateLimiter = require('express-rate-limit');//Prevents brute-force attacks and DoS (Denial of Service) by limiting request rates

const express = require('express');
const app = express();

// middleware, routes, db, etc.
setupSwagger(app); // enable swagger at /api-docs
//DB Connection
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');
//routers
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const applicationRoutes = require("./routes/applications");
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Updated with Application module1</a>');
});

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs",authenticateUser, jobRoutes);
app.use("/api/v1/applications",authenticateUser, applicationRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// At the bottom of app.js
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;

  const start = async () => {
    try {
      await connectDB();  // now loads URI based on NODE_ENV
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  start();
}

module.exports = app; // Export app for testing






// require('dotenv').config();
// require('express-async-errors');
// const setupSwagger = require("./swagger");

// // extra security packages
// const helmet = require('helmet');// Helmet enhances security by setting various HTTP headers to prevent common web vulnerabilities.
// const cors = require('cors');
// const xss = require('xss-clean');//Prevents cross-site scripting (XSS) attacks by sanitizing user input
// const rateLimiter = require('express-rate-limit');//Prevents brute-force attacks and DoS (Denial of Service) by limiting request rates

// const express = require('express');
// const app = express();

// // middleware, routes, db, etc.
// setupSwagger(app); // enable swagger at /api-docs
// //DB Connection
// const connectDB = require('./db/connect');
// const authenticateUser = require('./middleware/authentication');
// //routers
// const authRoutes = require("./routes/auth");
// const jobRoutes = require("./routes/jobs");
// const applicationRoutes = require("./routes/applications");
// // error handler
// const notFoundMiddleware = require('./middleware/not-found');
// const errorHandlerMiddleware = require('./middleware/error-handler');

// app.set('trust proxy', 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// );
// app.use(express.json());
// app.use(helmet());
// app.use(cors());
// app.use(xss());

// app.get('/', (req, res) => {
//   res.send('<h1>Jobs API</h1><a href="/api-docs">Updated with Application module1</a>');
// });

// //routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/jobs",authenticateUser, jobRoutes);
// app.use("/api/v1/applications",authenticateUser, applicationRoutes);

// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

// const port = process.env.PORT || 3000;

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     app.listen(port, () => {
//       console.log(`Server is listening on port ${port}...`);
//       console.log("Swagger docs available at http://localhost:3000/api-docs");
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };


// start();