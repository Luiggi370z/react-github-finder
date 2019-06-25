import React, { useContext, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from 'components/layout/Spinner'
import Repos from 'components/repos/Repos'
import GithubContext from 'context/github/githubContext'

const User = ({ match }) => {
  const githubContext = useContext(GithubContext)
  const {
    getUser,
    getUserRepos,
    repos,
    loading,
    user: {
      name,
      avatar_url: avatarUrl,
      location,
      company,
      bio,
      blog,
      login,
      html_url: htmlUrl,
      followers,
      following,
      public_repos: publicRepos,
      public_gists: publicGists,
      hireable,
    },
  } = githubContext

  useEffect(() => {
    getUser(match.params.login)
    getUserRepos(match.params.login)
    // eslint-disable-next-line
  }, [])

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Go back
      </Link>
      Hireable:
      <i
        className={`fas ${
          hireable ? 'fa-check text-success' : 'fa-times-circle text-danger'
        }`}
      />
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatarUrl}
            className="round-img"
            alt=""
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>
            <span>Location: </span>
            {location}
          </p>
        </div>
        {bio && (
          <Fragment>
            <h3>Bio</h3>
            <p>{bio}</p>
          </Fragment>
        )}
        <a href={htmlUrl} className="btn btn-dark my-1">
          Visit Github Profile
        </a>
        <ul>
          <li>
            {login && (
              <Fragment>
                <strong>Username: </strong>
                {login}
              </Fragment>
            )}
          </li>
          <li>
            {company && (
              <Fragment>
                <strong>Company: </strong>
                {company}
              </Fragment>
            )}
          </li>
          <li>
            {blog && (
              <Fragment>
                <strong>Website: </strong>
                {blog}
              </Fragment>
            )}
          </li>
        </ul>
      </div>
      <div className="card text-center">
        <span className="badge badge-primary">
          <span>Followers: </span>
          {followers}
        </span>
        <span className="badge badge-success">
          <span>Following: </span>
          {following}
        </span>
        <span className="badge badge-light">
          <span>Public Repos: </span>
          {publicRepos}
        </span>
        <span className="badge badge-dark">
          <span>Public Gists: </span>
          {publicGists}
        </span>
      </div>
      <Repos repos={repos} />
    </Fragment>
  )
}

User.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
}

export default User
