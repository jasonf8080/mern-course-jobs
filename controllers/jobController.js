import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import {BadRequestError, NotFoundError, UnAuthenticatedError} from "../errors/index.js";
import { checkPermissions } from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from 'moment'

const createJob = async(req, res) => {
    const {position, company} = req.body;

    if(!position || !company){
        throw new BadRequestError('Please provide the values of company and position')
    }

    req.body.createdBy = req.user.userID;
    console.log(company)

    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job})
}

const deleteJob = async(req, res) => {
    const {id: jobID} = req.params;

    const job = await Job.findOne({_id: jobID});
    if(!job){
        throw new NotFoundError('No item with this id is found')
    }

    checkPermissions(req.user, job.createdBy);

    await job.remove();

    res.status(StatusCodes.OK).json({msg: 'Job has been deleted!'})
}


const getAllJobs = async(req, res) => {


  //Filters
 const { status, jobType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userID,
  };



  if (status && status !== 'all') {
    queryObject.status = status;
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }



  let result = Job.find(queryObject);

  //Sort
  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('-position');
  }


  //Pagination
  const page = Number(req.query.page) || 1; //Current Page
  const limit = Number(req.query.limit) || 10; //Items Per Page
  const skip = (page - 1) * limit; //Start value for the page



  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit)

   res.status(StatusCodes.OK).json({jobs, totalJobs, numOfPages})
}


const updateJob = async(req, res) => {
    const {id: jobID} = req.params;
    const {company, position, jobLocation} = req.body;



    if(!company || !position){
        throw new BadRequestError('Please provide all inputs')
    };

    const job = await Job.findOne({_id: jobID});
    if(!job){
        throw new NotFoundError('Unable to find job!');
    }

    checkPermissions(req.user, job.createdBy)

    job.position = position;
    job.company = company;
    job.jobLocation = jobLocation
   
    await job.save()

    
    res.status(StatusCodes.OK).json({job})
}


const showStats = async(req, res) => {
    let stats = await Job.aggregate([
       { $match: {createdBy: mongoose.Types.ObjectId(req.user.userID)}},
       { $group: { _id: '$status', count:{$sum: 1}}}
    ])

    stats = stats.reduce((acc, curr) => {
        const {_id: title, count} = curr;
        acc[title] = count;
        return acc 
    }, {})


    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }

    let monthlyApplications = await Job.aggregate([
        {$match: {createdBy: mongoose.Types.ObjectId(req.user.userID)}},
        {$group: 
            {_id: {year: {$year: `$createdAt`}, month: {$month: `$createdAt`}}, 
            count: {$sum: 1}
          }
        },
        {$sort:{'_id.year': -1, '_id.month': -1}},
        {$limit: 6}

    ])

    monthlyApplications = monthlyApplications.map((item) => {
        const {_id:{year, month}, count} = item;

        const date = moment().month(month - 1).year(year).format('MMM Y');

        return {date, count}
    }).reverse();

    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})
}


export {createJob, deleteJob, getAllJobs, updateJob, showStats}