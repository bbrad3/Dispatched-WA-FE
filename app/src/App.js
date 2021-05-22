import { Route } from 'react-router-dom'
import { useEffect, useContext } from 'react'

import './App.css';
import { GlobalContext } from './contexts/GlobalContext'
import NavBar from './components/partials/NavBar'
import Home from './views/Home'
import DispatchDashboard from './views/DispatchDashboard'
import EmployeeProfile from './views/EmployeeProfile'
import LocationDashboard from './views/LocationDashboard'

function App() {
  const { userState, fetchUser } = useContext(GlobalContext)
  const [user, setUser] = userState

  useEffect(fetchUser, [])

  return (
    <div className="App">
      <NavBar />

      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/dispatch'>
        <DispatchDashboard />
      </Route>

      <Route exact path='/profile/:userId'>
        <EmployeeProfile />
      </Route>

      <Route exact path='/locations'>
        <LocationDashboard />
      </Route>

    </div>
  );
}

export default App;
