import React from 'react'
import PropTypes from 'prop-types'

const Navbar = ({ icon, title }) => (
  <nav className="navbar bg-primary">
    <h1>
      <i className={icon} />
      <div>{title}</div>
    </h1>
  </nav>
)

Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fab fa-github',
}

Navbar.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
}

export default Navbar
