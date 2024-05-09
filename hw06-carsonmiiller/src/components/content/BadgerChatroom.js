import React, { useEffect, useState, useContext } from "react"
import BadgerMessage from "./BadgerMessage";
import BadgerLoginContext from "../context/BadgerLoginContext";
import { Form, Button } from "react-bootstrap";

export default function BadgerChatroom(props) {
    const [messages, setMessages] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loggedIn, setLoggedIn] = useContext(BadgerLoginContext);
    const [user, setUser] = useState("");

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_f6cf574eb476d5ada941"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    function post(){
        if (title === "" || content === "") {
            alert("Please fill out all fields!");
            return;
        }
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_f6cf574eb476d5ada941",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                content: content
            }),
            credentials: "include"
        }).then(res => res.json()).then(json => {
            alert("Post created successfully!")
            loadMessages();
        })
    };

    useEffect(() => {
        loadMessages()
    }, [props]);

    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/whoami', {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_f6cf574eb476d5ada941",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => {
            if (res.status === 401) {
                alert("You are not logged in!")
            }
            return res.json()
        }).then(json => {
            console.log("Received back...");
            setUser(json["user"]["username"]);
        }).catch(e => {
            alert('An error occured while making the request')
        })
    }, []);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            loggedIn ?
                <>
                    <Form>
                        <Form.Group className="mb-3" controlId="postTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="title" placeholder="Post Title..." onChange={(e) => setTitle(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={3} type="content" placeholder="Post Content..." onChange={(e) => setContent(e.target.value)}/>
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={post}>Create Post</Button>
                </>
                :
                <>
                    <p>You must be logged in to post!.</p>
                </>
        }
        <hr/>
        {
            messages.length > 0 ?
                <>                    {
                        messages.map(message => {
                            return <BadgerMessage key={message.id} id ={message.id} title={message.title} content={message.content} poster={message.poster} created={message.created} loadMessages={loadMessages} user={user} room={props.name}/>
                            
                        })
                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>
}