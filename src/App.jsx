import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import Navbar from 'components/layout/Navbar'
import Users from 'components/users/Users'
import User from 'components/users/User'
import Search from 'components/users/Search'
import Alert from 'components/layout/Alert'
import About from 'components/pages/About'
import GithubState from 'context/github/GithubState'

const apiRoot = 'https://api.github.com'

const authParams = `client_id=${
  process.env.REACT_APP_GITHUB_CLIENT_ID
}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const getUser = async username => {
    setLoading(true)

    const res = await axios.get(`${apiRoot}/users/${username}?${authParams}`)

    setUser(res.data)
    setLoading(false)
  }

  const getUserRepos = async username => {
    setLoading(true)

    const res = await axios.get(
      `${apiRoot}/users/${username}/repos?per_page=5&sort=created:asc&${authParams}`,
    )

    setRepos(res.data)
    setLoading(false)
  }

  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  const showAlert = (msg, type) => {
    setTimeout(() => setAlert({ alert: null }), 2000)
    setAlert({ alert: { msg, type } })
  }

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="React Github Finder" />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Fragment>
                    <Search
                      clearUsers={clearUsers}
                      showClear={users.length > 0}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  )
}

export default App
