import { createContext, useContext, useState } from "react";
import { useUser } from "./UserContext";

const NODE_ENV = process.env.NODE_ENV || 'development';
const BACKEND_URL = NODE_ENV === 'development' ? 'http://127.0.0.1:5000' : 'https://backend-group5.up.railway.app/';

export const FormFeedbackContext = createContext(null);

export function FormFeedbackProvider({ children }) {
    const [ poll, setPoll ] = useState(null);
    const [ feedbackForm, setFeedbackForm ] = useState(null);
    const { user } = useUser();

    const getDefaultPoll = async () => {
    }

    const getFeedbackForm = async () => {
        if(poll === null) {
            // await
        } else {
            return poll;
        }
    }

    const submitFeedbackForm = async (feedback) => {
        const res = await fetch(`${BACKEND_URL}/submit-form`, {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedback)
        })
            .then(res => res.json())
            .then(
                res => {
                    if (res.status === 200) {
                        return res;
                    } else {
                        alert(`Error Submitting Feedback In: ${res.text}`)
                        return res;
                    }
                }
            )
            .catch(
                err => {
                    alert("Error Submiting Feedback. Check the console for more details.");
                    console.error(err);
                    return err;
                }
            );
        
        return res;
    }

    return (
        <FormFeedbackContext.Provider value={{ getDefaultPoll, getFeedbackForm, submitFeedbackForm }}>
            {children}
        </FormFeedbackContext.Provider>
    );
}

export function useFormFeedback() {
    return useContext(FormFeedbackContext);
}
