import React, { useEffect, useId } from "react";
import styles from './Register.module.css';
import { NavLink } from "react-router-dom";

export default function Register() {
    const nameId = useId();
    const emailId = useId();
    const passId = useId();
    const passConfirmId = useId();

    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [email, setEmail] = useState("");

    useEffect(() => {
        document.title = "Register - FleetRewards";
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        fetch('/some-api', { method: form.method, body: formData });
        console.log(Object.fromEntries(formData.entries()));
    }

    return (<>
        <div className={styles.container}>
            <h2>Sign Up</h2>
            <p>Fields marked with <span className={styles.required} /> are required.</p>
            <form method="post" onSubmit={handleSubmit} className={styles.registerForm}>
                <label htmlFor={nameId} className={styles.registerLabel}>Name<span className={styles.required} /></label>
                <input id={nameId} className={styles.registerInput} name="name" type="text" maxLength={20} required />
                
                <label htmlFor={emailId} className={styles.registerLabel}>Email<span className={styles.required} /></label>
                <input id={emailId} className={styles.registerInput} name="email" type="email" maxLength={50} required />

                <label htmlFor={passId} className={styles.registerLabel}>Password<span className={styles.required} /></label>
                <input id={passId} className={styles.registerInput}name="pass" type="password" maxLength={30} required />

                <label htmlFor={passConfirmId} className={styles.registerLabel}>Confirm Password<span className={styles.required} /></label>
                <input id={passConfirmId} className={styles.registerInput} name="pass-confirm" type="password" maxLength={30} required />

                <button className={styles.submit} type="submit">Create Account</button>
            </form>
            <p>Already have an account? <NavLink to="/login">Log In</NavLink></p>
        </div>
    </>)
}
