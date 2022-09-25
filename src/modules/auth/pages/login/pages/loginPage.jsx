import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../../../utils/firebase";
import { loginInWithGoogle, logInWithEmailAndPassword } from "../../../services/loginService";
import "./login.css";
import { useDispatch } from 'react-redux';
import { setUid, setUser } from "../../../redux/authSlice";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) console.log(error)
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) handleLoginSuccessful()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);

    const handleLoginSuccessful = () => {
        dispatch(setUser(user.providerData[0]))
        dispatch(setUid(user.uid))
        navigate("/stickers");
    }

    return (
        <div className="login">
            <div className="login__container">
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login__btn"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                <button className="login__btn login__google" onClick={loginInWithGoogle}>
                    Login with Google
                </button>
                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}
export default Login;

export { }