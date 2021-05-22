import axios from 'axios'
import { useState } from 'react'

import './styles/LocationDashboard.css'
import LocationsAside from '../partials/LocationsAside'
import LocationForm from '../components/LocationForm'

function LocationDashboard() {
    const [reload, setReload] = useState(false)
    const [activeLocation, setActiveLocation] = useState(null) // this is only the locationId

    const handleDelete = async () => {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND}/location/${activeLocation}`)
        console.log('delete location res', response);
        if (response.status === 200) {
            setActiveLocation(null)
            setReload(true)
        }
    }

    return (
        <div className='view locationDashboardView'>
            <LocationsAside
                setActiveLocation={setActiveLocation}
                reload={reload}
                setReload={setReload}
            />
            <main className='locationDashboardMain'>
                <LocationForm
                    activeLocation={activeLocation}
                    setActiveLocation={setActiveLocation}
                    setReload={setReload}
                />
                {activeLocation &&
                    <button className='deleteBtn' onClick={handleDelete}>Delete Location</button>
                }
            </main>
        </div>
    )
}

export default LocationDashboard