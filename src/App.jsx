import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { New } from './pages/schedules/New';
import { Navbar } from 'react-bootstrap';

export function App() {
  return (
    <>
      <Navbar></Navbar>
      <BrowserRouter>
        <Route exact path="/schedules/new" component={New} />
      </BrowserRouter>
    </>
  );
}
