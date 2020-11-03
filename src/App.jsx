import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { New } from './pages/schedules/New';
import { Show } from './pages/schedules/Show';
import { Navbar, Container, NavbarBrand } from 'react-bootstrap';
import { NotFound } from './pages/NotFound';
import { Top } from './pages/Top';

const containerStyle = { maxWidth: '600px' };

export function App() {
  return (
    <BrowserRouter>
      <Navbar bg="white" className="mb-4">
        <Container style={containerStyle}>
          <NavbarBrand href="/">
            <b>全員集合！</b>
          </NavbarBrand>
        </Container>
      </Navbar>
      <Container style={containerStyle}>
        <Switch>
          <Route exact path="/" component={Top} />
          <Route exact path="/schedules/new" component={New} />
          <Route exact path="/schedules/:id" component={Show} />
          <Route component={NotFound} />
        </Switch>
      </Container>
      <Container
        fluid
        className="mt-5 mb-3"
        style={{
          textAlign: 'center',
        }}
      >
        <small>Copyright © Kenshi Shiode. All Rights Reserved.</small>
      </Container>
    </BrowserRouter>
  );
}
