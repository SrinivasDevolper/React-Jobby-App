import {Component} from 'react'

import {Link, Redirect} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import HeaderRoute from '../HeaderRoute'

import JobListItem from '../JobListItem'

import CheckBoxFilter from '../CheckBoxFilter'

import FilterSalary from '../FilterSalary'

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

const jobsUserData = {
  inital: 'INITAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const jobsDataPrograss = {
  inital: 'INITAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobsRoute extends Component {
  state = {
    profileDetail: [],
    jobDataDetail: [],
    jobsDataStatus: jobsDataPrograss.inital,
    searchValue: '',
    checkedValue: [],
    checkedRadioValue: [],
  }

  componentDidMount = () => {
    this.profileContent()
    this.jobsListItems()
  }

  profileContent = async () => {
    const profileApi = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token') // Make sure the token is properly retrieved
    this.setState({jobsDataStatus: jobsUserData.loading})
    if (!jwtToken) {
      console.error('JWT token not found')
    }

    const fetchedApi = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(profileApi, fetchedApi)
      if (response.ok) {
        const data = await response.json()
        const profileDetails = data.profile_details
        const updateProfileData = {
          name: profileDetails.name,
          profileImageUrl: profileDetails.profile_image_url,
          shortBio: profileDetails.short_bio,
        }
        this.setState({
          profileDetail: updateProfileData,
          jobsDataStatus: jobsUserData.success,
        })
      } else {
        this.setState({jobsDataStatus: jobsUserData.failure})
      }
    } catch (error) {
      this.setState({jobsDataStatus: jobsUserData.failure})
    }
  }

  successJobsUser = () => {
    const {profileDetail} = this.state
    return (
      <div className="profile-bg">
        <img
          src={profileDetail.profileImageUrl}
          alt="profile"
          className="profile-image"
        />
        <h1 className="profile-name">{profileDetail.name}</h1>
        <p className="profile-desc">{profileDetail.shortBio}</p>
      </div>
    )
  }

  failureJobsUser = () => (
    <div className="profile-bg-incomplete">
      <button
        className="home-button"
        onClick={this.jobsListItems}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  loadingJobsUser = () => (
    <div className="profile-bg-incomplete">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  switchJobUserData = () => {
    const {jobsDataStatus} = this.state
    switch (jobsDataStatus) {
      case jobsUserData.success:
        return this.successJobsUser()
      case jobsUserData.failure:
        return this.failureJobsUser()
      case jobsUserData.loading:
        return this.loadingJobsUser()
      default:
        return null
    }
  }

  jobsListItems = async () => {
    const {checkedRadioValue, checkedValue, searchValue} = this.state
    console.log(checkedRadioValue, 'checkBoxRadio')
    const jobsApi = `https://apis.ccbp.in/jobs?employment_type=${checkedValue.join()}&minimum_package=${checkedRadioValue.join()}&search=${searchValue}`
    const jwtToken = Cookies.get('jwt_token')
    const jobFetchedApi = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const responseJobs = await fetch(jobsApi, jobFetchedApi)
    if (responseJobs.ok) {
      const jobsData = await responseJobs.json()
      const {jobs} = jobsData
      const upatedData = jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      console.log(jobs, 'main')
      this.setState({
        jobDataDetail: upatedData,
        jobsDataStatus: jobsDataPrograss.success,
      })
    }
  }

  searchInputValue = event => {
    this.setState({searchValue: event.target.value})
  }

  btnInputValue = () => {
    this.jobsListItems()
  }

  jobSuccessData = () => {
    const {jobDataDetail} = this.state
    return (
      <>
        {jobDataDetail.length !== 0 ? (
          <ul className="underorder-list">
            {jobDataDetail.map(eachJobItem => (
              <Link to={`/jobs/${eachJobItem.id}`} className="links-page">
                <JobListItem key={eachJobItem.id} eachJobItem={eachJobItem} />
              </Link>
            ))}
          </ul>
        ) : (
          <div className="jobs-bg-failure">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1>No Jobs Found</h1>
            <p>We Could not Find Any Job. Try Another filter.</p>
          </div>
        )}
      </>
    )
  }

  failureSuccessData = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        className="home-button"
        onClick={this.jobsListItems}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  loadingSuccessData = () => (
    <div className="jobs-bg-incomplete">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  switchJobData = () => {
    const {jobsDataStatus} = this.state
    switch (jobsDataStatus) {
      case jobsDataPrograss.success:
        return this.jobSuccessData()
      case jobsDataPrograss.failure:
        return this.failureSuccessData()
      case jobsDataPrograss.loading:
        return this.loadingSuccessData()
      default:
        return null
    }
  }

  checkedFilterValue = checkBoxValue => {
    const {checkedValue} = this.state
    console.log(!checkedValue.includes(checkBoxValue))
    if (!checkedValue.includes(checkBoxValue)) {
      this.setState(
        prevList => ({
          checkedValue: [...prevList.checkedValue, checkBoxValue],
        }),
        this.jobsListItems,
      )
    } else {
      const findIndexValue = checkedValue.indexOf(checkBoxValue)
      this.setState(prevState => {
        // Create a copy of the checkedValue array
        const newCheckedValue = [...prevState.checkedValue]
        // Remove the item at findIndexValue from the newCheckedValue array
        newCheckedValue.splice(findIndexValue, 1)

        // Return the updated state
        return {
          checkedValue: newCheckedValue,
        }
      }, this.jobsListItems)
    }
  }

  checkedRadio = radioValue => {
    const {checkedRadioValue} = this.state
    if (checkedRadioValue.length === 0) {
      this.setState(
        prevRadio => ({
          checkedRadioValue: [...prevRadio.checkedRadioValue, radioValue],
        }),
        this.jobsListItems,
      )
    } else {
      this.setState(prevState => {
        const newRadioValue = [...prevState.checkedRadioValue]
        newRadioValue.splice(0, 1)
        return {
          checkedRadioValue: [radioValue],
        }
      }, this.jobsListItems)
    }
  }

  render() {
    const cookieResponse = Cookies.get('jwt_token')
    if (cookieResponse === undefined) {
      return <Redirect to="/login" />
    }
    const {searchValue} = this.state
    console.log(searchValue)
    return (
      <>
        <HeaderRoute />
        <div className="jobs-bg-cont">
          <div className="side-navbar">
            {this.switchJobUserData()}
            <hr />
            <h1 className="types-heading">Type Of Employement</h1>
            <ul>
              {employmentTypesList.map(eachEmployeeList => (
                <CheckBoxFilter
                  key={eachEmployeeList.employmentTypeId}
                  eachEmployeeList={eachEmployeeList}
                  checkedFilterValue={this.checkedFilterValue}
                />
              ))}
            </ul>
            <hr />
            <h1 className="types-heading">Salary Range</h1>
            <ul>
              {salaryRangesList.map(eachSalaryList => (
                <FilterSalary
                  key={eachSalaryList.salaryRangeId}
                  eachSalaryList={eachSalaryList}
                  checkedRadio={this.checkedRadio}
                />
              ))}
            </ul>
          </div>
          <div className="main-container">
            <div className="search-cont">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.searchInputValue}
                value={searchValue}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.btnInputValue}
                aria-label="Search"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="jobs-container"> {this.switchJobData()} </div>
          </div>
        </div>
      </>
    )
  }
}
export default JobsRoute
