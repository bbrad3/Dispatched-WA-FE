import RideDetails from './RideDetails'
import './styles/DriverCard.css'

function DriverCard({driver, rides}) {
    return (
        <div className='driverCard'>
            <span className='cardHeader'>
                <p>#: <strong>{driver.shuttle.number}</strong></p>
                <p>Driver: <strong>{driver.user.firstName}</strong></p>
                <p>Radio: <strong>shift.radio</strong></p>
                <p>Seats: <strong>{driver.shuttle.capacity}</strong></p>
            </span>
            <span className='cardBody'>
                {rides.map(ride => (
                    ride.shiftId === driver.id && <RideDetails
                        key={ride.id}
                        ride={ride}
                    />
                ))}
            </span>
        </div>
    )
}

export default DriverCard