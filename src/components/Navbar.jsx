import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const CustomNavbar = ({ user }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container">
        <Navbar.Brand href="/">Filmoteka</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/movies">Filmy</Nav.Link>
          <Nav.Link as={Link} to="/series">Seriale</Nav.Link>
            {/* {user && (
              <>
                <Nav.Link href="/movies">Filmy</Nav.Link>
                <Nav.Link href="/series">Seriale</Nav.Link>
              </>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default CustomNavbar;
