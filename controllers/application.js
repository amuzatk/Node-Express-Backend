const Application = require('../models/Applications');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors')

const createApplication = async (req,res)=>{
    const {jobId, applicantId, coverLetter} = req.body;

    const existingApplication = await Application.findOne({jobId, applicantId});

    if(existingApplication){
        throw new BadRequestError('You have already applied for this job');
    }

    const newApplication = new Application({
        ...req.body,
        // createdBy: req.user.userId//req.user is within the auth middleware
    })

    await newApplication.save();
    res.status(StatusCodes.CREATED).json({msg:'Application Submitted Successfully', data: newApplication})
}

const getApplicationsByJob = async (req,res)=>{
    const { jobId } = req.params;

    const applications = await Application.find({_id: jobId}).populate('applicantId', 'email name')
    res.status(StatusCodes.OK).json({msg:'Applied Jobs Fetched Successfully', data:applications})
}

const getApplicationsByUser = async (req,res)=>{
    const {user:{userId}} = req;

    const userApplications = await Application.find({applicantId: userId}).populate('jobId', 'company position');
    // if(!job){
    //     throw new NotFoundError(`No job with id ${jobId}`)
    // }
    res.status(StatusCodes.OK).json({msg:'User Applications Fetched Successfully', data:userApplications})
}

module.exports = {
    createApplication,
    getApplicationsByJob,
    getApplicationsByUser,
}