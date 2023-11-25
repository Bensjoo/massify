import React from 'react';
import Container from 'react-bootstrap/Container';
import NavLink from 'react-bootstrap/NavLink';
import Navbar from 'react-bootstrap/Navbar';

const MainNav: React.FC = () => {
    return (
        <Navbar variant="dark" bg="dark">
        <Container fluid="true">
          <NavLink className="navbar-brand" href="/">Massify 🍺</NavLink>

          <NavLink className="navbar-text" href="/users"> Users 🙋</NavLink>
        </Container>
      </Navbar>
    )
}

export default MainNav