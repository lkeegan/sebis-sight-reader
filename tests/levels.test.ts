import { describe, expect, it } from "vitest";
import {
  buildNotePoolForLevel,
  getRangeForLevel,
  noteNameToStaffIndex,
  staffIndexToNoteName,
  STAFF_BASE_NOTE,
} from "../src/note-utils";

const trebleBase = { letterIndex: 2, octave: 4 };
const bassBase = { letterIndex: 4, octave: 2 };
const altoBase = { letterIndex: 3, octave: 3 };
const tenorBase = { letterIndex: 1, octave: 3 };

describe("level note pools", () => {
  it("treble level 1 is C4 to A5, naturals only", () => {
    const pool = buildNotePoolForLevel("treble", trebleBase, 1);
    const names = new Set(pool.map((note) => note.name));
    expect(names.has("C4")).toBe(true);
    expect(names.has("A5")).toBe(true);
    expect(names.has("B3")).toBe(false);
    expect(names.has("C6")).toBe(false);
    expect(names.has("C#4")).toBe(false);
    expect(names.has("Db4")).toBe(false);
  });

  it("treble level 2 adds accidentals but keeps the same range", () => {
    const pool = buildNotePoolForLevel("treble", trebleBase, 2);
    const names = new Set(pool.map((note) => note.name));
    expect(names.has("C4")).toBe(true);
    expect(names.has("A5")).toBe(true);
    expect(names.has("C#4")).toBe(true);
    expect(names.has("Db4")).toBe(true);
    expect(names.has("C6")).toBe(false);
  });

  it("treble level 3 expands one octave and includes accidentals", () => {
    const range = getRangeForLevel("treble", trebleBase, 3);
    const pool = buildNotePoolForLevel("treble", trebleBase, 3);
    const names = new Set(pool.map((note) => note.name));
    const minName = staffIndexToNoteName(range.minIndex, trebleBase);
    const maxName = staffIndexToNoteName(range.maxIndex, trebleBase);
    expect(names.has(minName)).toBe(true);
    expect(names.has(maxName)).toBe(true);
    expect(names.has("C#4")).toBe(true);
  });

  it("treble level 4 includes double accidentals in the same range as level 3", () => {
    const pool = buildNotePoolForLevel("treble", trebleBase, 4);
    const names = new Set(pool.map((note) => note.name));
    expect(names.has("C##4")).toBe(true);
    expect(names.has("Dbb4")).toBe(true);
    const range3 = getRangeForLevel("treble", trebleBase, 3);
    const range4 = getRangeForLevel("treble", trebleBase, 4);
    expect(range4).toEqual(range3);
  });

  it("bass level 1 is E3 to C4, naturals only", () => {
    const pool = buildNotePoolForLevel("bass", bassBase, 1);
    const names = new Set(pool.map((note) => note.name));
    expect(names.has("E3")).toBe(true);
    expect(names.has("C4")).toBe(true);
    expect(names.has("D3")).toBe(false);
    expect(names.has("C#4")).toBe(false);
  });

  it("bass level 2 adds accidentals within the same range", () => {
    const pool = buildNotePoolForLevel("bass", bassBase, 2);
    const names = new Set(pool.map((note) => note.name));
    expect(names.has("E3")).toBe(true);
    expect(names.has("C4")).toBe(true);
    expect(names.has("F#3")).toBe(true);
    expect(names.has("Gb3")).toBe(true);
    expect(names.has("D3")).toBe(false);
  });

  it("bass level 3 expands one octave and includes accidentals", () => {
    const range = getRangeForLevel("bass", bassBase, 3);
    const pool = buildNotePoolForLevel("bass", bassBase, 3);
    const names = new Set(pool.map((note) => note.name));
    const minName = staffIndexToNoteName(range.minIndex, bassBase);
    const maxName = staffIndexToNoteName(range.maxIndex, bassBase);
    expect(names.has(minName)).toBe(true);
    expect(names.has(maxName)).toBe(true);
    expect(names.has("Bb3")).toBe(true);
  });

  it("bass level 4 includes double accidentals in the same range as level 3", () => {
    const pool = buildNotePoolForLevel("bass", bassBase, 4);
    const names = new Set(pool.map((note) => note.name));
    expect(names.has("F##3")).toBe(true);
    expect(names.has("Ebb3")).toBe(true);
  });

  it("alto level 1 is D3 to H4, naturals only", () => {
    const pool = buildNotePoolForLevel("alto", altoBase, 1);
    const names = new Set(pool.map((note) => note.name));
    expect(names.has("D3")).toBe(true);
    expect(names.has("H4")).toBe(true);
    expect(names.has("C3")).toBe(false);
    expect(names.has("C5")).toBe(false);
    expect(names.has("D#3")).toBe(false);
  });

  it("alto level 2 adds accidentals within the same range", () => {
    const pool = buildNotePoolForLevel("alto", altoBase, 2);
    const names = new Set(pool.map((note) => note.name));
    expect(names.has("D3")).toBe(true);
    expect(names.has("H4")).toBe(true);
    expect(names.has("F#3")).toBe(true);
    expect(names.has("Gb3")).toBe(true);
    expect(names.has("C3")).toBe(false);
  });

  it("alto level 3 expands one octave and includes accidentals", () => {
    const range = getRangeForLevel("alto", altoBase, 3);
    const pool = buildNotePoolForLevel("alto", altoBase, 3);
    const names = new Set(pool.map((note) => note.name));
    const minName = staffIndexToNoteName(range.minIndex, altoBase);
    const maxName = staffIndexToNoteName(range.maxIndex, altoBase);
    expect(names.has(minName)).toBe(true);
    expect(names.has(maxName)).toBe(true);
  });

  it("tenor level 1 is H2 to G4, naturals only", () => {
    const pool = buildNotePoolForLevel("tenor", tenorBase, 1);
    const names = new Set(pool.map((note) => note.name));
    expect(names.has("H2")).toBe(true);
    expect(names.has("G4")).toBe(true);
    expect(names.has("A2")).toBe(false);
    expect(names.has("A4")).toBe(false);
    expect(names.has("C#3")).toBe(false);
  });

  it("tenor level 2 adds accidentals within the same range", () => {
    const pool = buildNotePoolForLevel("tenor", tenorBase, 2);
    const names = new Set(pool.map((note) => note.name));
    expect(names.has("H2")).toBe(true);
    expect(names.has("G4")).toBe(true);
    expect(names.has("F#3")).toBe(true);
    expect(names.has("Gb3")).toBe(true);
    expect(names.has("A2")).toBe(false);
  });

  it("tenor level 3 expands one octave and includes accidentals", () => {
    const range = getRangeForLevel("tenor", tenorBase, 3);
    const pool = buildNotePoolForLevel("tenor", tenorBase, 3);
    const names = new Set(pool.map((note) => note.name));
    const minName = staffIndexToNoteName(range.minIndex, tenorBase);
    const maxName = staffIndexToNoteName(range.maxIndex, tenorBase);
    expect(names.has(minName)).toBe(true);
    expect(names.has(maxName)).toBe(true);
  });
});
