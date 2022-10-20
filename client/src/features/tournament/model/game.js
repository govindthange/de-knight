import * as Chess from 'chess.js';
import {BehaviorSubject} from 'rxjs';

// FEN position to test various scenarios
//
// Test promotion of pawns
// const TEST_PROMOTION_SCENARIO = 'rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5';
// const chess = new Chess(TEST_PROMOTION_SCENARIO);

const chess = new Chess();

export const subjectObservable = new BehaviorSubject();

export function start() {
  updateSubject();
}

function updateSubject(pendingPromotion) {
  const updatedSubject = {
    board: chess.board(),
    pendingPromotion
  };

  subjectObservable.next(updatedSubject);
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
