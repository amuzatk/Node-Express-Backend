// /jobs/test.js
const request = require("supertest");
const app = require("../app");
const { connect, clearDatabase, closeDatabase } = require("./setupTestDB");

jest.setTimeout(30000);

let token;

beforeAll(async () => {
  await connect();

  const res = await request(app).post("/api/v1/auth/register").send({
    name: "Job Tester",
    email: "job@test.com",
    password: "password123",
  });

  token = res.body.token;
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe("Jobs Routes", () => {
  let jobId;

  //   it("should create a new job", async () => {
  //     const res = await request(app)
  //       .post("/api/v1/jobs")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({
  //         company: "Test Company",
  //         position: "Developer",
  //       });

  //     console.log("Job creation response:", res.body);

  //     expect(res.statusCode).toBe(201);
  //     expect(res.body.job).toHaveProperty("_id");
  //     jobId = res.body.job._id;
  //   });

  it("should create a new job", async () => {
    const res = await request(app)
      .post("/api/v1/jobs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        company: "Test Company",
        position: "Developer",
      });

    console.log("Job creation response:", res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("_id");
    jobId = res.body.data._id;
  });

  it("should fetch all jobs for user", async () => {
    const res = await request(app)
      .get("/api/v1/jobs")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

//   it("should fetch a single job by ID", async () => {
//     const create = await request(app)
//       .post("/api/v1/jobs")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         company: "Another Co",
//         position: "Designer",
//       });

//     const job = create.body.data;

//     const res = await request(app)
//       .get(`/api/v1/jobs/${job._id}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.job.company).toBe("Another Co");
//   });


it("should fetch a single job by ID", async () => {
  const create = await request(app)
    .post("/api/v1/jobs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      company: "Another Co",
      position: "Designer",
    });

  const job = create.body.data;

  const res = await request(app)
    .get(`/api/v1/jobs/${job._id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.data.company).toBe("Another Co");
});


//   it("should update a job", async () => {
//     const create = await request(app)
//       .post("/api/v1/jobs")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         company: "Old Co",
//         position: "Old Role",
//       });

//     const res = await request(app)
//       .patch(`/api/v1/jobs/${create.body.job._id}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send({ company: "New Co" });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.job.company).toBe("New Co");
//   });

it("should update a job", async () => {
  const create = await request(app)
    .post("/api/v1/jobs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      company: "Old Co",
      position: "Old Role",
    });

  const jobId = create.body.data._id;

  const res = await request(app)
    .patch(`/api/v1/jobs/${jobId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({ company: "New Co" });

  expect(res.statusCode).toBe(200);
  expect(res.body.data.company).toBe("New Co");
});


//   it("should delete a job", async () => {
//     const create = await request(app)
//       .post("/api/v1/jobs")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         company: "Delete Me Inc",
//         position: "Temp",
//       });

//     const res = await request(app)
//       .delete(`/api/v1/jobs/${create.body.job._id}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.statusCode).toBe(200);
//   });

  it("should delete a job", async () => {
  const create = await request(app)
    .post("/api/v1/jobs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      company: "Delete Me Inc",
      position: "Temp",
    });

  const jobId = create.body.data._id;

  const res = await request(app)
    .delete(`/api/v1/jobs/${jobId}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
});

});
