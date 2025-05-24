const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors')

const createJob = async (req,res)=>{
    const newJob = await Job.create({
        ...req.body,
        createdBy: req.user.userId//req.user is within the auth middleware
    })
    res.status(StatusCodes.CREATED).json({msg:'Job Created Successfully', data: newJob})
}

const getJobs = async (req,res)=>{//fetch jobs of a user
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({msg:'User Jobs Fetched Successfully', data: jobs, count: jobs.length})
}

const getJob = async (req,res)=>{
    const {user:{userId}, params:{id:jobId}} = req;

    const job = await Job.findOne({_id: jobId, createdBy: userId});
    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({msg:'Job Fetched Successfully', data:job})
}

const deleteJob = async (req,res)=>{
    const {user:{userId}, params:{id:jobId}} = req;

    const job = await Job.findByIdAndDelete({_id: jobId, createdBy: userId});
    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({msg:'Job Updated Successfully', data:job})
}

const updateJob = async (req,res)=>{
    const {
        body: {company, position},
        user:{userId},
        params:{id:jobId}
    } = req;

    if(company === '' || position === ''){
        throw new BadRequestError('Company or Position field cannot be empty');
    }

    const job = await Job.findOneAndUpdate({_id: jobId, createdBy: userId}, req.body, {new: true, runValidators:true});
    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({msg:'Job Updated Successfully', data:job})
}

module.exports = {createJob, getJobs, getJob,deleteJob,updateJob}