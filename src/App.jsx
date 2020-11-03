import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { New } from './pages/schedules/New';
import { Show } from './pages/schedules/Show';
import { Navbar, Container, NavbarBrand } from 'react-bootstrap';
import { NotFound } from './pages/schedules/NotFound';

const containerStyle = { maxWidth: '600px' };

export function App() {
  return (
    <BrowserRouter>
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container style={containerStyle}>
          <NavbarBrand href="/schedules/new">全員集合！</NavbarBrand>
        </Container>
      </Navbar>
      <Container style={containerStyle}>
        <Switch>
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
