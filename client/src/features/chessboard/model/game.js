import * as Chess from 'chess.js';
import {BehaviorSubject} from 'rxjs';

//
// FEN position to test various scenarios
//
// Scenario 1. Promotion of pawns
const TEST_PROMOTION_SCENARIO = 'rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5';

// Scenario 2. There is a draw and the other user can't make any moves.
const TEST_STALE_MATE_SCENARIO = '4k3/4P3/4K3/8/8/8/8/8 b - - 0 78';

// Scenario 3. There is a check mate and user can't make any moves.
const TEST_CHECK_MATE_SCENARIO = 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3';

// Scenario 4. There are insufficient pieces.
const TEST_INSUCCICIENT__PIECES_SCENARIO = `k7/8/n7/8/8/8/8/7K b - - 0 1`;

const chess = new Chess();

export let subjectObservable = new BehaviorSubject();

let currentPlayer;
let multiplayerGame = null;
let sendGameToRemotePlayer;

export async function start(gameId, currentUser, fetchGameById, saveGame) {
  if (fetchGameById) {
    sendGameToRemotePlayer = saveGame;

    const initialGame = await fetchGameById(gameId).then(obj => {
      return obj;
    });

    if (!initialGame) {
      alert('The remote game no more exists!');
      return 'no-remote-game-found';
    }

    // If this game is in waiting and currentUser is not the creator (player #1)
    // then you, the currentUser, are the opponent to the creator.
    const player = initialGame.players.find(m => m.creator === true);
    if (initialGame.status === 'waiting' && player.uid !== currentUser.uid) {
      const opponent = {
        uid: currentUser.uid,
        name: currentUser.name,
        piece: player.piece === 'w' ? 'b' : 'w'
      };

      let players = [...initialGame.players, opponent];

      multiplayerGame = Object.assign(initialGame, {id: gameId, players: players, status: 'ready'});
      sendGameToRemotePlayer(multiplayerGame);
    }
    // If the current game is not in waiting and you are not part of the players list
    else if (!initialGame.players.map(m => m.uid).includes(currentUser.uid)) {
      alert('You are not part of the players list for this game!');
      return 'intruder';
    } else if (initialGame.status === 'waiting') {
      multiplayerGame = Object.assign(initialGame, {id: gameId});
    }
    chess.reset();

    applyRemotePlayerGame(currentUser, initialGame);

    return 'multiplayer-game-object-ready';
  } else {
    multiplayerGame = null;
    currentPlayer = null;
    sendGameToRemotePlayer = null;

    const prevoiusGameState = localStorage.getItem('de-chess/game/standalone');
    if (prevoiusGameState) {
      chess.load(prevoiusGameState);
    }

    updateSubject();
    return 'standalone-game-object-ready';
  }
}

export function reset() {
  if (multiplayerGame) {
    updateSubject(null, true);
    chess.reset();
  } else {
    chess.reset();
    updateSubject();
  }
}

function updateSubject(pendingPromotion, reset) {
  const isGameOver = chess.game_over();

  if (multiplayerGame) {
    const updatedGame = {
      ...multiplayerGame,
      gameData: chess.fen(),
      pendingPromotion: pendingPromotion || null
    };

    if (reset) {
      updatedGame.status = 'over';
    }

    localStorage.setItem('de-chess/game/remote/data', JSON.stringify(updatedGame));
    console.log(`before multiplayer game: ${JSON.stringify(multiplayerGame)}`);

    console.log(`after multiplayer game: ${JSON.stringify(updatedGame)}`);
    sendGameToRemotePlayer(updatedGame);
  } else {
    const updatedSubject = {
      board: chess.board(),
      pendingPromotion,
      position: chess.turn(),
      isGameOver,
      result: isGameOver ? getResult() : null
    };

    localStorage.setItem('de-chess/game/standalone', chess.fen());

    subjectObservable.next(updatedSubject);
  }
}

export function applyRemotePlayerGame(currentUser, game) {
  !game && alert('No game object received from the remote player!');
  !game.players && alert('Game object received from remote is problematic.');

  // Check newly added players in the received game object's players list.
  let newPlayers = game.players.filter(
    newPlayer =>
      !multiplayerGame.players.some(existingPlayer => existingPlayer.uid === newPlayer.uid)
  );

  // Add the newly found players to our global multiplayerGame object's players list.
  if (newPlayers.length > 0) {
    for (let newPlayer of newPlayers) {
      alert(`The opponent has joined! ${JSON.stringify(newPlayer)}`);
      multiplayerGame.players.push(newPlayer);
    }
  }

  const {pendingPromotion, gameData, ...restOfGame} = game;
  const player = game.players.find(m => m.uid === currentUser.uid);
  const opponent = game.players.find(m => m.uid !== currentUser.uid);

  if (gameData) {
    chess.load(gameData);
  }

  const isGameOver = chess.game_over();

  subjectObservable.next({
    board: chess.board(),
    pendingPromotion,
    isGameOver,
    position: player.piece,
    player,
    opponent,
    result: isGameOver ? getResult() : null,
    ...restOfGame
  });

  currentPlayer = player;
}

export function getResult() {
  if (chess.in_checkmate()) {
    const winner = chess.turn() === 'w' ? 'Dark' : 'Light';
    return `Checkmate - Winner - ${winner}`;
  } else if (chess.in_draw()) {
    let reason = '50 Moves Rule';
    if (chess.in_stalemate()) {
      reason = 'Stalemate';
    } else if (chess.in_threefold_repetition()) {
      reason = 'Repetition';
    } else if (chess.insufficient_material()) {
      reason = 'Insufficient pieces';
    }

    return `Draw - ${reason}`;
  } else {
    return '';
  }
}

export function handleMove(from, to) {
  const allPossibleMoves = chess.moves({verbose: true});
  const onlyPromotableMoves = allPossibleMoves.filter(m => m.promotion);

  let canPromote = onlyPromotableMoves.some(p => `${p.from}:${p.to}` === `${from}:${to}`);
  if (canPromote) {
    // console.table(onlyPromotableMoves);

    // All items of onlyPromotableMoves would've same color value
    // so its safe to use promotions[0] to fetch color property.
    const pendingPromotion = {from, to, color: onlyPromotableMoves[0].color};
    updateSubject(pendingPromotion);
    console.log('This piece awaits a promotion! The pending promotion is: %o', pendingPromotion);
  }

  const {pendingPromotion} = subjectObservable.getValue();
  if (pendingPromotion) {
    // Once you reach a state where there is a promotion which is pending
    // then you can't move any piece other than the one that awaits a promotion.
    console.log('There is a pending promotion!');
  } else {
    // You can apply move as there is no promotion.
    move(from, to);
  }
}

// This function validates and moves piece as per the
// 'to' location specified in chess' algebraic notation.
export function move(from, to, promotion) {
  let theMove = {from, to};
  if (promotion) {
    theMove.promotion = promotion;
  }

  if (multiplayerGame) {
    if (currentPlayer.piece === chess.turn()) {
      // .move() won't work for a pawns on verge of being promoted.
      const isMoveAllowed = chess.move(theMove);
      if (isMoveAllowed) {
        updateSubject();
      }
    }
  } else {
    // .move() won't work for a pawn who is on the verge of being promoted.
    const isMoveAllowed = chess.move(theMove);
    if (isMoveAllowed) {
      updateSubject();
    }
  }
}
