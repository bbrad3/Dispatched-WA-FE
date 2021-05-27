import './styles/RidesAside.css'
import RideDetails from './RideDetails'

function RidesAside({activeDrivers, rides, resetRides, setResetRides, socket}) {

    return (
        <aside className='ridesAside'>
            <section className="pendingRides">
                <h3>Pending Rides</h3>
                {rides && rides.length > 0 ?
                    rides.map(ride => (
                        ride.status === 'pending' && <RideDetails
                            key={ride.id}
                            socket={socket}
                            resetRides={resetRides}
                            setResetRides={setResetRides}
                            ride={ride}
                            activeDrivers={activeDrivers}
                        />
                    ))
                    : null
                }
            </section>
            <section className="completedRides">
                <h3>Completed Rides</h3>
                {rides && rides.length > 0 ?
                    rides.map(ride => (
                        ride.status === 'complete' && <RideDetails
                            key={ride.id}
                            socket={socket}
                            resetRides={resetRides}
                            setResetRides={setResetRides}
                            ride={ride}
                        />
                    ))
                    : null
                }
            </section>
        </aside>
    )
}

export default RidesAside