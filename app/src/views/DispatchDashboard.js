import { useState, useEffect, useCallback, useContext } from 'react'

import './styles/DispatchDashboard.css'
import LocationsAside from '../components/LocationsAside'
import RideForm from '../components/RideForm'
import RidesAside from '../components/RidesAside'
import { SocketContext } from '../contexts/SocketContext'

function DispatchDashboard(props) {
    const socket = useContext(SocketContext)
    const [joined, setJoined] = useState(false)

    const handleConnectionAccepted = useCallback(() => {
        setJoined(true)
        console.log('joined', joined);
    }, [])

    const [focusedInput, setFocusedInput] = useState('')

    const [inputs, setInputs] = useState({
        pickup: '',
        dropoff: '',
        passengers: '',
        callerName: '',
        room: ''
    })

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
                    activeLocation={props.activeLocation}
                    setFocusedInput={setFocusedInput}
                />
            </div>
            <RidesAside />
        </div>
    )
}

export default DispatchDashboard