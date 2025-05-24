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
 *
 *   get:
 *     summary: Get all jobs for the logged-in user
 *     tags: [Jobs]
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
 */

const express = require("express");
const router = express.Router();

const {createJob, getJob, getJobs, updateJob, deleteJob} = require("../controllers/jobs");

router.route("/").post(createJob).get(getJobs);
router.route("/:id").delete(deleteJob).patch(updateJob).get(getJob);

module.exports = router;
