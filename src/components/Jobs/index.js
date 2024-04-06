import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Profile from '../Profile'
import Filters from '../Filters'
import SalaryRangeFilter from '../SalaryRangeFilter'
import JobsList from '../JobsList'

import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    employmentType: [],
    minimumPackage: '',
    jobs: [],
    isLoading: false,
    showerror: false,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({isLoading: true})
    const {searchInput, employmentType, minimumPackage} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${minimumPackage}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        packagePerAnnum: eachJob.package_per_annum,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({jobs: updatedData, isLoading: false})
    } else {
      this.setState({isLoading: false, showerror: true})
    }
  }

  employment = (value, isChecked) => {
    if (isChecked) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, value],
        }),
        this.getJobsData,
      )
    } else {
      const {employmentType} = this.state
      const updatedJobTypesList = employmentType.filter(
        eachJobType => eachJobType !== value,
      )
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, updatedJobTypesList],
        }),
        this.getJobsData,
      )
    }
  }

  ChangePackage = packages => {
    this.setState({minimumPackage: packages}, this.getJobsData)
  }

  onChangeSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  onSearch = () => {
    this.getJobsData()
    this.setState({searchInput: ''})
  }

  render() {
    const {searchInput, jobs, isLoading} = this.state

    return (
      <>
        <Header />
        <div className="app-jobs">
          <div className="search-mobile-container">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              onChange={this.onChangeSearchInput}
              value={searchInput}
            />
            <button
              onClick={this.onSearch}
              type="button"
              className="search-button"
              data-testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="profile-filter-container">
            <Profile />
            <hr />
            <h1 className="type-of-emp">Type of Employment</h1>
            <ul className="type-of-emp-list-container">
              {employmentTypesList.map(eachType => (
                <Filters
                  employment={this.employment}
                  eachType={eachType}
                  key={eachType.employmentTypeId}
                />
              ))}
            </ul>
            <hr />
            <h1 className="type-of-emp">Salary Range</h1>
            <ul className="type-of-emp-list-container">
              {salaryRangesList.map(eachRange => (
                <SalaryRangeFilter
                  eachRange={eachRange}
                  key={eachRange.salaryRangeId}
                  ChangePackage={this.ChangePackage}
                />
              ))}
            </ul>
          </div>
          <div className="jobs-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              <button
                onClick={this.onSearch}
                type="button"
                className="search-button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {isLoading ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              <ul className="jobs-list-container">
                {jobs.map(eachJobDetails => (
                  <JobsList
                    eachJobDetails={eachJobDetails}
                    key={eachJobDetails.id}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
