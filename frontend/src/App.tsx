import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import OtherPage from "./OtherPage"
import FibPage from "./FibPage"

function App() {
  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <Link to="/fib">HOME</Link>
            <Link to="/otherpage">Other Page</Link>
            <div>
              <Route exact path="/fib" component={FibPage} />
              <Route path="/otherpage" component={OtherPage} />
            </div>
          </header>
        </div>
      </Router>
  );
}

export default App;