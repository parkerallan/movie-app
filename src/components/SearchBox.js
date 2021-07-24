import React from 'react'

const SearchBox = ({ value, setSearchValue }) => {
  return (
    <div className='col col-sm-4'>
      <input 
      className='form-control' 
      value={value}
      onChange={(event) => setSearchValue(event.target.value)}
      placeholder='Search'
      ></input>
    </div>
  )
}

export default SearchBox 
