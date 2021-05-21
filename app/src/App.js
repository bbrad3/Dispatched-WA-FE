import { Route } from 'react-router-dom'

import './App.css';
import Home from './views/Home'
import DispatchDashboard from './views/DispatchDashboard'
import EmployeeProfile from './views/EmployeeProfile'
import LocationDashboard from './views/LocationDashboard'

function App() {
  return (
    <div className="App">

      <Route exact path='/'>
        <Home />
      </Route>
      
      <Route exact path='/dispatch'>
        <DispatchDashboard />
      </Route>
      
      <Route exact path='/profile'>
        <EmployeeProfile />
      </Route>
      
      <Route exact path='/locations'>
        <LocationDashboard />
      </Route>

    </div>
  );
}

export default App;
