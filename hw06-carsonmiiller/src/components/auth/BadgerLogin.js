import { React, useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BadgerLoginContext from '../context/BadgerLoginContext';

export default function BadgerLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useContext(BadgerLoginContext);
    const navigate = useNavigate();

    const login = () => {
        // check if all fields are valid
        if(username === "" || password === "") {
            alert("Please fill out all fields");
            return;
        }

        // making a POST request to the API to log user in
        fetch("https://www.cs571.org/s23/hw6/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CS571-ID": "bid_f6cf574eb476d5ada941"
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials: "include"
        }).then(res => {
            if (res.status === 200) {
                setLoggedIn(true);
                alert('Successfully logged in!')
                navigate('/');
                return res.json();
            } else if (res.status === 404) {
                alert('Incorrect username!')
            } else if (res.status === 401) {
                alert('Incorrect password!')
            } else {
                throw new Error()
            }
        }).then(json => {
            console.log("Received back...");
            console.log(json);
        }).catch(e => {
            alert('An error occured while making the request')
        })
    }

    return <>
        <h1>Login</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
        </Form>
        <Button variant="primary" onClick={login}>Login</Button>
    </>
}