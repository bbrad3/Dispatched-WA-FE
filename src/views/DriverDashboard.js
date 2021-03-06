import axios from 'axios'
import { useState, useEffect, useContext } from 'react'

import './styles/DriverDashboard.css'
import RideDetails from '../components/RideDetails'
import { GlobalContext } from '../contexts/GlobalContext'
import { SocketContext } from '../contexts/SocketContext'

function DriverDashboard({user, resetRides, setResetRides, resetDrivers, setResetDrivers}) {
    const { driverState } = useContext(GlobalContext)
    const [driverActive, setDriverActive] = driverState
    const socket = useContext(SocketContext)

    const [rides, setRides] = useState([])
    const [shuttles, setShuttles] = useState([])
    const [inputs, setInputs] = useState({foo: null})

    const handleInputs = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputs({...inputs, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        socket.emit('start_shift', {
            userId: user.id,
            shuttleNumber: inputs.shuttle,
            radio: inputs.radio
        })
    }

    const handleEndShift = async () => {
        socket.emit('end_shift', driverActive)
    }

    const fetchShuttles = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/shift/shuttles`)
        console.log('fetchShuttles res', response);
        setShuttles(response.data.shuttles)
    }
    useEffect(fetchShuttles, [])

    const fetchRides = async () => {
        if (driverActive.id) {
            console.log('fetching rides for driver...');
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/ride/${driverActive.id}`)
            console.log('fetch driver rides res', response)
            setRides(response.data.rides)
            // setResetRides(!resetRides)
        }
    }
    useEffect(fetchRides, [])
    useEffect(fetchRides, [resetRides])

    socket.on('ride_updated', (data) => {
        console.log('ride updated event in driver dash', data);
        setResetRides(!resetRides)
    })
    socket.on('shift_started', (data) => {
        setDriverActive({
            ...data.shift,
            user: data.user,
            shuttle: data.shuttle
        })
        setResetDrivers(!resetDrivers)
    })
    socket.on('shift_ended', ({shift}) => {
        console.log('shift ended res', shift);
        setInputs({foo: null})
        setDriverActive({foo: null})
        setResetDrivers(!resetDrivers)
    })

    useEffect(() => {
        socket.on('connect', () => {
            console.log('socketId', socket.id, socket.connected);
        })

        return () => {
            socket.off('connection')
        }
    }, [socket])


    return (
        <div className='view driverDashboard'>
            {!driverActive.id ?
                <form className='startShiftForm' onSubmit={handleSubmit}>
                    <label htmlFor='shuttle'>Shuttle:</label>
                    <select name='shuttle' value={inputs.shuttle} onChange={handleInputs}>
                        <option value={undefined}>--select--</option>
                        {shuttles.length > 0 &&
                            shuttles.map(s => (
                                <option key={s.id} value={s.number}>{s.number}</option>
                            ))
                        }
                    </select>

                    <label htmlFor='radio'>Radio:</label>
                    <input
                        type='number'
                        name='radio'
                        value={inputs.radio}
                        onChange={handleInputs}
                    />

                    <input type='submit' value='Start Shift' />
                </form>
            :
                <>
                <button className='endShiftBtn' onClick={handleEndShift}>
                    End Shift
                </button>
                <section className='shiftDetails'>
                    <p>Shuttle: <strong>{driverActive.shuttle.number}</strong></p>
                    <p>Seats: <strong>{driverActive.shuttle.capacity}</strong></p>
                    <p>Driver: <strong>{driverActive.user.firstName}</strong></p>
                    <p>Radio: <strong>{driverActive.radio}</strong></p>
                </section>
                </>
            }
            <section className='assignedRides'>
                <h4>Assigned Rides</h4>
                <div className='rideContainer'>
                    {rides.length > 0 &&
                        rides.map(ride => (
                            ride.status !== 'complete' && <RideDetails
                                key={ride.id}
                                socket={socket}
                                ride={ride}
                                resetRides={resetRides}
                                setResetRides={setResetRides}
                            />
                        ))
                    }
                </div>
            </section>
            <section className='completedRides'>
                <h4>Completed Rides</h4>
                <div className='rideContainer'>
                    {rides.length > 0 &&
                        rides.map(ride => (
                            ride.status === 'complete' && <RideDetails
                                key={ride.id}
                                socket={socket}
                                ride={ride}
                                resetRides={resetRides}
                                setResetRides={setResetRides}
                            />
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default DriverDashboard