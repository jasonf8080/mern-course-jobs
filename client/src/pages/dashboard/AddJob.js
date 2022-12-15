import React from 'react'
import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext, useGlobalContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";


const AddJob = () => {
  const {
    
    showAlert,
    displayAlert,
    position, 
    company, 
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing, 
    handleChange,
    clearValues,
    isLoading,
    createJob,
    editJob
  } = useGlobalContext();

 

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({name, value})
   
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if(!position || !company || !jobLocation){
      displayAlert();
      return
    }

    if(isEditing){
      editJob();
      return
    }

    createJob();
  }


  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        {showAlert && <Alert/>}
        <div className="form-center">
          <FormRow type='text' name='position' value={position} handleChange={handleJobInput}></FormRow>
          <FormRow type='text' name='company' value={company} handleChange={handleJobInput}></FormRow>
          <FormRow type='text' name='jobLocation' labelText='Job Location' value={jobLocation} handleChange={handleJobInput}></FormRow>

         <FormRowSelect name='status' value={status} handleChange={handleJobInput} list={jobTypeOptions}></FormRowSelect>
         <FormRowSelect name='jobType' value={jobType} handleChange={handleJobInput} list={statusOptions}></FormRowSelect>
          

          <div className="btn-container">
            <button type='submit' className='btn btn-block submit-btn' disabled={isLoading} onClick={handleSubmit}>Submit</button>
            <button className="btn btn-block clear-btn" onClick={(e) => {
              e.preventDefault();
              clearValues();
            }}>Clear</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
