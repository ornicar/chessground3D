import { dragNewPiece as dragNewPiece2D } from '@lichess-org/chessground/drag';
import { type State } from '@lichess-org/chessground/state';
import { type MouchEvent, type Piece } from '@lichess-org/chessground/types';

import { type ChessScene } from './chessScene';

const scenes = new WeakMap<State, ChessScene>();
const activeDrags = new WeakMap<State, () => void>();

export function registerScene(state: State, scene: ChessScene): void {
  scenes.set(state, scene);
}

export function unregisterScene(state: State): void {
  activeDrags.get(state)?.();
  activeDrags.delete(state);
  scenes.delete(state);
}

// Same signature as '@lichess-org/chessground/drag', which lila calls directly for crazyhouse pockets
export function dragNewPiece(state: State, piece: Piece, event: MouchEvent, force?: boolean): void {
  const scene = scenes.get(state);
  if (!scene) {
    dragNewPiece2D(state, piece, event, force);
    return;
  }

  activeDrags.get(state)?.();
  activeDrags.set(state, scene.dragNewPiece(piece, event, force));
}
