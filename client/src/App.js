import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './layouts/home';
import UserForm from './features/authentication/components/UserForm';
import Chessboard from './features/chessboard';

function App() {
  let isAuthenticated = true;

  if (!isAuthenticated) {
    return <UserForm />;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/play/:id">
          <Chessboard></Chessboard>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
