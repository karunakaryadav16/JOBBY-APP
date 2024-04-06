import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

class Profile extends Component {
  state = {data: {}, isLoading: false}

  componentDidMount() {
    this.getProfileData()
  }

  renderFailureView = () => (
    <button
      type="button"
      onClick={() => {
        this.getProfileData()
      }}
    >
      Retry
    </button>
  )

  getProfileData = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({data: updatedData, isLoading: false})
    } else {
      this.setState({isLoading: false})
      this.renderFailureView()
    }
  }

  render() {
    const {data, isLoading} = this.state

    return (
      <div className="profile-container">
        {isLoading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          <>
            <img
              className="profile"
              src={data.profileImageUrl}
              alt={data.name}
            />
            <h1 className="name">{data.name}</h1>
            <p className="short-bio">{data.shortBio}</p>
          </>
        )}
      </div>
    )
  }
}

export default Profile
