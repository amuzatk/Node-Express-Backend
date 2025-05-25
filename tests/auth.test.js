const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");

jest.setTimeout(30000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth Routes", () => {
  test("should return 404 on GET /api/v1/auth/invalid-route", async () => {
    const res = await request(app).get("/api/v1/auth/invalid-route");
    expect(res.statusCode).toBe(404);
  });

  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/v1/auth/register").send({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("token");
    });

    it("should fail if email is missing", async () => {
      const res = await request(app).post("/api/v1/auth/register").send({
        name: "Jane",
        password: "password123",
      });
      expect(res.statusCode).toBe(400);
    });

    it("should fail if email is already taken", async () => {
      await request(app).post("/api/v1/auth/register").send({
        name: "John",
        email: "john@example.com",
        password: "password123",
      });

      const res = await request(app).post("/api/v1/auth/register").send({
        name: "John",
        email: "john@example.com",
        password: "password123",
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      await request(app).post("/api/v1/auth/register").send({
        name: "Login User",
        email: "login@example.com",
        password: "password123",
      });
    });

    it("should log in with correct credentials", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "login@example.com",
        password: "password123",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should fail with wrong password", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "login@example.com",
        password: "wrongpassword",
      });
      expect(res.statusCode).toBe(401);
    });

    it("should fail with unregistered email", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "notfound@example.com",
        password: "password123",
      });
      expect(res.statusCode).toBe(401);
    });
  });
});






// // tests/auth.test.js
// jest.setTimeout(30000); // 30 seconds

// const mongoose = require("mongoose");
// const request = require("supertest");
// const app = require("../app"); // or your express app

// describe("Auth Routes", () => {
//   beforeAll(async () => {
//     await mongoose.connect(process.env.MONGO_URI_TEST);
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   test("should return 404 on GET /api/v1/auth/invalid-route", async () => {
//     const res = await request(app).get("/api/v1/auth/invalid-route");
//     expect(res.statusCode).toBe(404);
//   });
// });