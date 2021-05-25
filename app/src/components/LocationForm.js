import axios from 'axios'
import { useState, useEffect } from 'react'

import '../views/styles/LocationDashboard.css'

function LocationForm(props) {
    const [edit, setEdit] = useState({})

    const [inputs, setInputs] = useState({
        name: '',
        address: '',
        type: '',
    })

    const handleInputs = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputs({...inputs, [name]: value})
    }

    const handleRadio = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputs({...inputs, type: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!props.activeLocation) {
            // send post to create location
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/location`, inputs)
            console.log('new location res', response);
            setInputs({
                name: '',
                address: '',
                type: ''
            })
            props.setReload(true)
        } else {
            // send put to update location
            const response = await axios.put(`${process.env.REACT_APP_BACKEND}/location/${edit.id}`, inputs)
            console.log('update location res', response);
            setInputs({
                name: '',
                address: '',
                type: ''
            })
            props.setActiveLocation(null)
            props.setReload(true)
        }
    }

    const presetForm = (l) => {
        setInputs({
            name: l.name,
            address: l.address,
            type: l.type
        })
    }

    const fetchActiveLocation = async () => {
        if (props.activeLocation) {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/location/${props.activeLocation.id}`)
            console.log('fetchActiveLocation', response);
            setEdit(response.data.location)
            presetForm(response.data.location)
        }
    }
    useEffect(fetchActiveLocation, [props.activeLocation])

    useEffect(()=>{
        if (!props.activeLocation) {
            setInputs({
                name: '',
                address: '',
                type: ''
            })
        }
    }, [props.activeLocation])

    return (
        <>
        <form className='form locationForm' onSubmit={handleSubmit}>
            <h3>
                {props.activeLocation ? `Edit ${props.activeLocation.name}` : 'Create Location'}
            </h3>

            <label htmlFor='name'>Name:</label>
            <input
                type='text'
                name='name'
                value={inputs.name}
                onChange={handleInputs}
            />
            <label htmlFor='address'>Address:</label>
            <input
                type='text'
                name='address'
                value={inputs.address}
                onChange={handleInputs}
            />
            <span className='locationFormRadios'>
                <label htmlFor='property'>Property:</label>
                <input
                    type='radio'
                    name='property'
                    value='property'
                    checked={inputs.type === 'property'}
                    onChange={handleRadio}
                />
                <label htmlFor='destination'>Destination:</label>
                <input
                    type='radio'
                    name='destination'
                    value='destination'
                    checked={inputs.type === 'destination'}
                    onChange={handleRadio}
                />
            </span>

            <input type='submit' />
        </form>
        <div>
        </div>
        </>
    )
}

export default LocationForm