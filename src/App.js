import { Route, Switch } from 'react-router-dom'
import { useEffect, useContext } from 'react'

import './App.css';
import { GlobalContext } from './contexts/GlobalContext'
import NavBar from './components/NavBar'
import Home from './views/Home'
import EmployeeProfile from './views/EmployeeProfile'
import Dashboards from './Dashboards'

function App() {
  const { userState, fetchUser, driverActive, fetchShift } = useContext(GlobalContext)
  const [user, setUser] = userState

  useEffect(fetchUser, [])
  // useEffect(fetchShift, [user, driverActive])

  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/profile/:userId'>
          <EmployeeProfile />
        </Route>

        <Route path='/dashboards'>
          <Dashboards />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
