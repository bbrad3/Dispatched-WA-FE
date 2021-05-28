import axios from 'axios'
import { useState, createContext } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({children}) => {
    // current shift?
    const userId = localStorage.getItem('userId')
    const [user, setUser] = useState({foo: null})
    const fetchUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/user/verify`, {
                headers: {
                    Authorization: userId
                }
            })
            console.log('fetchUser res', response)
            if (response.status === 200) {
                // console.log('user verified', response.data.user);
                setUser(response.data.user)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const [driverActive, setDriverActive] = useState({id: null})
    const fetchShift = async () => {
        if (userId) {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/shift/started`, {
                headers: {
                    Authorization: userId
                }
            })
            console.log('fetchShift res', response);
            if (!driverActive.id) {
                setDriverActive(response.data.shift)
            }
        }
    }

    const store = {
        userState: [user, setUser],
        fetchUser,
        driverState: [driverActive, setDriverActive],
        fetchShift
    }
    return (
        <GlobalContext.Provider value={store}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider }