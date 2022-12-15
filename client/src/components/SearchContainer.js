import React from 'react'
import {FormRow, FormRowSelect} from '.'
import { useGlobalContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useState, useMemo } from 'react'

export const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');

  const {
    isLoading,
    search,
    searchStatus,
    searchType, 
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    jobTypeOptions,
    statusOptions,
  } = useGlobalContext();

  const handleSearch = (e) => {

    handleChange({name: e.target.name, value: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    clearFilters();
  }

  const debounce = () => {
    console.log('debounce');
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        handleChange({name: e.target.name, value: e.target.value});
      }, 1000)
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), [])
  return (
    <Wrapper>
      <form className="form">
        <h4>Search Form</h4>

        <div className="form-center">
          <FormRow type={'text'} name={'search'} value={localSearch} handleChange={optimizedDebounce}></FormRow>
          <FormRowSelect labelText={'status'} name={'searchStatus'} value={searchStatus} handleChange={handleSearch} list={['all',...statusOptions]}></FormRowSelect>
          <FormRowSelect labelText={'job type'} name={'searchType'} value={searchType} handleChange={handleSearch} list={['all',...jobTypeOptions]}></FormRowSelect>
          <FormRowSelect name={'sort'} value={sort} handleChange={handleSearch} list={['all',...sortOptions]}></FormRowSelect>

          <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>Clear Filters</button>
        </div>
      </form>
    </Wrapper>
  )
}
