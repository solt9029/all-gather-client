import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { New } from './pages/schedules/New';
import { Navbar, Container, NavbarBrand } from 'react-bootstrap';

export function App() {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container>
          <NavbarBrand>全員集合！</NavbarBrand>
        </Container>
      </Navbar>
      <Container>
        <BrowserRouter>
          <Route exact path="/schedules/new" component={New} />
        </BrowserRouter>
      </Container>
    </>
  );
}
