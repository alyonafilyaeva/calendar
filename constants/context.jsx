import { createContext, useState } from "react";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [conts, setConst] = useState('constatnta')
    let contextData = {
        conts: conts
    }
    return (
        <AuthContext.Provider value={{conts: 'mama'}}>
            {children}
        </AuthContext.Provider>
    )
}