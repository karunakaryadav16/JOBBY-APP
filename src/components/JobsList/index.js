import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobsList = props => {
  const {eachJobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
  } = eachJobDetails

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-card">
        <div className="company-profile-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="position-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-emp-type-package-container">
          <div className="location-type-container">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="employment-type-container">
              <BsFillBriefcaseFill className="job-type-icon" />
              <p className="emp-type">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsList
