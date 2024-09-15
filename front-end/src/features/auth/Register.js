import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from './authApiSlice';
import CryptoJS from 'crypto-js';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    useEffect(() => {
        // Load the last used email from local storage
        const lastEmail = localStorage.getItem('lastEmail');
        if (lastEmail) {
            setEmail(lastEmail);
        }
        setErrMsg('');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrMsg("Passwords don't match");
            return;
        }
        try {
            await register({ email, password }).unwrap();
            
            // Save the email and encrypted password to local storage
            localStorage.setItem('lastEmail', email);
            const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
            localStorage.setItem('lastPassword', encryptedPassword);

            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Invalid Registration Data');
            } else {
                setErrMsg(err.data?.message || 'Registration Failed');
            }
        }
    };

    const handleEmailInput = (e) => setEmail(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
    const handleConfirmPwdInput = (e) => setConfirmPassword(e.target.value);

    const content = isLoading ? (
        <div className="register-container">
            <h1>Loading...</h1>
        </div>
    ) : (
        <div className="register-container">
            <div className="register-box">
                <header className="register-header">
                    <h1>Register</h1>
                </header>
                <main className="register-form">
                    {errMsg && <p className="error-message" aria-live="assertive">{errMsg}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                onChange={handleEmailInput}
                                value={email}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={handlePwdInput}
                                value={password}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirm-password"
                                onChange={handleConfirmPwdInput}
                                value={confirmPassword}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">Register</button>
                    </form>
                </main>
                <footer className="register-footer">
                    <p>
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </footer>
            </div>
        </div>
    );

    return content;
};

export default Register;