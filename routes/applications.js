/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Jobs application management routes
 */

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Create a new application
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobId
 *               - applicantId
 *             properties:
 *               jobId:
 *                 type: string
 *               applicantId:
 *                 type: string
 */

/**
 * @swagger
 * /applications/user/{userId}:
 *   get:
 *     summary: Get all applications by a specific user
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 */

/**
 * @swagger
 * /applications/job/{id}:
 *   get:
 *     summary: Get all applications to a specific job
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: trueZ
 */

const express = require("express");
const router = express.Router();

const {createApplication,
    getApplicationsByJob,
    getApplicationsByUser} = require("../controllers/application");

router.route("/").post(createApplication);
router.route("/job/:jobId").get(getApplicationsByJob);
router.route("/user/:userId").get(getApplicationsByUser);

module.exports = router;