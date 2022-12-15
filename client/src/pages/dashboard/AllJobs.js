import React from 'react'
import { useGlobalContext } from '../../context/appContext'
import { JobsContainer, SearchContainer } from '../../components';



const AllJobs = () => {
  const {} = useGlobalContext();

  return (
    <>
      <SearchContainer></SearchContainer>
      <JobsContainer></JobsContainer>
    </>
  )
}

export default AllJobs