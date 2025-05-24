// tests/runTests.js
require('dotenv').config(); // loads .env.test when run via dotenv-cli
const connectDB = require('../db/connect');

const runTests = async () => {
  try {
    await connectDB();
    console.log("Running tests...");
    // here you'd run your actual tests (e.g., using Mocha, Jest, etc.)
    
    // Simulate test
    console.log("✅ Sample test passed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Test failed", error);
    process.exit(1);
  }
};

runTests();