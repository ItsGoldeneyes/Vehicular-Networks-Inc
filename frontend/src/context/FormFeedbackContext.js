import { createContext, useContext, useState } from "react";

const NODE_ENV = process.env.NODE_ENV || 'development';
const BACKEND_URL = NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://backend-group5.up.railway.app/';

export const FormFeedbackContext = createContext(null);

export function FormFeedbackProvider({ children }) {
    const [ poll, setPoll ] = useState(null);
    const [ feedbackForm, setFeedbackForm ] = useState(null);

    const getDefaultPoll = async () => {
    //     const newUser = await fetch(`${BACKEND_URL}/register`, {
    //         method: form.method,
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(formEntries)
    //     })
    //         .then(res => res.json())
    //         .then(
    //             res => {
    //                 if (res.status === 200) {
    //                     return {
    //                         profile_status: res.profile_status,
    //                         username: res.username
    //                     };
    //                 } else {
    //                     alert(`Error Registering: ${res.text}`)
    //                     return null;
    //                 }
    //             }
    //         )
    //         .catch(
    //             err => {
    //                 alert("Error registering account. Check the console for more details.");
    //                 console.error(err);
    //                 return null;
    //             }
    //         );
    //     setIsLoading(false);

    //     setUser(newUser);
    }

    const getFeedbackForm = async () => {
        if(poll === null) {
            // await 
        } else {
            return poll;
        }
    }

    const submitFeedbackForm = async (feedback) => {
        await fetch(`${BACKEND_URL}/submit_feedback`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedback)
        })
            .then(res => res.json())
            .then(
                res => {
                    if (res.status === 200) {
                        return true;
                        // return {
                        //     profile_status: res.profile_status,
                        //     username: res.username
                        // };
                    } else {
                        alert(`Error Submitting Feedback In: ${res.text}`)
                        return false;
                    }
                }
            )
            .catch(
                err => {
                    alert("Error Submiting Feedback. Check the console for more details.");
                    console.error(err);
                    return false;
                }
            );
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
