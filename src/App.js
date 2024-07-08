import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import ProtectedRoute from './components/ProtectedRoute'

import LoginRoute from './components/loginRoute'

import HomeRoute from './components/HomeRoute'

import JobsRoute from './components/JobsRoute'

import JobDetails from './components/JobDetails'

import JobNotFound from './components/JobNotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/jobs" component={JobsRoute} />
    <Route exact path="/jobs/:id" component={JobDetails} />
    <Route exact path="/not-found" component={JobNotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
