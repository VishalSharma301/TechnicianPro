import { createContext, PropsWithChildren, useState } from "react";

interface AuthContext {
    isAuthenticated : boolean,
    setIsAuthenticated : (value : boolean)=>void
}


export const AuthContext = createContext<AuthContext>({
    isAuthenticated : false,
    setIsAuthenticated : ()=>{}
})

export default function AuthContextProvider ({children}:PropsWithChildren) {
const [isAuthenticated, setIsAuthenticated] = useState(false);

const value = {
    isAuthenticated,
    setIsAuthenticated
}

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
};

