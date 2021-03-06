import axios from 'axios'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

import { GlobalContext } from './contexts/GlobalContext'
import DispatchDashboard from './views/DispatchDashboard'
import LocationDashboard from './views/LocationDashboard'
import DriverDashboard from './views/DriverDashboard'

function Dashboards() {
    const match = useRouteMatch()

    const { userState } = useContext(GlobalContext)
    const [user, setUser] = userState

    const [reload, setReload] = useState(false)
    const [resetRides, setResetRides] = useState(false)
    const [resetDrivers, setResetDrivers] = useState(false)
    const [activeLocation, setActiveLocation] = useState({})
    const [activeDrivers, setActiveDrivers] = useState([])
    const [dashboard, setDashboard] = useState(null)

    const [allLocations, setAllLocations] = useState({
        properties: [],
        destinations: []
    })

    const organizeLocations = (locationsArr) => {
        let properties = []
        let destinations = []

        locationsArr.forEach(loc => {
            if (loc.type === 'property') {
                properties.push(loc)
            } else if (loc.type === 'destination') {
                destinations.push(loc)
            }
        })
        const comparisonSort = (a, b) => {
            let A = a.name.toUpperCase()
            let B = b.name.toUpperCase()
            if (A < B) {
                return -1
            }
            if (A > B) {
                return 1
            }
            return 0
        }
        properties.sort(comparisonSort)
        destinations.sort(comparisonSort)

        setAllLocations({properties, destinations})
    }

    const fetchLocations = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/location`)

        console.log('fetchLocations res', response);
        organizeLocations(response.data.locations)
        setReload(false)
    }
    useEffect(fetchLocations, [reload])

    return (
        <div className='dashboards'>
            <Switch>
                <Route path={`${match.path}/dispatch`}>
                    <DispatchDashboard
                        reload={reload}
                        setReload={setReload}
                        activeDrivers={activeDrivers}
                        setActiveDrivers={setActiveDrivers}
                        allLocations={allLocations}
                        resetRides={resetRides}
                        setResetRides={setResetRides}
                        resetDrivers={resetDrivers}
                        setResetDrivers={setResetDrivers}
                    />
                </Route>
                <Route exact path={`${match.path}/locations`}>
                    <LocationDashboard
                        reload={reload}
                        setReload={setReload}
                        activeLocation={activeLocation}
                        setActiveLocation={setActiveLocation}
                        allLocations={allLocations}
                        dashboard={dashboard}
                        setDashboard={setDashboard}
                        />
                </Route>
                <Route exact path={`${match.path}/drive`}>
                    <DriverDashboard
                        user={user}
                        resetRides={resetRides}
                        setResetRides={setResetRides}
                        resetDrivers={resetDrivers}
                        setResetDrivers={setResetDrivers}
                    />
                </Route>
            </Switch>
        </div>
    )
}

export default Dashboards