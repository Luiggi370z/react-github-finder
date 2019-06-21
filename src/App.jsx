import React from 'react'
import './App.css'
import axios from 'axios'
import Navbar from 'components/layout/Navbar'
import Users from 'components/users/Users'

const apiUrl = `https://api.github.com/users?client_id=${
  process.env.REACT_APP_GITHUB_CLIENT_ID
}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`

class App extends React.Component {
  state = {
    users: [],
    loading: false,
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const res = await axios.get(apiUrl)
    this.setState({ users: res.data, loading: false })
  }

  render() {
    return (
      <div className="App">
        <Navbar title="React Github Finder" />
        <div className="container">
          <Users {...this.state} />
        </div>
      </div>
    )
  }
}

export default App
