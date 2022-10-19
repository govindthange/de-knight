import * as Chess from 'chess.js';
import {BehaviorSubject} from 'rxjs';

const chess = new Chess();

const eventEmitter = new BehaviorSubject({
  board: chess.board()
});

// This function validates and moves piece as per the
// 'to' location specified in chess' algebraic notation.
export function move(from, to) {
  const isMoveAllowed = chess.move({from, to});
  if (isMoveAllowed) {
    eventEmitter.next({board: chess.board()});
  }
}

export default eventEmitter;
