import './styles/RidesAside.css'
import RideDetails from './RideDetails'

function RidesAside({active, rides, setResetRides}) {

    return (
        <aside className='ridesAside'>
            <section className="pendingRides">
                <h3>Pending Rides</h3>
                {rides.length > 0 &&
                    rides.map(ride => (
                        ride.status === 'pending' && <RideDetails
                            setResetRides={setResetRides}
                            key={ride.id}
                            ride={ride}
                            active={active}
                        />
                    ))
                }
            </section>
            <section className="completedRides">
                <h3>Completed Rides</h3>
                {rides.length > 0 &&
                    rides.map(ride => (
                        ride.status === 'complete' && <RideDetails
                            setResetRides={setResetRides}
                            key={ride.id}
                            ride={ride}
                        />
                    ))
                }
            </section>
        </aside>
    )
}

export default RidesAside