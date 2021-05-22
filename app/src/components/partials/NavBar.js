import { Link } from 'react-router-dom'

import './NavBar.css'
import { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { GlobalContext } from '../../contexts/GlobalContext'

function NavBar() {
    const { userState } = useContext(GlobalContext)
    const [user, setUser] = userState
    const [redirect, setRedirect] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('userId')
        setUser({})
        setRedirect(true)
    }

    return (
        <div className='navbar'>
            {redirect && <Redirect to='/' />}
            {user.id ?
            <>
                <span className='navLink' onClick={handleLogout}>Logout</span>
                <Link className='navLink' to={`/profile/${user.id}`}>Profile</Link>
            </>
            :
                <Link className='navLink' to='/'>Start</Link>
            }
            {user.dispatcher || user.admin && 
            <>
                <Link className='navLink' to='/dispatch'>Dispatch</Link>
                <Link className='navLink' to='/locations'>Locations</Link>
            </>
            }
        </div>
    )
}

export default NavBar