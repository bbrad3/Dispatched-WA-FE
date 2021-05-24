import { useEffect } from 'react'
import './styles/LocationsAside.css'

function LocationsAside(props) {

    const activeStyle = {border: '1px solid #990000'}

    const handleClick = (e, location) => {
        if (props.focusedInput && e.target.nodeName === 'P') {
            props.setInputs({...props.inputs, [props.focusedInput]: e.target.innerHTML})
        }
        if (props.focusedInput && e.target.nodeName === 'DIV') {
            console.log(e.target.childNodes);
            props.setInputs({...props.inputs, [props.focusedInput]: e.target.childNodes[0].innerHTML})
        }
        // props.setActiveLocation(location)
    }

    return (
        <aside className='locationsAside'>
            {/* Map through allLocations to build multiple list components */}
            <div className='propertiesList'>
                <h4>Properties</h4>
                {props.allLocations && props.allLocations.properties.map(l => (
                    <div className='locationBubble' key={l.id} onClick={(e)=>{handleClick(e, l)}}>
                        <p data_address={l.address}>{l.name}</p>
                        {props.activeLocation && props.activeLocation.name === l.name ? 'active' : null}
                    </div>
                ))}
            </div>
            <div className='destinationsList'>
                <h4>Destinations</h4>
                {props.allLocations && props.allLocations.destinations.map(l => (
                    <div className='locationBubble' key={l.id} onClick={(e)=>{handleClick(e, l)}}>
                        <p data_address={l.address}>{l.name}</p>
                    </div>
                ))}
            </div>
        </aside>
    )
}

export default LocationsAside