import './styles/RideDetails.css'

function RideDetails(props) {
    const ride = props.ride

    const handleSubmit = (e) => {
        e.preventDefault()
        // send put to update ride assignment(shiftId)
        // reload RidesAside component
    }

    return (
        <div className='rideDetails'>
            <span className='rideAtoB'>
                {/* populate with active shuttles/drivers */}
                {ride.status === 'pending' &&
                    <form className='assignRideForm' onSubmit={handleSubmit}>
                        <select value={undefined}> 
                            <option>--select--</option>
                            <option>name1</option>
                            <option>name2</option>
                            <option>name3</option>
                            <option>name4</option>
                        </select>
                        <input type='submit' value='Go' />
                    </form>
                }
                <div className='bubble pickup'>
                    {ride.pickupLocation ?
                        ride.pickupLocation.name
                        :
                        ride.pickupCustom
                    }
                </div>
                <span>to</span>
                <div className='bubble dropoff'>
                    {ride.dropoffLocation ?
                        ride.dropoffLocation.name
                        :
                        ride.dropoffCustom
                    }
                </div>
            </span>
            <span className='rideInfo'>
                <p>Heads: <strong>{ride.passengers}</strong></p>
                <p>Name: <strong>{ride.callerName}</strong></p>
                <p>Room: <strong>{ride.room}</strong></p>
            </span>
        </div>
    )
}

export default RideDetails