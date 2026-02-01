import { shouldEndSession } from "./note-utils";

export interface SessionState {
  notesCompleted: number;
  matchLock: boolean;
  inputLocked: boolean;
}

export function recordCorrectNote(state: SessionState, totalNotes: number) {
  const notesCompleted = state.notesCompleted + 1;
  return {
    ...state,
    notesCompleted,
    matchLock: true,
    inputLocked: true,
    shouldEnd: shouldEndSession(notesCompleted, totalNotes),
  };
}
