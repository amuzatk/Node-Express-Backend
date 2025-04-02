const express = require("express");
const router = express.Router();

const {createJob, getJob, getJobs, updateJob, deleteJob} = require("../controllers/jobs");

router.route("/").post(createJob).get(getJobs);
router.route("/:id").delete(deleteJob).patch(updateJob).get(getJob);

module.exports = router;
