import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Nav from '../Nav';

import CardProxyManagement from '../CardProxyManagement';
import DeckMarkerManagement from '../DeckMarkerManagement';

export default function App() {
  return (
    <Router>
      <div>

        <Nav />
        
        <main>
            <Switch>
              <Route path="/cards">
                <CardProxyManagement />
              </Route>
              <Route path="/decks">
                <DeckMarkerManagement />
              </Route>
            </Switch>
        </main>

      </div>
    </Router>
  );
}