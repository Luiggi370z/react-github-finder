import React from 'react'
import PropTypes from 'prop-types'

import Spinner from 'components/layout/Spinner'
import UserItem from './UserItem'

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
}

const Users = ({ users, loading }) =>
  loading ? (
    <Spinner />
  ) : (
    <div style={userStyle}>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  )

Users.defaultProps = {
  loading: false,
}

Users.propTypes = {
  users: PropTypes.arrayOf(Object).isRequired,
  loading: PropTypes.bool,
}

export default Users
