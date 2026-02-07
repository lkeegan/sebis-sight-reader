import { describe, expect, it } from "vitest";
import { CLEFS, KEY_SIGNATURE_POSITIONS } from "../src/config";
import {
  staffIndexToNoteName,
  noteNameToStaffIndex,
  getBaseRangeForClef,
} from "../src/note-utils";

const SHARP_ORDER = ["F", "C", "G", "D", "A", "E", "H"];
const FLAT_ORDER = ["H", "E", "A", "D", "G", "C", "F"];

describe("key signature positions map to correct note letters", () => {
  for (const [clefName, clef] of Object.entries(CLEFS)) {
    const positions = KEY_SIGNATURE_POSITIONS[clefName as keyof typeof KEY_SIGNATURE_POSITIONS];

    it(`${clefName} sharp positions map to F C G D A E B`, () => {
      for (let i = 0; i < positions.sharps.length; i++) {
        const noteName = staffIndexToNoteName(positions.sharps[i], clef.baseNote);
        const letter = noteName.replace(/\d+$/, "");
        expect(letter).toBe(SHARP_ORDER[i]);
      }
    });

    it(`${clefName} flat positions map to B E A D G C F`, () => {
      for (let i = 0; i < positions.flats.length; i++) {
        const noteName = staffIndexToNoteName(positions.flats[i], clef.baseNote);
        const letter = noteName.replace(/\d+$/, "");
        expect(letter).toBe(FLAT_ORDER[i]);
      }
    });
  }
});

describe("staffIndexToNoteName with different base notes", () => {
  it("treble base (E4): index 0 is E4", () => {
    expect(staffIndexToNoteName(0, CLEFS.treble.baseNote)).toBe("E4");
  });

  it("bass base (G2): index 0 is G2", () => {
    expect(staffIndexToNoteName(0, CLEFS.bass.baseNote)).toBe("G2");
  });

  it("alto base (F3): index 0 is F3, index 4 is C4", () => {
    expect(staffIndexToNoteName(0, CLEFS.alto.baseNote)).toBe("F3");
    expect(staffIndexToNoteName(4, CLEFS.alto.baseNote)).toBe("C4");
  });

  it("tenor base (D3): index 0 is D3, index 6 is C4", () => {
    expect(staffIndexToNoteName(0, CLEFS.tenor.baseNote)).toBe("D3");
    expect(staffIndexToNoteName(6, CLEFS.tenor.baseNote)).toBe("C4");
  });
});

describe("noteNameToStaffIndex with different base notes", () => {
  it("round-trips through staffIndexToNoteName for all clefs", () => {
    for (const clef of Object.values(CLEFS)) {
      for (let i = -3; i <= 12; i++) {
        const name = staffIndexToNoteName(i, clef.baseNote);
        const index = noteNameToStaffIndex(name, clef.baseNote);
        expect(index).toBe(i);
      }
    }
  });
});

describe("getBaseRangeForClef", () => {
  it("treble range is C4 to A5", () => {
    const range = getBaseRangeForClef("treble", CLEFS.treble.baseNote);
    expect(staffIndexToNoteName(range.minIndex, CLEFS.treble.baseNote)).toBe("C4");
    expect(staffIndexToNoteName(range.maxIndex, CLEFS.treble.baseNote)).toBe("A5");
  });

  it("bass range is E3 to C4", () => {
    const range = getBaseRangeForClef("bass", CLEFS.bass.baseNote);
    expect(staffIndexToNoteName(range.minIndex, CLEFS.bass.baseNote)).toBe("E3");
    expect(staffIndexToNoteName(range.maxIndex, CLEFS.bass.baseNote)).toBe("C4");
  });

  it("alto range is D3 to H4", () => {
    const range = getBaseRangeForClef("alto", CLEFS.alto.baseNote);
    expect(staffIndexToNoteName(range.minIndex, CLEFS.alto.baseNote)).toBe("D3");
    expect(staffIndexToNoteName(range.maxIndex, CLEFS.alto.baseNote)).toBe("H4");
  });

  it("tenor range is H2 to G4", () => {
    const range = getBaseRangeForClef("tenor", CLEFS.tenor.baseNote);
    expect(staffIndexToNoteName(range.minIndex, CLEFS.tenor.baseNote)).toBe("H2");
    expect(staffIndexToNoteName(range.maxIndex, CLEFS.tenor.baseNote)).toBe("G4");
  });
});
