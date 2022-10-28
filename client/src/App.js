import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './layouts/home';
import UserForm from './features/authentication/components/UserForm';
import Chessboard from './features/chessboard';
import SocketIoDemo from './features/chat/components/SocketIoDemo';
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
          <Home></Home>
        </Route>
        <Route path="/play/:id">
          <Chessboard></Chessboard>
          <SocketIoDemo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
