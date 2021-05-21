import axios from 'axios'
import { useState, createContext } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({children}) => {
    // current shift?
    const userId = localStorage.getItem('userId')

    const [user, setUser] = useState({})

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/users/verify`, {
                headers: {
                    Authorization: userId
                }
            })
            console.log('fetchUser res', response)
            // if (response.data.user) {
            //     console.log('user verified', response.data.user);
            //     setUser(response.data.user)
            // }
        } catch (error) {
            console.error(error)
        }
    }

    const store = {
        userState = [user, setUser],
        fetchUser
    }
    return (
        <GlobalContext.Provider value={store}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider }