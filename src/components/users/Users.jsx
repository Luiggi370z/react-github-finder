import React, { useContext } from 'react'

import Spinner from 'components/layout/Spinner'
import GithubContext from 'context/github/githubContext'
import UserItem from './UserItem'

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
}

const Users = () => {
  const githubContext = useContext(GithubContext)
  const { loading, users } = githubContext

  return loading ? (
    <Spinner />
  ) : (
    <div style={userStyle}>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  )
}

export default Users
