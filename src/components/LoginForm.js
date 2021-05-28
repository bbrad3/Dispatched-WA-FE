import axios from 'axios'
import { useState } from 'react'
 
function LoginForm(props) {
    const [inputs, setInputs] = useState({
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
        const response = await axios.post(`${process.env.REACT_APP_BACKEND}/user/login`, inputs)
        console.log('login res', response);
        
        const user = response.data.user
        localStorage.setItem('userId', user.id)
        props.setUser(user)
        props.setRedirect(user.id)
    }

    return (
        <form className='form loginForm' onSubmit={handleSubmit}>
            <h3>Login</h3>

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

export default LoginForm