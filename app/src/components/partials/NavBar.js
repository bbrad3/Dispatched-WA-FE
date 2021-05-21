import { Link } from 'react-router-dom'

import './NavBar.css'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext'

function NavBar() {
    const { userState } = useContext(GlobalContext)
    const [user, setUser] = userState

    const handleLogout = () => {
        localStorage.removeItem('userId')
        setUser({})
    }

    return (
        <div className='navbar'>
            {user.id ?
            <>
                <span className='navLink' onClick={handleLogout}>Logout</span>
                <Link className='navLink' to='/profile'>Profile</Link>
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