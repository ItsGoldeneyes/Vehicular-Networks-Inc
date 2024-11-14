import { createContext, useContext, useState } from "react";

// pull BACKEND_URL environment variable
if (!process.env.REACT_APP_BACKEND_URL) {
    const BACKEND_URL = "http://localhost:5000";
    console.error("REACT_APP_BACKEND_URL environment variable not set");
}
else {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    console.log("REACT_APP_BACKEND_URL: " + process.env.REACT_APP_BACKEND_URL);
}



export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [ user, setUser ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    async function userRegister(form) {
        alert("Not implemented");
        setUser(null);
    }

    async function userAuth(form) {
        const formData = new FormData(form);
        const formEntries = Object.fromEntries(formData.entries());

        setIsLoading(true);
        const newUser = await fetch(`${BACKEND_URL}/login`, {
            method: form.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formEntries)
        })
            .then(res => res.json())
            .then(
                res => {
                    if (res.status === 200) {
                        return {
                            profile_status: res.profile_status,
                            username: res.username
                        };
                    } else {
                        // console.log("Login: Fail")
                        // console.log(res)
                        return null;
                    }
                }
            )
            .catch(
                err => {
                    alert("Error logging in. Check the console for more details.");
                    console.error(err);
                    return null;
                }
            );
        setIsLoading(false);

        setUser(newUser);
    };

    const userLogOut = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, userRegister, userAuth, userLogOut, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
