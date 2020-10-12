import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

function Home() {
  return <div>home</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
    </BrowserRouter>
  );
}

export default App;
