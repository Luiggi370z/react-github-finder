import React, { useState, useContext } from 'react'
import GithubContext from 'context/github/githubContext'
import AlertContext from 'context/alert/alertContext'

const Search = () => {
  const githubContext = useContext(GithubContext)
  const { clearUsers, searchUsers, users } = githubContext

  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext

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
      {users.length > 0 && (
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

export default Search
