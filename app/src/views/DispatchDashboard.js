import { useState, useEffect, useCallback, useContext } from 'react'

import './styles/DispatchDashboard.css'
import LocationsAside from '../components/LocationsAside'
import RideForm from '../components/RideForm'
import RidesAside from '../components/RidesAside'
import DriverCard from '../components/DriverCard'
import { SocketContext } from '../contexts/SocketContext'
import axios from 'axios'

function DispatchDashboard({
    reload, setReload, activeDrivers, setActiveDrivers, allLocations, resetDrivers, setResetDrivers, resetRides, setResetRides
}) {
    const socket = useContext(SocketContext)

    const [rides, setRides] = useState([])
    const [focusedInput, setFocusedInput] = useState('')
    const [inputs, setInputs] = useState({
        pickup: '',
        dropoff: '',
        passengers: '',
        callerName: '',
        room: ''
    })
    
    socket.on('ride_updated', (data) => { // repopulate rides when a ride status changes
        console.log('ride updated event in dispatch dash', data)
        setResetRides(!resetRides)
    })

    socket.on('shift_started', () => {
        setResetDrivers(!resetDrivers)
    })
    socket.on('shift_ended', () => {
        setResetDrivers(!resetDrivers)
    })

    const fetchRides = async () => {
        console.log('fetching rides for dispatcher...')
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/ride`)
        console.log('fetchRides res', response);
        setRides(response.data.rides)
        // setResetRides(false)
    }
    useEffect(fetchRides, [])
    useEffect(fetchRides, [resetRides])

    const fetchActiveDrivers = async () => {
        console.log('fetching active drivers for dispatch...');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/shift`)
        console.log('fetchActive', response);
        setActiveDrivers(response.data.shifts)
        // setResetDrivers(false)
    }
    useEffect(fetchActiveDrivers, [])
    useEffect(fetchActiveDrivers, [resetDrivers])

    useEffect(() => {
        socket.on('connect', () => {
            console.log('socketId', socket.id, socket.connected);
        })

        return () => {
            socket.off('connection')
        }
    }, [socket])

    return (
        <div className='view dispatchDashboardView'>
            <LocationsAside
                reload={reload}
                setReload={setReload}
                allLocations={allLocations}
                focusedInput={focusedInput}
                inputs={inputs}
                setInputs={setInputs}
            />
            <div className='dispatchMain'>
                <RideForm
                    socket={socket}
                    inputs={inputs}
                    setInputs={setInputs}
                    setFocusedInput={setFocusedInput}
                    resetRides={resetRides}
                    setResetRides={setResetRides}
                />
                <div className='driversContainer'>
                    {activeDrivers.length > 0 &&
                        activeDrivers.map(driver => (
                            <DriverCard
                                key={driver.id}
                                rides={rides}
                                driver={driver}
                            />
                        ))
                    }
                </div>
            </div>
            <RidesAside
                socket={socket}
                rides={rides}
                resetRides={resetRides}
                setResetRides={setResetRides}
                activeDrivers={activeDrivers}
            />
        </div>
    )
}

export default DispatchDashboard