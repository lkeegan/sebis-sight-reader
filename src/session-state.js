import { shouldEndSession } from "./note-utils.js";

export function recordCorrectNote(state, totalNotes) {
  const notesCompleted = state.notesCompleted + 1;
  return {
    ...state,
    notesCompleted,
    matchLock: true,
    inputLocked: true,
    shouldEnd: shouldEndSession(notesCompleted, totalNotes),
  };
}
