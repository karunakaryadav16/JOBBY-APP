import Header from '../Header'
import './index.css'

const Home = props => {
  const onFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="app-home">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-page-description">
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the jobs that fits your abilities and potential.
        </p>
        <button type="button" className="find-jobs-btn" onClick={onFindJobs}>
          Find Jobs
        </button>
      </div>
    </>
  )
}

export default Home
