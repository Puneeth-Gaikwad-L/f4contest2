import React, { useState, useEffect } from "react";
import axios from "axios"

const Card = () => {

    const [user, setUser] = useState({ username: "", password: "" });
    const [apiResponse, setapiResponse] = useState(null)

    function updateUser(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function implementSignIn(e) {
        e.preventDefault();
        console.log(user);
        try {
            const response = await axios.post( 'https://dummyjson.com/auth/login',
                {
                    username: user.username,
                    password: user.password
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setapiResponse(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log(apiResponse);
        localStorage.setItem('apiResponse', JSON.stringify(apiResponse));
    }, [apiResponse]);

    return (
        <div className="card" onSubmit={implementSignIn}>
            <div className="card-header">
                <p>Welcome back! 👋</p>
                <h3>Sign in to your account</h3>
            </div>
            <form className="form">
                <label htmlFor="username">Your email</label>
                <input id="username" type="text" placeholder="username" onChange={updateUser} name="username" />
                <br />
                <label hidden="password">Password</label>
                <input id="password" type="password" placeholder="password" onChange={updateUser} name="password" />
                <br />
                <button className="submit-btn" type="submit">Continue</button>
            </form>
            <a href="" className="card-footer">Forgot your password?</a>
        </div>
    )
}

export default Card;