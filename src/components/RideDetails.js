import axios from 'axios'
import { useState } from 'react'

import './styles/RideDetails.css'

function RideDetails({ride, resetRides, setResetRides, activeDrivers, socket}) {
    const [driver, setDriver] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        socket.emit('assign_ride', {
            rideId: ride.id,
            shiftId: driver
        })
        setResetRides(!resetRides)
    }

    const handleRolling = () => {
        console.log('...rolling');
        socket.emit('rolling', {rideId: ride.id})
        setResetRides(!resetRides)
    }

    const handleComplete = () => {
        console.log('...clear');
        if (ride.status === 'rolling') {
            socket.emit('ride_complete', {rideId: ride.id})
            setResetRides(!resetRides)
        }
    }

    return (
        <div className='rideDetails'>
            <span className='rideAtoB'>
                {/* populate with active shuttles/drivers */}
                {ride.status === 'pending' &&
                    <form className='assignRideForm' onSubmit={handleSubmit}>
                        <select value={driver} onChange={(e)=>{setDriver(e.target.value)}}> 
                            <option>--select--</option>
                            {activeDrivers.map(shift => (
                                <option key={shift.id} value={shift.id}>{shift.user.firstName}</option>
                            ))}
                        </select>
                        <input type='submit' value='Go' />
                    </form>
                }
                <div
                    className={ride.status === 'rolling' ? 'bubble rolling' : ride.status === 'complete' ? 'bubble complete' : 'bubble pickup'}
                    onClick={handleRolling}
                >
                    {ride.pickupLocation ?
                        ride.pickupLocation.name
                        :
                        ride.pickupCustom
                    }
                </div>
                <span>to</span>
                <div
                    className={ride.status === 'complete' ? 'bubble complete' : 'bubble dropoff'}
                    onClick={handleComplete}
                >
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