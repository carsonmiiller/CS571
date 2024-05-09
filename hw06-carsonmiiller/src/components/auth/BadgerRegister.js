import { React, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

export default function BadgerRegister() {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const register = () => {
        // check if all fields are valid
        if(username === "" || password1 === "" || password2 === "") {
            alert("Please fill out all fields");
            return;
        } else if (password1 !== password2) {
            alert("Passwords don't match");
            return;
        }

        // making a POST request to the API to register user
        fetch("https://www.cs571.org/s23/hw6/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CS571-ID": "bid_f6cf574eb476d5ada941"
            },
            body: JSON.stringify({
                username: username,
                password: password1
            }),
            credentials: "include"
        }).then(res => {
            if (res.status === 200) {
                alert('Successfully registered!')
                return res.json();
            } else if (res.status === 409) {
                alert('Username already exists')
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

    return <div>
        <h1>Register</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword1(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password2">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password again" onChange={(e) => setPassword2(e.target.value)}/>
            </Form.Group>
        </Form>
        <Button variant="primary" onClick={register}>Register</Button>
    </div>
}