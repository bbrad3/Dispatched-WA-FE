import axios from 'axios'
import { useEffect, useContext, useState, useCallback } from 'react'

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

    useEffect(()=> {
        props.setDashboard('location')
    }, [])
    

    return (
        <div className='view locationDashboardView'>
            <LocationsAside
                setActiveLocation={props.setActiveLocation}
                reload={props.reload}
                setReload={props.setReload}
                allLocations={props.allLocations}
                dashboard={props.dashboard}
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