import { useState } from 'react'

import './styles/DispatchDashboard.css'
import LocationsAside from '../components/LocationsAside'
import RideForm from '../components/RideForm'
import RidesAside from '../components/RidesAside'

function DispatchDashboard(props) {
    const [focusedInput, setFocusedInput] = useState('')

    const [inputs, setInputs] = useState({
        pickup: '',
        dropoff: '',
        passengers: '',
        callerName: '',
        room: ''
    })

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