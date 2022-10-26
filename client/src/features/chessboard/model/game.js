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

export async function start(currentPlayer, multiplayerGameObject) {
  if (multiplayerGameObject) {
    // const gameObject = await multiplayerGameObject().then(p => p);
    // if (!gameObject) {
    //   return 'No multiplayer game object exist!';
    // }

    // const creator = gameObject.members.find(m => m.creator === true);

    // if (gameObject.status === 'waiting' && creator.uid !== currentPlayer.uid) {
    //   const currUser = {
    //     uid: currentPlayer.uid,
    //     name: localStorage.getItem('userName'),
    //     piece: creator.piece === 'w' ? 'b' : 'w'
    //   };
    //   const updatedMembers = [...gameObject.members, currUser];

    //   alert('update the document in db/remote-socket-server');
    //   // await somePromise.update({members: updatedMembers, status: 'ready})
    // } else if (!gameObject.members.map(m => m.uid).includes(currentPlayer.uid)) {
    //   return 'intruder';
    // }

    // chess.reset();

    const gameObject = await multiplayerGameObject.then(p => p);
    if (!gameObject) {
      return 'No multiplayer game object exist!';
    }

    // TODO: We need to put rxjs observable that wraps
    // response from the socket client - play events.
    // REmove new BehaviorSubject() call after you add it.
    subjectObservable = new BehaviorSubject();

    chess.load(gameObject.game);
    const isGameOver = chess.game_over();

    subjectObservable.next({
      board: chess.board(),
      pendingPromotion: gameObject.pendingPromotion,
      isGameOver,
      turnChessboard: false, //gameObject.member.piece, //position property,
      member: 'current-user',
      opponent: gameObject.member.uid,
      result: isGameOver ? getResult() : null,
      ...gameObject
    });

    return 'set observable w.r.t. remote player state. ';
  } else {
    // This case when gameId is null
    // i.e. the game is being played locally.
    subjectObservable = new BehaviorSubject();

    const prevoiusGameState = localStorage.getItem('de-chess-game');
    if (prevoiusGameState) {
      chess.load(prevoiusGameState);
    }

    updateSubject();

    return 'set observable w.r.t. locally saved state. ';
  }
}

export function reset() {
  chess.reset();
  updateSubject();
}

function updateSubject(pendingPromotion) {
  const isGameOver = chess.game_over();

  const updatedSubject = {
    board: chess.board(),
    pendingPromotion,
    turnChessboard: chess.turn(),
    isGameOver,
    result: isGameOver ? getResult() : null
  };

  localStorage.setItem('de-chess-game', chess.fen());

  subjectObservable.next(updatedSubject);
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

  // .move() won't work for a pawns on verge of being promoted.
  const isMoveAllowed = chess.move(theMove);
  if (isMoveAllowed) {
    updateSubject();
  }
}
