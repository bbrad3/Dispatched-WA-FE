import axios from 'axios'

import './styles/LocationDashboard.css'
import LocationsAside from '../components/LocationsAside'
import LocationForm from '../components/LocationForm'

function LocationDashboard(props) {

    const handleDelete = async () => {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND}/location/${props.activeLocation}`)
        console.log('delete location res', response);
        if (response.status === 200) {
            props.setActiveLocation(null)
            props.setReload(true)
        }
    }

    return (
        <div className='view locationDashboardView'>
            <LocationsAside
                setActiveLocation={props.setActiveLocation}
                reload={props.reload}
                setReload={props.setReload}
                allLocations={props.allLocations}
            />
            <main className='locationDashboardMain'>
                <LocationForm
                    activeLocation={props.activeLocation}
                    setActiveLocation={props.setActiveLocation}
                    setReload={props.setReload}
                />
                {props.activeLocation &&
                    <button className='deleteBtn' onClick={handleDelete}>Delete Location</button>
                }
            </main>
        </div>
    )
}

export default LocationDashboard