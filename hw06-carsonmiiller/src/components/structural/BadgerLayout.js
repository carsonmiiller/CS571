import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import BadgerLoginContext from "../context/BadgerLoginContext";

import crest from '../../assets/uw-crest.svg'

function BadgerLayout(props) {
    const [loggedIn, setLoggedIn] = useContext(BadgerLoginContext);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {
                            loggedIn ?
                                <>
                                    <Nav.Link as={Link} to="logout">Logout</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link as={Link} to="login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="register">Register</Nav.Link>
                                </>
                        }
                        <NavDropdown title="Chatrooms">
                                <NavDropdown.Item as={Link} to="chatrooms/bascom">Bascom</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="chatrooms/brogden">Brogden</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="chatrooms/chamberlin">Chamberlin</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="chatrooms/grainger">Grainger</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="chatrooms/ingraham">Ingraham</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="chatrooms/vanvleck">Van Vleck</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="chatrooms/vilas">Vilas</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                </Container>
            </Navbar>
            <div className="body-spacer">
                <Outlet />
            </div>
        </div>
    );
}

export default BadgerLayout;