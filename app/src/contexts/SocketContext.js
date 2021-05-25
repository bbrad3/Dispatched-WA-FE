import { createContext } from 'react'
import io from 'socket.io-client'


const SocketContext = createContext()


const SocketProvider = ({children}) => {
    const socket = io.connect(process.env.REACT_APP_BACKEND)

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketProvider }