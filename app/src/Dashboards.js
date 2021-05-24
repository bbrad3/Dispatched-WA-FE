import axios from 'axios'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

import { GlobalContext } from './contexts/GlobalContext'
import DispatchDashboard from './views/DispatchDashboard'
import LocationDashboard from './views/LocationDashboard'

function Dashboards() {
    const match = useRouteMatch()

    const { userState } = useContext(GlobalContext)
    const [user, setUser] = userState

    const [reload, setReload] = useState(false)
    const [activeLocation, setActiveLocation] = useState(null) // this is only the locationId

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
                        activeLocation={activeLocation}
                        setActiveLocation={setActiveLocation}
                        allLocations={allLocations}
                        fetchLocations={fetchLocations}
                    />
                </Route>
                <Route exact path={`${match.path}/locations`}>
                    <LocationDashboard
                        reload={reload}
                        setReload={setReload}
                        activeLocation={activeLocation}
                        setActiveLocation={setActiveLocation}
                        allLocations={allLocations}
                    />
                </Route>
            </Switch>
        </div>
    )
}

export default Dashboards