
import { createContext,useState } from "react";

export const AuthContext = createContext({
    token:"",
    isAuthenticated: false,
    authenticate : () => {}
});


const AuthContextProvider = ({children}) => {

    const [authToken,setAuthToken] = useState("Hello");

    const authenticate = (token) => {
        setAuthToken(token);
    }

    const value = {
        token : authToken,
        isAuthenticated : !!authToken,
        authenticate : authenticate,
    }

    return <AuthContext.Provider  value={value}  >{children}</AuthContext.Provider>
}


export default AuthContextProvider;