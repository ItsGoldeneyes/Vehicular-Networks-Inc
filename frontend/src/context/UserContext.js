import { createContext, useContext, useEffect, useState } from "react";

const NODE_ENV = process.env.NODE_ENV || 'development';
const BACKEND_URL = NODE_ENV === 'development' ? 'http://127.0.0.1:5000' : 'https://backend-group5.up.railway.app/';

console.log(`Using backend URL: ${BACKEND_URL}`);
console.log(`Using NODE_ENV: ${NODE_ENV}`);

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if(user === null) {
            localStorage.removeItem("user");
        } else {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    async function userRegister(form) {
        const formData = new FormData(form);
        const formEntries = Object.fromEntries(formData.entries());

        setIsLoading(true);
        const newUser = await fetch(`${BACKEND_URL}/register`, {
            method: form.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formEntries)
        })
            .then(res => res.json())
            .then(
                res => {
                    if (res.status === 200) {
                        return {
                            user_id: res.user_id,
                            profile_status: res.profile_status,
                            username: res.username
                        };
                    } else {
                        alert(`Error Registering: ${res.text}`)
                        return null;
                    }
                }
            )
            .catch(
                err => {
                    alert("Error registering account. Check the console for more details.");
                    console.error(err);
                    return null;
                }
            );
        setIsLoading(false);

        if (user?.user_id) {
            setUser(newUser);
        }
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
                            user_id: res.user_id,
                            profile_status: res.profile_status,
                            username: res.username
                        };
                    } else {
                        alert(`Error Logging In: ${res.text}`)
                        return res;
                    }
                }
            )
            .catch(
                err => {
                    alert("Error logging in. Check the console for more details.");
                    console.error(err);
                    return {
                        status: 400,
                        error: err
                    };
                }
            );
        setIsLoading(false);

        if (newUser?.user_id) {
            setUser(newUser);
        };
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
