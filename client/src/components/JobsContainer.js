import React from 'react'
import { useEffect } from 'react'
import { Loading } from './Loading'
import { Job } from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useGlobalContext } from '../context/appContext'
import { PageBtnContainer } from './PageBtnContainer'

export const JobsContainer = () => {
    const {getAllJobs, jobs, isLoading, page, totalJobs, search, searchStatus, searchType, sort, numOfPages} = useGlobalContext();

    useEffect(() => {
        getAllJobs();
        // eslint-disable-next-line
    }, [page, search, searchStatus, searchType, sort])

    if(isLoading){
        return <Loading center={true}></Loading>
    }

    if(jobs.length === 0){
        return <Wrapper>
            <h2>No Jobs to display...</h2>
        </Wrapper>
    }

  return (
        <Wrapper>
            <h5>{totalJobs} job{totalJobs > 1 && `s`}</h5>

            <div className="jobs">
                {jobs.map((item) => {
                    return <Job key={item._id} {...item}></Job>
                })}
            </div>

            {numOfPages > 1 && <PageBtnContainer></PageBtnContainer>}
        </Wrapper>

  )
}
