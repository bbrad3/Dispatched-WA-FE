import axios from 'axios'
import { useEffect, useState } from 'react'

import './LocationsAside.css'

function LocationsAside(props) {
    const [properties, setProperties] = useState([])
    const [destinations, setDestinations] = useState([])

    const handleClick = (locationId) => {
        props.setActiveLocation(locationId)
    }

    const organizeLocations = (locationsArr) => {
        let properties = []
        let destinations = []

        locationsArr.forEach(loc => {
            if (loc.type === 'property') {
                properties.push(loc)
            } else if (loc.type === 'destination') {
                destinations.push(loc)
            }
        })

        setProperties(properties)
        setDestinations(destinations)
    }

    const fetchLocations = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/location`)

        console.log('fetchLocations res', response);
        organizeLocations(response.data.locations)
        props.setReload(false)
    }
    useEffect(fetchLocations, [props.reload])

    return (
        <aside className='locationsAside'>
            <div className='propertiesList'>
                <h4>Properties</h4>
                {properties && properties.map(l => (
                    <div className='locationBubble' key={l.id} onClick={()=>{handleClick(l.id)}}>
                        <p data_address={l.address}>{l.name}</p>
                    </div>
                ))}
            </div>
            <div className='destinationsList'>
                <h4>Destinations</h4>
                {destinations && destinations.map(l => (
                    <div className='locationBubble' key={l.id} onClick={()=>{handleClick(l.id)}}>
                        <p data_address={l.address}>{l.name}</p>
                    </div>
                ))}
            </div>
        </aside>
    )
}

export default LocationsAside