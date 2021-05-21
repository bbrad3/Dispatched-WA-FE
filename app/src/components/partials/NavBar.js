import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
    return (
        <div className='navbar'>
            <Link className='navLink' to='/'>Start</Link>
            <span className='navLink'>Logout</span>
            <Link className='navLink' to='/profile'>Profile</Link>
            <Link className='navLink' to='/dispatch'>Dispatch</Link>
            <Link className='navLink' to='/locations'>Locations</Link>
        </div>
    )
}

export default NavBar