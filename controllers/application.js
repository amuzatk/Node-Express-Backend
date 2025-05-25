const Application = require('../models/Applications');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors')

const createApplication = async (req, res) => {
  const { jobId, coverLetter } = req.body;
  const applicantId = req.user.userId;

  const existingApplication = await Application.findOne({ jobId, applicantId });

  if (existingApplication) {
    throw new BadRequestError('You have already applied for this job');
  }

  const newApplication = new Application({
    jobId,
    applicantId,
    coverLetter,
  });

  await newApplication.save();
  res.status(StatusCodes.CREATED).json({
    msg: 'Application Submitted Successfully',
    data: newApplication,
  });
};

// const createApplication = async (req,res)=>{
//     const {jobId, applicantId, coverLetter} = req.body;

//     const existingApplication = await Application.findOne({jobId, applicantId});

//     if(existingApplication){
//         throw new BadRequestError('You have already applied for this job');
//     }

//     const newApplication = new Application({
//         ...req.body,
//         // createdBy: req.user.userId//req.user is within the auth middleware
//     })

//     await newApplication.save();
//     res.status(StatusCodes.CREATED).json({msg:'Application Submitted Successfully', data: newApplication})
// }

const getApplicationsByJob = async (req,res)=>{
    const { jobId } = req.params;

    const applications = await Application.find({jobId}).populate('applicantId', 'email name')
    res.status(StatusCodes.OK).json({msg:'Applied Jobs Fetched Successfully', data:applications, count:applications.length})
}

const getApplicationsByUser = async (req,res)=>{
    const {user:{userId}} = req;
    const userApplications = await Application.find({applicantId: userId}).populate('jobId');
    // const userApplications = await Application.find({applicantId: userId}).populate('jobId', 'company position');
    res.status(StatusCodes.OK).json({msg:'User Applications Fetched Successfully', data:userApplications, count:userApplications.length})
}

module.exports = {
    createApplication,
    getApplicationsByJob,
    getApplicationsByUser,
}