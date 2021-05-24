import axios from 'axios'
import { useState } from 'react'

import './styles/RideForm.css'

function RideForm(props) {

    const handleInputs = (e) => {
        const name = e.target.name
        const value = e.target.value
        props.setInputs({...props.inputs, [name]: value})
    }

    const handleLocationSelect = (e) => {
        props.setFocusedInput(e.target.name)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(`${process.env.REACT_APP_BACKEND}/ride`, props.inputs)
        console.log('new ride response', response);
        props.setInputs({})
    }

    return (
        <form className='form rideForm' onSubmit={handleSubmit}>
            <span className='locationInputs'>
                <label htmlFor='pickup'>Pickup:</label>
                <input
                    type='text'
                    name='pickup'
                    value={props.inputs.pickup}
                    onFocus={handleLocationSelect}
                    onChange={handleInputs}
                />
                <label htmlFor='dropoff'>Dropoff:</label>
                <input
                    type='text'
                    name='dropoff'
                    value={props.inputs.dropoff}
                    onFocus={handleLocationSelect}
                    onChange={handleInputs}
                />
            </span>
            <span className='detailsInputs'>
                <label htmlFor='passengers'>Passengers:</label>
                <select
                    name='passengers'
                    value={props.inputs.passengers}
                    onChange={handleInputs}
                >
                    <option value={0}>--select--</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={7}>7</option>
                    <option value={7}>7</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={'+'}>+</option>
                </select>

                <label htmlFor='callerName'>Name:</label>
                <input
                    type='text'
                    name='callerName'
                    value={props.inputs.callerName}
                    onChange={handleInputs}
                />

                <label htmlFor='room'>Room:</label>
                <input
                    type='text'
                    name='room'
                    value={props.inputs.room}
                    onChange={handleInputs}
                />
            </span>

            <input type='submit' />
        </form>
    )
}

export default RideForm