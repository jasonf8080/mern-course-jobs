import React from 'react'

export const FormRowSelect = ({labelText, name, value, handleChange, list}) => {
  return (
     <div className="form-row">
          <label htmlFor={labelText || name} className='form-label'>{name}</label>

          <select name={name} value={value} onChange={handleChange} className='form-select'>
            {list.map((item, index) => {
              return <option key={index} value={item}>{item}</option>
            })}
          </select>
    </div>
  )
}
