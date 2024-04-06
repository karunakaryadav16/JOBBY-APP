import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {eachSimilarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachSimilarJob

  return (
    <li className="similar-card">
      <div className="company-profile-container">
        <img className="company-logo" src={companyLogoUrl} alt="company logo" />
        <div className="position-rating-container">
          <h1 className="job-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star" />
            <p className="job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobs
