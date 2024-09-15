import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useRegisterMutation } from './authApiSlice';

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const Register = () => {
    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirm, setValidConfirm] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, { isLoading }] = useRegisterMutation();

    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidConfirm(password === confirmPassword);
    }, [password, confirmPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [name, email, password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validName || !validEmail || !validPassword || !validConfirm) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            await register({ name, email, password }).unwrap();
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            navigate('/login');
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Registration Information');
            } else if (err.status === 409) {
                setErrMsg('Email Already Registered');
            } else {
                setErrMsg(err.data?.message);
            }
        }
    };

    const handleNameInput = (e) => setName(e.target.value);
    const handleEmailInput = (e) => setEmail(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
    const handleConfirmPwdInput = (e) => setConfirmPassword(e.target.value);

    const content = isLoading ? <h1>Registering...</h1> : (
        <section className="register-container">
            <div className="register-box">
                <header className="register-header">
                    <h1>Sign Up</h1>
                </header>
                <main className="register-form">
                    <p className={errMsg ? "error-message" : "offscreen"} aria-live="assertive">{errMsg}</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">
                                Name:
                                <span className={validName ? "valid" : "hide"}>✓</span>
                                <span className={validName || !name ? "hide" : "invalid"}>✗</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                onChange={handleNameInput}
                                value={name}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                Email:
                                <span className={validEmail ? "valid" : "hide"}>✓</span>
                                <span className={validEmail || !email ? "hide" : "invalid"}>✗</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                onChange={handleEmailInput}
                                value={email}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Password:
                                <span className={validPassword ? "valid" : "hide"}>✓</span>
                                <span className={validPassword || !password ? "hide" : "invalid"}>✗</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={handlePwdInput}
                                value={password}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_pwd">
                                Confirm Password:
                                <span className={validConfirm && confirmPassword ? "valid" : "hide"}>✓</span>
                                <span className={validConfirm || !confirmPassword ? "hide" : "invalid"}>✗</span>
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={handleConfirmPwdInput}
                                value={confirmPassword}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button" disabled={!validName || !validEmail || !validPassword || !validConfirm}>
                            Sign Up
                        </button>
                    </form>
                </main>
                <footer className="register-footer">
                    <p>
                        Already have an account?<br />
                        <a href="/login">Sign In</a>
                    </p>
                </footer>
            </div>
        </section>
    );

    return content;
};

export default Register;