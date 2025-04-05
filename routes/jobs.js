/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management routes
 */

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - position
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created
 *
 *   get:
 *     summary: Get all jobs for the logged-in user
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of jobs
 */

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a specific job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Job found
 *       404:
 *         description: Job not found
 *
 *   patch:
 *     summary: Update a job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job updated
 *
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Job deleted
 */

const express = require("express");
const router = express.Router();

const {createJob, getJob, getJobs, updateJob, deleteJob} = require("../controllers/jobs");

router.route("/").post(createJob).get(getJobs);
router.route("/:id").delete(deleteJob).patch(updateJob).get(getJob);

module.exports = router;
