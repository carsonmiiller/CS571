import { Button } from "react-bootstrap";
import { useState, React, useEffect } from "react";

function BadgerMessage(props) {

    const dt = new Date(props.created);

    function deletePost(){
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.room}/messages/${props.id}`, {
            method: "DELETE",
            headers: {
                "X-CS571-ID": "bid_f6cf574eb476d5ada941",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            alert("Post deleted successfully!")
            props.loadMessages();
        })
    };


    return <>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/><br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            props.poster === props.user ? <Button variant="danger" onClick={deletePost}>Delete</Button> : null
        }
    </>
}

export default BadgerMessage;