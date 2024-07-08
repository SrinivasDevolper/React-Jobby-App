import {Link, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import HeaderRoute from '../HeaderRoute'

import './index.css'

const HomeRoute = () => {
  const cookieResponse = Cookies.get('jwt_token')
  if (cookieResponse === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <HeaderRoute />
      <div className="home-bg-container">
        <div className="home-item-cont">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="paragraph">
            Millions of people are searching for jobs, salary information,
            componany reviewrs. Find the job that fits your abilites and
            potentail.
          </p>
          <Link to="/jobs" className="home-button-link">
            <button type="button" className="home-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomeRoute
