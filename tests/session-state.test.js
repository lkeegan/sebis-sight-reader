import { describe, expect, it } from "vitest";
import { recordCorrectNote } from "../src/session-state.js";

describe("session state behavior", () => {
  it("locks input after a correct note", () => {
    const state = { matchLock: false, inputLocked: false, notesCompleted: 0 };
    const next = recordCorrectNote(state, 10);
    expect(next.matchLock).toBe(true);
    expect(next.inputLocked).toBe(true);
  });

  it("ends the session after the configured number of notes", () => {
    const state = { matchLock: false, inputLocked: false, notesCompleted: 9 };
    const next = recordCorrectNote(state, 10);
    expect(next.shouldEnd).toBe(true);
  });
});
