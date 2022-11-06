import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import GameSelection from './features/chessboard/components/GameSelection';
import Home from './layouts/home';
import UserForm from './features/authentication/components/UserForm';
import Chessboard from './features/chessboard';
import {useSelector} from 'react-redux';
import {hasLoggedIn} from './features/authentication/authenticationSlice';

function App() {
  const isLoggedIn = useSelector(hasLoggedIn);

  if (!isLoggedIn) {
    return <UserForm />;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game-selection">
          <GameSelection />
        </Route>
        <Route path="/play/:id">
          <Chessboard></Chessboard>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
