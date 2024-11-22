import { createContext, useContext, useState } from "react";
import { useUser } from "./UserContext";

const NODE_ENV = process.env.NODE_ENV || 'development';
const BACKEND_URL = NODE_ENV === 'development' ? 'http://127.0.0.1:5000' : 'https://backend-group5.up.railway.app/';

export const SurveyContext = createContext(null);

export function SurveyContextProvider({ children }) {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const getAllForms = async (input) => {
        // user is logged in; not null
        console.assert(!!user);
        setLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/get-forms`, {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input)
            });

            const res = await response.json();

            if (response.ok) {
                return res;
            } else {
                throw new Error(res.text || 'Error Getting Forms');
            }
        } catch (err) {
            console.error("Error Getting Forms:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SurveyContext.Provider value={{ getAllForms, loading }}>
            {children}
        </SurveyContext.Provider>
    );
}

export function useSurvey() {
    return useContext(SurveyContext);
}
