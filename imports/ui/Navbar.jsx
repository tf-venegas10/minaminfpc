import React, { Component } from 'react';
import { Navbar, Nav, NavItem, } from "react-bootstrap";
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export default class Navb extends Component {

    render() {
        return (
            <div className="Navbar">
                <header className="App-header">
                    <Navbar inverse collapseOnSelect className="customNav">
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="/">Minuto a Minuto</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <NavItem eventKey={1} href="/teams">Equipos</NavItem>
                                <NavItem eventKey={2} href="/h2h">Compara</NavItem>
                                <NavItem eventKey={3} href="/schedule">Calendario</NavItem>
                                <NavItem eventKey={4} href="/login">Ingresa</NavItem>
                            </Nav>
                            <Nav pullRight>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </header>
            </div>
        );
    }

};