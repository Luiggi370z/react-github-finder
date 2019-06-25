import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserItem = ({
  user: { avatar_url: avatarUrl, login, html_url: htmlUrl },
}) => (
  <div className="card text-center">
    <img
      src={avatarUrl}
      alt=""
      className="round-img"
      style={{ width: '60px' }}
    />
    <h3>{login}</h3>
    <Link to={`/user/${login}`} className="btn btn-dark btn-sm">
      More
    </Link>
  </div>
)

UserItem.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string,
    avatar_url: PropTypes.string,
    html_url: PropTypes.string,
  }).isRequired,
}

export default UserItem
