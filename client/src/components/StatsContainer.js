import React from 'react'
import { StatItem } from './StatItem'
import { useGlobalContext } from '../context/appContext'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'

export const StatsContainer = () => {

    const {stats} = useGlobalContext();

    const defaultStats = [
        {
            title: 'future interviews',
            count: stats.interview || 0,
            icon: <FaSuitcaseRolling/>,
            color: '#e9b949',
            bcg: '#fcefc7'
        },

        {
            title: 'pending applications',
            count: stats.pending || 0,
            icon: <FaCalendarCheck/>,
            color: '#e9b949',
            bcg: '#fcefc7'
        },

        {
            title: 'jobs declined',
            count: stats.declined || 0,
            icon: <FaBug/>,
            color: '#e9b949',
            bcg: '#fcefc7'
        }
    ]

  return (
    <Wrapper>
        {defaultStats.map((item, index) => {
            return <StatItem key={index} {...item}/>
        })}
    </Wrapper>
  )
}
