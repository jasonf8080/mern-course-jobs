import React from 'react'
import { useGlobalContext } from '../context/appContext'
import { AreaChartComponent } from './AreaChart'
import { BarChartComponent } from './BarChart'
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useState } from 'react';

export const ChartsContainer = () => {
    const [barChart, setBarChart] = useState(true);
    const {monthlyApplications: data} = useGlobalContext();

  return (
    <Wrapper>
        <h4>Monthly Applications</h4>
        <button type='button' onClick={() => setBarChart(!barChart)}>
            {barChart ? 'Area Chart' : 'Bar Chart'}
        </button>
        {barChart ? <BarChartComponent data={data}></BarChartComponent> : <AreaChartComponent data={data}></AreaChartComponent>}
    </Wrapper>
  )
}
