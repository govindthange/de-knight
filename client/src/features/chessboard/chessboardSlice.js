import {createSlice} from '@reduxjs/toolkit';
import {sub} from 'date-fns';

const chessboardSlice = createSlice({
  name: 'chessboard',
  initialState: {currentPlayer: null, opponentPlayer: null, position: null, game: null},
  reducers: {
    // When we write these functions here then
    // createSlice() automatically generates an
    // action-creator function w/ the same name.
    // Now, when we do an export later in the code,
    // we are essentially exporting the action-creator
    // functions which are automatically created.
    setCurrentPlayer: (mutableState, action) => {
      // Generally you should not change the state
      // but react toolkit (RTK) uses Immer js internally.
      // (Immer js creates a new state internally for you)
      // That's how Immer allow you to mutate state directly.
      mutableState.currentPlayer = action.payload;
    },
    setPosition: (mutableState, action) => {
      mutableState.position = action.payload;
    },
    setGame: (mutableState, action) => {
      mutableState.game = action.payload;
      console.log('Game saved in store as: %o', mutableState.game);
      localStorage.setItem('de-chess/game/remote', JSON.stringify(action.payload));
    },
    fetchGame: mutableState => {
      let str = window.localStorage.getItem('de-chess/game/remote');
      mutableState.game = JSON.parse(str);
      console.log('Game saved in store as: %o', mutableState.game);
    }
  }
});

// Note that we didn't setup action-creator manually!
// We actually setup a function that automatically returns it.
export const {setCurrentPlayer, setPosition, setGame, fetchGame} = chessboardSlice.actions;

// Create a state selector in the slice for data points
// which you foresee might change in the future.
// If the shape of this state ever changed we wouldn't
// have to go through and change each component.
// We just change it once here in the slice.
export const getCurrentPlayer = state => state.chessboard.currentPlayer;
export const getPosition = state => state.chessboard.position;
export const getGame = state => state.chessboard.game;

export default chessboardSlice.reducer;
