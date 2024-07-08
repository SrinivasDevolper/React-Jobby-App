import Cookies from 'js-cookie'

import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
  const responsecookie = Cookies.get('jwt_token')
  if (responsecookie === '') {
    return <Redirect to="/" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
