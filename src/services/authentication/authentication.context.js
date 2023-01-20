import React, { useState, createContext } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { loginRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvicer = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    firebase.auth().onAuthStateChanged((usr) => {
        if (usr) {
            setUser(usr);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    })

    const onLogin = (email, password) => {
        setIsLoading(true);
        loginRequest(email, password).then((u) => {
            setUser(u);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            setError(err.toString());
        })
    };

    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                isLoading,
                error,
                onLogin,
            }}>
            {children}
        </AuthenticationContext.Provider>
    );
}