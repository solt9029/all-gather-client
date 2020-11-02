import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { New } from './pages/schedules/New';
import { Show } from './pages/schedules/Show';
import { Navbar, Container, NavbarBrand } from 'react-bootstrap';

const containerStyle = { maxWidth: '800px' };

export function App() {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container style={containerStyle}>
          <NavbarBrand>全員集合！</NavbarBrand>
        </Container>
      </Navbar>
      <Container style={containerStyle}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/schedules/new" component={New} />
            <Route exact path="/schedules/:id" component={Show} />
          </Switch>
        </BrowserRouter>
      </Container>
    </>
  );
}
