import * as Chess from 'chess.js';
import {BehaviorSubject} from 'rxjs';

const chess = new Chess();

const eventEmitter = new BehaviorSubject({
  board: chess.board()
});

export default eventEmitter;
