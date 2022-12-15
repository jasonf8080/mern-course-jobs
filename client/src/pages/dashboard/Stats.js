import React from 'react'
import { useEffect } from 'react'
import { useGlobalContext } from '../../context/appContext'
import { StatsContainer, Loading, ChartsContainer } from '../../components'

const Stats = () => {

  const {showStats, isLoading, monthlyApplications} = useGlobalContext();

  useEffect(() => {
    showStats();
     // eslint-disable-next-line
  }, [])

  if(isLoading){
    return <Loading center></Loading>
  }

  return (
    <>
      <StatsContainer></StatsContainer>
      {monthlyApplications.length > 0 && <ChartsContainer></ChartsContainer>}
    </>
  )
}

export default Stats