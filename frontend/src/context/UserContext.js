import { createContext, useContext, useState } from "react";

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
        const newUser = await fetch("http://localhost:5000/login", {
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
