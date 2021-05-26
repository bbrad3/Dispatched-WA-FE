import { useState, useEffect, useCallback, useContext } from 'react'

import './styles/DispatchDashboard.css'
import LocationsAside from '../components/LocationsAside'
import RideForm from '../components/RideForm'
import RidesAside from '../components/RidesAside'
import DriverCard from '../components/DriverCard'
import { SocketContext } from '../contexts/SocketContext'
import axios from 'axios'

function DispatchDashboard(props) {
    const socket = useContext(SocketContext)
    const [joined, setJoined] = useState(false)

    const handleConnectionAccepted = useCallback(() => {
        setJoined(true)
        console.log('joined', joined);
    }, [])

    const [rides, setRides] = useState([])
    const [resetRides, setResetRides] = useState(false)
    const [active, setActive] = useState([])
    const [focusedInput, setFocusedInput] = useState('')
    const [inputs, setInputs] = useState({
        pickup: '',
        dropoff: '',
        passengers: '',
        callerName: '',
        room: ''
    })

    const fetchRides = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/ride/`)
        console.log('fetchRides res', response);
        setRides(response.data.rides)
        setResetRides(false)
    }
    useEffect(fetchRides, [resetRides])

    const fetchActive = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/shift`)
        console.log('fetchActive', response);
        setActive(response.data.shifts)
    }
    useEffect(fetchActive, [])

    useEffect(() => {
        socket.on('connect', () => {
            console.log('socketId', socket.id, socket.connected);
            handleConnectionAccepted()
        })

        return () => {
            socket.off('connection', handleConnectionAccepted)
        }
    }, [socket, handleConnectionAccepted])

    return (
        <div className='view dispatchDashboardView'>
            <LocationsAside
                reload={props.reload}
                setReload={props.setReload}
                allLocations={props.allLocations}
                focusedInput={focusedInput}
                inputs={inputs}
                setInputs={setInputs}
            />
            <div className='dispatchMain'>
                <RideForm
                    inputs={inputs}
                    setInputs={setInputs}
                    setFocusedInput={setFocusedInput}
                    setResetRides={setResetRides}
                />
                <div className='driversContainer'>
                    {active.length > 0 &&
                        active.map(driver => (
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
                rides={rides}
                setResetRides={setResetRides}
                active={active}
            />
        </div>
    )
}

export default DispatchDashboard