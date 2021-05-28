import { Redirect } from 'react-router-dom'
import { useState, useContext } from 'react'

import './styles/Home.css'
import { GlobalContext } from '../contexts/GlobalContext'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'

function Home() {
    const { userState } = useContext(GlobalContext)
    const [user, setUser] = userState
    const [redirect, setRedirect] = useState(false)

    return (
        <div className='view homeView'>
            {redirect && <Redirect to={`/profile/${redirect}`} />}
            <LoginForm setRedirect={setRedirect} setUser={setUser} />
            <SignupForm setRedirect={setRedirect} setUser={setUser} />
        </div>
    )
}

export default Home