import React from 'react'
import moment from 'moment'
import { FaLocationArrow, FaBriefCase, FaCalendarAlt, FaCalculator } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Job';
import { JobInfo } from './JobInfo';

export const Job = ({company, createdAt, _id, position, jobLocation, jobType, status}) => {

    const {setEditJob, deleteJob} = useGlobalContext();

    let date = moment(createdAt);
    date = date.format('MMM Do, YYYY');

    return (
       <Wrapper>
        <header>
            <div className="main-icon">{company.charAt(0)}</div>
            <div className="info">
                <h5>{position}</h5>
                <p>{company}</p>
            </div>
        </header>

            <div className="content">
                <div className="content-center">
                    <JobInfo icon={<FaLocationArrow/>} text={jobLocation}></JobInfo>
                    <JobInfo icon={<FaCalendarAlt/>} text={date}></JobInfo>
                    <JobInfo icon={<FaCalculator/>} text={jobType}></JobInfo>
                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className="actions">
                        <Link to='/add-job' className='btn edit-btn' onClick={() => setEditJob(_id)}>Edit</Link>
                        <button type='button' className='btn delete-btn' onClick={() => deleteJob(_id)}>Delete</button>
                    </div>
                </footer>
            </div>
        
       </Wrapper>
    )
}
