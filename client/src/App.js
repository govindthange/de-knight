import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './layouts/home';
import UserForm from './features/authentication/components/UserForm';
import Chessboard from './features/chessboard';
import {useDispatch, useSelector} from 'react-redux';
import {initialize, hasLoggedIn} from './features/authentication/authenticationSlice';
import Swap from './features/swap';
import GreetContracts from './features/greet-contracts';

function App() {
  const dispatch = useDispatch();
  let isLoggedIn = useSelector(hasLoggedIn);

  useEffect(() => {
    dispatch(initialize());
  }, []);

  if (!isLoggedIn) {
    return <UserForm />;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/play/:id">
          <Chessboard></Chessboard>
        </Route>
        <Route path="/swap">
          <Swap />
        </Route>
        <Route path="/greet">
          <GreetContracts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
