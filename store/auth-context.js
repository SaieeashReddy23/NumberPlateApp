
import { createContext,useState } from "react";

export const AuthContext = createContext({
    token:"",
    isAuthenticated: false,
    authenticate : () => {}
});


const AuthContextProvider = ({children}) => {

    const [authToken,setAuthToken] = useState("");
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    const register = (token) => {
        setAuthToken(token);
        setIsAuthenticated(true);
    }

    const openLogin = () => {
        setIsAuthenticated(false);
    }

    const deRegister = () => {
        setAuthToken(""),
        setIsAuthenticated(false);
    }

    const value = {
        token : authToken,
        isAuthenticated : isAuthenticated,
        register : register,
        deRegister:deRegister,
        openLogin:openLogin,
    }

    return <AuthContext.Provider  value={value}  >{children}</AuthContext.Provider>
}


export default AuthContextProvider;