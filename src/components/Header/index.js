import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <div className="nav-bar">
        <ul className="nav-items-container">
          <li className="nav-item">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="link">
              Jobs
            </Link>
          </li>
        </ul>
        <div>
          <button type="button" className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
