import './index.css'

import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'

import {BsFillBagFill} from 'react-icons/bs'

const JobListItem = props => {
  const {eachJobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJobItem
  return (
    <li className="list-job">
      <div className="list-logo-cont">
        <img src={companyLogoUrl} alt="company logo" className="list-logo" />
        <div className="list-title-cont">
          <h1 className="list-title">{title}</h1>
          <p>
            <FaStar className="start-icon" /> {rating}
          </p>
        </div>
      </div>
      <div className="second-detail-cont">
        <div className="detail-cont-items">
          <p className="loacation-para">
            <FaMapMarkerAlt className="second-icons" />
            {location}
          </p>
          <p className="loacation-para">
            <BsFillBagFill className="second-icons" />
            {employmentType}
          </p>
        </div>
        <h1 className="list-salary">{packagePerAnnum} LPA</h1>
      </div>
      <hr />
      <h1 className="list-desc">Description</h1>
      <p className="list-para">{jobDescription}</p>
    </li>
  )
}

export default JobListItem
