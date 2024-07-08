import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import {IoBag} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import HeaderRoute from '../HeaderRoute'
// eslint-disable-next-line import/extensions
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDataDetails: [],
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  // eslint-disable-next-line no-unused-vars
  getJobData = async props => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id, 'id')
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const optionsJobData = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const responseJobData = await fetch(jobDetailsApiUrl, optionsJobData)
    if (responseJobData.ok === true) {
      const fetchedJobData = await responseJobData.json()
      console.log(fetchedJobData, 'fecthedData')
      const updatedJobDetailsData = [fetchedJobData.job_details].map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          companyWebsiteUrl: eachItem.company_website_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          lifeAtCompany: {
            description: eachItem.life_at_company.description,
            imageUrl: eachItem.life_at_company.image_url,
          },
          location: eachItem.location,
          packagePerAnnum: eachItem.package_per_annum,
          rating: eachItem.rating,
          skills: eachItem.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
          title: eachItem.title,
        }),
      )
      const fetchedJobDataSimilar = {
        similarJobs: fetchedJobData.similar_jobs,
      }
      const updatedSimilarJobDetails = fetchedJobDataSimilar.similarJobs.map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          employmentType: eachItem.employment_type,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        }),
      )
      this.setState({
        jobDataDetails: updatedJobDetailsData,
        similarJobsData: updatedSimilarJobDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsSuccessView = () => {
    const {jobDataDetails, similarJobsData} = this.state
    if (jobDataDetails.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        // eslint-disable-next-line no-unused-vars
        id,
        jobDescription,
        lifeAtCompany,
        location,
        packagePerAnnum,
        rating,
        skills,
        title,
      } = jobDataDetails[0]
      console.log(companyLogoUrl, 'companyLogoUrlJobDetails')
      return (
        <>
          <div className="job-item-container">
            <div className="first-part-container">
              <div className="img-title-container">
                <img
                  className="company-logo"
                  src={companyLogoUrl}
                  alt="job details company logo"
                />
                <div className="title-rating-container">
                  <h1 className="title-heading">{title}</h1>
                  <div className="star-rating-container">
                    <AiFillStar className="star-icon" />
                    <p className="rating-text">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-package-container">
                <div className="location-job-type-container">
                  <div className="location-icon-location-container">
                    <p className="location">
                      <MdLocationOn className="location-icon" /> {location}
                    </p>
                    <p className="job-type">
                      <IoBag className="location-icon" />
                      {employmentType}
                    </p>
                  </div>
                </div>
                <div className="package-container">
                  <p className="package">{packagePerAnnum}</p>
                </div>
              </div>
            </div>
            <hr className="item-hr-line" />
            <div className="second-part-container">
              <div className="description-visit-container">
                <h1 className="description-job-heading">Description</h1>
                <a className="visit-anchor" href={companyWebsiteUrl}>
                  Visit <BiLinkExternal />
                </a>
              </div>
              <p className="description-para">{jobDescription}</p>
            </div>
            <h1 className="skills-heading">Skills</h1>
            <ul className="ul-job-details-container">
              {skills.map(eachItem => (
                <li className="li-job-details-container" key={eachItem.name}>
                  <img
                    className="skill-img"
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                  />
                  <p className="skill-para">{eachItem.name}</p>
                </li>
              ))}
            </ul>
            <div className="company-life-img-container">
              <div className="life-heading-para-container">
                <h1>Life at Company</h1>
                <p className="description-para">{lifeAtCompany.description}</p>
              </div>
              <img src={lifeAtCompany.imageUrl} alt="life at company" />
            </div>
          </div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-ul-container">
            {similarJobsData.map(eachItem => (
              <SimilarJobs
                key={eachItem.id}
                similarJobData={eachItem}
                eachItem={eachItem}
              />
            ))}
          </ul>
        </>
      )
    }
    return null
  }

  onRetryJobDetailsAgain = () => {
    this.getJobData()
  }

  renderJobFailureView = () => (
    <div className="job-details-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <div className="btn-container-failure">
        <button
          className="failure-jod-details-btn"
          type="button"
          onClick={this.onRetryJobDetailsAgain}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderJobLoadingView = () => (
    <div className="job-details-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <HeaderRoute />
        <div className="job-details-view-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobDetails
