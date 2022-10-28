import * as Chess from 'chess.js';
import {BehaviorSubject} from 'rxjs';
import {map, tap} from 'rxjs/operators';

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

let multiplayerGameId;
let currentPlayer;
let multiplayerGame = {};
let sendGameToRemotePlayer;
let players;

export async function start(
  gameId,
  currentUser,
  multiplayerGameObject,
  fetchRemoteGameById,
  saveGame,
  remoteGameObservable
) {
  if (multiplayerGameObject) {
    multiplayerGameId = gameId;
    sendGameToRemotePlayer = saveGame;

    // Fetch the initial remote game object
    const initialGame = fetchRemoteGameById(gameId);
    // console.log('initialGame (before add opponent): %o', initialGame);
    if (!initialGame) {
      alert('The remote game no more exists!');
      return 'no-remote-game-found';
    }

    // If this game is in waiting and currentUser is not the creator (player #1)
    // i.e. you, the currentUser, are the other player #2.
    const player1 = initialGame.members.find(m => m.creator === true);
    if (initialGame.status === 'waiting' && player1.uid !== currentUser.uid) {
      const player2 = {
        uid: currentUser.uid,
        name: currentUser.name,
        piece: player1.piece === 'w' ? 'b' : 'w'
      };

      players = [...initialGame.members, player2];
      // multiplayerGame = {...initialGame, members: players, status: 'ready'};
      multiplayerGame = {...Object.assign(multiplayerGame, {members: players, status: 'ready'})};

      console.log('MULTIPLAYERGAME 1' + JSON.stringify(multiplayerGame));
      sendGameToRemotePlayer(multiplayerGame);
    }
    // If the current game is not in waiting and you are not in the members list
    else if (!initialGame.members.map(m => m.uid).includes(currentUser.uid)) {
      alert('The game is not in waiting state and you are not in members list');
      return 'intruder';
    } else if (initialGame.status === 'waiting') {
      multiplayerGame = fetchRemoteGameById(gameId);
      players = multiplayerGame.members;
      alert(multiplayerGame.members.length);
    }
    // alert(multiplayerGame);
    console.log('MULTIPLAYERGAME 2' + JSON.stringify(multiplayerGame));
    // console.log('initialGame (after add opponent): %o', initialGame);
    chess.reset();

    // Fetch the updated (not the initial one) remote game object.
    // If it was player #2, the game object would have been updated
    // by the 1st if-condition above.
    applyRemotePlayerGame(currentUser, fetchRemoteGameById(gameId));
    // applyRemotePlayerGame(currentUser, multiplayerGame);

    // const gameObject = await multiplayerGameObject().then(obj => obj.currentGame);

    // // TODO: We need to put rxjs observable that wraps
    // // response from the socket client - play events.
    // // REmove new BehaviorSubject() call after you add it.
    // subjectObservable = remoteGameObservable.pipe(
    //   //tap(v => console.log('Tap value: %o', v)),
    //   map(obj => {
    //     const game = obj;
    //     console.log('MAP this %o', obj);
    //     if (!game) return;
    //     // alert(game);
    //     // alert(JSON.stringify(game));
    //     const {pendingPromotion, gameData, ...restOfGame} = game;
    //     const member = game.members.find(m => m.uid === currentUser.uid);
    //     const oponent = game.members.find(m => m.uid !== currentUser.uid);
    //     if (gameData) {
    //       chess.load(gameData);
    //     }
    //     const isGameOver = chess.game_over();

    //     return {
    //       board: chess.board(),
    //       pendingPromotion,
    //       isGameOver,
    //       position: member.piece,
    //       member,
    //       oponent,
    //       result: isGameOver ? getResult() : null,
    //       ...restOfGame
    //     };
    //   })
    // );

    return 'set observable w.r.t. REMOTE player state. ';
  } else {
    multiplayerGameId = null;
    currentPlayer = null;
    sendGameToRemotePlayer = null;

    // // This case when gameId is null
    // // i.e. the game is being played locally.
    // subjectObservable = new BehaviorSubject();

    const prevoiusGameState = localStorage.getItem('de-chess/game/standalone');
    if (prevoiusGameState) {
      chess.load(prevoiusGameState);
    }

    updateSubject();
    return 'set observable w.r.t. STANDALONE player state. ';
  }
}

export function reset() {
  if (multiplayerGameId) {
    updateSubject(null, true);
    chess.reset();
  } else {
    chess.reset();
    updateSubject();
  }
}

function updateSubject(pendingPromotion, reset) {
  const isGameOver = chess.game_over();

  if (multiplayerGameId) {
    const updatedData = {
      ...multiplayerGame,
      gameData: chess.fen(),
      pendingPromotion: pendingPromotion || null
    };

    if (reset) {
      updatedData.status = 'over';
    }

    updatedData.members = players;
    alert('updateSubject. players:' + players.length);

    localStorage.setItem('de-chess/game/remote/data', JSON.stringify(updatedData));
    console.log(`before multiplayer game: ${JSON.stringify(multiplayerGame)}`);
    // multiplayerGame = {...Object.assign(multiplayerGame, updatedData)};

    // multiplayerGame = {...multiplayerGame, ...updatedData, members: players};
    console.log(`after multiplayer game: ${JSON.stringify(updatedData)}`);
    sendGameToRemotePlayer(updatedData);
  } else {
    const updatedSubject = {
      board: chess.board(),
      pendingPromotion,
      turnChessboard: chess.turn(),
      isGameOver,
      result: isGameOver ? getResult() : null
    };

    localStorage.setItem('de-chess/game/standalone', chess.fen());

    subjectObservable.next(updatedSubject);
  }
}

export function applyRemotePlayerGame(currentUser, game) {
  const {pendingPromotion, gameData, ...restOfGame} = game;
  const member = game.members.find(m => m.uid === currentUser.uid);
  const oponent = game.members.find(m => m.uid !== currentUser.uid);

  if (gameData) {
    chess.load(gameData);
  }

  if (players.length < 2 && restOfGame.members.length > 1) {
    players = restOfGame.members;
  }

  const isGameOver = chess.game_over();

  subjectObservable.next({
    board: chess.board(),
    pendingPromotion,
    isGameOver,
    turnChessboard: member.piece,
    member,
    oponent,
    result: isGameOver ? getResult() : null,
    ...restOfGame
  });

  currentPlayer = member;
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

  if (multiplayerGameId) {
    if (currentPlayer.piece === chess.turn()) {
      // .move() won't work for a pawns on verge of being promoted.
      const isMoveAllowed = chess.move(theMove);
      if (isMoveAllowed) {
        updateSubject();
      }
    }
  } else {
    // .move() won't work for a pawns on verge of being promoted.
    const isMoveAllowed = chess.move(theMove);
    if (isMoveAllowed) {
      updateSubject();
    }
  }
}
