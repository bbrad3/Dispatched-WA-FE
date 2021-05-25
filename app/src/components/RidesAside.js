import axios from 'axios'
import { useState, useEffect } from 'react'

import './styles/RidesAside.css'
import RideDetails from './RideDetails'

function RidesAside() {
    const [rides, setRides] = useState([])

    const fetchRides = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/ride/`)
        console.log('fetchRides res', response);
        setRides(response.data.rides)
    }
    useEffect(fetchRides, [])

    return (
        <aside className='ridesAside'>
            <section className="pendingRides">
                <h3>Pending Rides</h3>
                {rides.length > 0 &&
                    rides.map(ride => (
                        ride.status === 'pending' && <RideDetails ride={ride} />
                    ))
                }
            </section>
            <section className="completedRides">
                <h3>Completed Rides</h3>
                {rides.length > 0 &&
                    rides.map(ride => (
                        ride.status === 'complete' && <RideDetails ride={ride} />
                    ))
                }
            </section>
        </aside>
    )
}

export default RidesAside