import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import './styles/EmployeeProfile.css'
import { GlobalContext } from '../contexts/GlobalContext'

function EmployeeProfile() {
    const { userId } = useParams()
    const { userState } = useContext(GlobalContext)
    const [user, setUser] = userState
    const [profile, setProfile] = useState({})

    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        cdl: false,
        driver: false,
        dispatcher: false,
        admin: false
    })

    const handleInputs = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputs({...inputs, [name]: value})
    }

    const handleCheckbox = (e) => {
        const name = e.target.name
        setInputs({...inputs, [name]: !inputs[name]})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.put(`${process.env.REACT_APP_BACKEND}/user/${profile.id}`, inputs)
        console.log('update user res', response);

        fetchProfile()
    }

    const fetchProfile = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/user/profile`, {
            headers: {
                Authorization: userId
            }
        })
        console.log('fetchProfile res', response);
        const user = response.data.user
        setProfile(user)
        setInputs({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            cdl: user.cdl,
            driver: user.driver,
            dispatcher: user.dispatcher,
            admin: user.admin
        })
    }

    const fillRole = () => {
        let role = ''
        if (profile.driver) {
            role += 'Driver, '
        }
        if (profile.dispatcher) {
            role += 'Dispatcher, '
        }
        if (profile.admin) {
            role += 'Admin'
        }
        console.log(role);
        return role
    }

    useEffect(fetchProfile, [])

    return (
        <div className='view employeeProfileView'>
            <h2>Employee Profile</h2>
            {profile.id && 
            <>
                <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Phone:</strong> None yet</p>
                <p><strong>Role:</strong> {fillRole()}</p>
                <p><strong>CDL:</strong> {profile.cdl ? 'True' : 'False'}</p>
                <p><strong>License:</strong> None yet</p>
            </>
            }
            {user.admin && // Admin access only!
                <form className='form updateUserForm' onSubmit={handleSubmit}>
                    <h3>Edit Employee</h3>

                    <label htmlFor='firstName'>First Name:</label>
                    <input
                        type='text'
                        name='firstName'
                        value={inputs.firstName}
                        onChange={handleInputs}
                    />

                    <label htmlFor='lastName'>Last Name:</label>
                    <input
                        type='text'
                        name='lastName'
                        value={inputs.lastName}
                        onChange={handleInputs}
                    />

                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        name='email'
                        value={inputs.email}
                        onChange={handleInputs}
                    />

                    <span className='roleCheckboxes'>
                        <label htmlFor='driver'>Driver:</label>
                        <input
                            type='checkbox'
                            name='driver'
                            checked={inputs.driver}
                            onChange={handleCheckbox}
                        />
                        <label htmlFor='cdl'>CDL:</label>
                        <input
                            type='checkbox'
                            name='cdl'
                            checked={inputs.cdl}
                            onChange={handleCheckbox}
                        />
                        <label htmlFor='dispatcher'>Dispatcher:</label>
                        <input
                            type='checkbox'
                            name='dispatcher'
                            checked={inputs.dispatcher}
                            onChange={handleCheckbox}
                        />
                        <label htmlFor='admin'>Administrator:</label>
                        <input
                            type='checkbox'
                            name='admin'
                            checked={inputs.admin}
                            onChange={handleCheckbox}
                        />
                    </span>

                    <input type='submit' />
                </form>
            }
        </div>
    )
}

export default EmployeeProfile