/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Jobs application management routes
 */

/**
 * @swagger
 * /application:
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
 *     responses:
 *       201:
 *         description: Job application created successfully
 */

/**
 * @swagger
 * /job/{id}:
 *   get:
 *     summary: Get all applications to a specific job
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Application found
 *       404:
 *         description: Application not found
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
