import React, { useEffect, useId } from "react";
import styles from './Login.module.css';
import { NavLink } from "react-router-dom";

export default function Register() {
    const emailId = useId();
    const passId = useId();

    useEffect(() => {
        document.title = "Login - FleetRewards";
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        fetch('/some-api', { method: form.method, body: formData });
        console.log(Object.fromEntries(formData.entries()));
    }

    return (<>
        <main className={styles.main}>
            <h2>Log In</h2>
            <p>Fields marked with <span className={styles.required} /> are required.</p>
            <form method="post" onSubmit={handleSubmit} className={styles.registerForm}>
                <label htmlFor={emailId} className={styles.registerLabel}>Email<span className={styles.required} /></label>
                <input id={emailId} className={styles.registerInput} name="email" type="email" maxLength={50} required />

                <label htmlFor={passId} className={styles.registerLabel}>Password<span className={styles.required} /></label>
                <input id={passId} className={styles.registerInput}name="pass" type="password" maxLength={30} required />

                <button className={styles.submit} type="submit">Login</button>
            </form>
            <p>Don't have an account? <NavLink to="/register">Register Now</NavLink></p>
        </main>
    </>)
}
