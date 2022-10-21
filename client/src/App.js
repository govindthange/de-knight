import './App.css';
import {useSelector} from 'react-redux';
import Login from './features/authentication/components/Login';
import Home from './layouts/home';
import {hasLoggedIn} from './features/authentication/authenticationSlice';
import Chessboard from './features/chessboard';

function App() {
  const isLoggedIn = useSelector(hasLoggedIn);

  return (
    <>
      {!isLoggedIn && <Login />}
      {isLoggedIn && <Home />}
      <Chessboard />
    </>
  );
}

export default App;
