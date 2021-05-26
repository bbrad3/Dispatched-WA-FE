import axios from 'axios'
import { useState } from 'react'

import './styles/RideDetails.css'

function RideDetails({ride, setResetRides, active}) {
    const [driver, setDriver] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        // send put to update ride assignment(shiftId)
        const response = await axios.put(`${process.env.REACT_APP_BACKEND}/ride/${ride.id}`, {
            shiftId: driver
        })
        console.log('assign driver res', response);
        // reload RidesAside component
        setResetRides(true)
    }

    return (
        <div className='rideDetails'>
            <span className='rideAtoB'>
                {/* populate with active shuttles/drivers */}
                {ride.status === 'pending' &&
                    <form className='assignRideForm' onSubmit={handleSubmit}>
                        <select value={driver} onChange={(e)=>{setDriver(e.target.value)}}> 
                            <option>--select--</option>
                            {active.map(shift => (
                                <option key={shift.id} value={shift.id}>{shift.user.firstName}</option>
                            ))}
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