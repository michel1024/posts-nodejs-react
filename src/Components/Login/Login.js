import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import login from "../../Assets/Images/login.svg";
import Navigation from "../Navigation/Navigation";
import Alert from "../Alert/Alerts";

const Login = () => {
    const [token, setToken] = useState(null);
    const [loginErr, setLoginErr] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        const tokenStorage = localStorage.getItem('token');
        console.log({token});
        if (tokenStorage) {
            setToken(tokenStorage)
            window.location.href = "/posts";
        }
    }, [token]);

    const handleLogin = (e) => {
        e.preventDefault();

        const login_url = "http://localhost:3001/api/users/login";

        const userLogin = {
            email,
            password
        }

        fetch(login_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userLogin)
        })
            .then(response => response.json())
            .then(result => {
                console.log({result});
                if (result.tokenSession) {
                    setToken(result.tokenSession);
                    localStorage.setItem('token', result.tokenSession);
                    window.location.href = "/posts";
                }else{
                    setLoginErr(true);
                }
            })
            .catch(err => {
                console.log(err)
                setLoginErr(true);
            })
    }

    return(
        <div className="container" style={{marginTop: "100px"}}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="flex-grow-1">
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="email" 
                                onChange={e => setEmail(e.target.value)} 
                                className="form-control" 
                                placeholder="Email" 
                            />
                        </div>
                        <div className="form-group mt-4">
                            <input 
                                type="password" 
                                onChange={e => setPassword(e.target.value)}
                                className="form-control" 
                                placeholder="Password" 
                            />
                        </div>
                        <Alert loginErr={loginErr} setLoginErr={setLoginErr} bs_class={"alert-danger"} text={"The email or password are invalid"} />
                        <div className="form-group mt-5 d-flex justify-content-center align-items-center">
                            <button type="submit" className="btn btn-info px-5" style={{fontSize: "16px"}}>Login</button>
                            <p className="mx-3" style={{fontSize: "16px", marginTop: "1rem"}}>or</p>
                            <button type="button" className="btn btn-success px-5" style={{fontSize: "16px"}}>Sign up</button>
                        </div>
                    </form>
                </div>
                <div>
                    <img width="700" src={login} alt="login" />
                </div>
            </div>
        </div>
    );
}

export default Login;