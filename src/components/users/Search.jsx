import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ setAlert, clearUsers, showClear }) => {
  const [text, setText] = useState('')

  const onChange = e => setText(e.target.value)

  const onSubmit = e => {
    e.preventDefault()
    if (!text) setAlert('Please enter something', 'light')
    else {
      searchUsers(text)
      setText('')
    }
  }

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          autoComplete="off"
          placeholder="Search users..."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button
          type="button"
          className="btn btn-light btn-block"
          onClick={clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  )
}

Search.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
}

export default Search
