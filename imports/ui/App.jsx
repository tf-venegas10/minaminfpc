import React, { Component } from "react";
import { Navbar, Nav, NavItem, } from "react-bootstrap";

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar inverse collapseOnSelect className="customNav">
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/#">Presupuestos InfraTel</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="/proyectos">Proyectos</NavItem>
                <NavItem eventKey={2} href="/materiales">Materiales</NavItem>
                <NavItem eventKey={3} href="/mo">Mano De Obra</NavItem>
                <NavItem eventKey={4} href="/transportes">Transporte</NavItem>
                <NavItem eventKey={5} href="/hye">Herramientas Y Equipos</NavItem>
              </Nav>
              <Nav pullRight>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
      </div>
    );
  }
}

export default App;
