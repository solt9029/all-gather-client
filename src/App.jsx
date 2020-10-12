import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { New } from "./pages/schedules/New";

export function App() {
  return (
    <BrowserRouter>
      <Route exact path="/schedules/new" component={New} />
    </BrowserRouter>
  );
}
