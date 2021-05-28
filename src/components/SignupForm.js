import axios from 'axios'
import { useState } from 'react'
 
function SignupForm(props) {
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const handleInputs = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputs({...inputs, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(`${process.env.REACT_APP_BACKEND}/user`, inputs)
        console.log('signup res', response);

        const user = response.data.user
        localStorage.setItem('userId', user.id)
        props.setUser(user)
        props.setRedirect(user.id)
    }

    return (
        <form className='form signupForm' onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

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

            <label htmlFor='password'>Password:</label>
            <input
                type='text'
                name='password'
                value={inputs.password}
                onChange={handleInputs}
            />

            <input type='submit' />
        </form>
    )
} 

export default SignupForm