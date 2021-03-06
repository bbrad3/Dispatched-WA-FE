import { Link } from 'react-router-dom'

import './styles/NavBar.css'
import { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { GlobalContext } from '../contexts/GlobalContext'

function NavBar() {
    const { userState, driverState } = useContext(GlobalContext)
    const [user, setUser] = userState
    const [driverActive, setDriverActive] = driverState
    const [redirect, setRedirect] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('userId')
        setUser({foo: null})
        setDriverActive({foo: null})
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
            {user.dispatcher || user.admin ? 
                <>
                    <Link className='navLink' to='/dashboards/dispatch'>Dispatch</Link>
                    <Link className='navLink' to='/dashboards/locations'>Locations</Link>
                </>
                : null
            }
            {user.driver || user.admin ?
                <Link className='navLink' to='/dashboards/drive'>Drive</Link>
                : null
            }
        </div>
    )
}

export default NavBar