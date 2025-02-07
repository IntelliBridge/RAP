import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (auth) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuth: setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
