# Sebi's Sight-Reader

Music sight-reading trainer PWA. Users pick a clef, key signature, and level, then play notes detected via microphone pitch detection.

## Tech Stack

- TypeScript, Vite, no framework
- Canvas-based staff rendering (src/staff-renderer.ts)
- Web Audio API for mic input + pitch detection (pitchy library)
- PWA with service worker

## Commands

- `pnpm dev` — Dev server
- `pnpm build` — Production build
- `pnpm typecheck` — TypeScript type checking
- `pnpm test` — Run tests (Vitest)

## Architecture

- **src/config.ts** — Clef definitions, key signature positions, audio config. Each clef has a `baseNote` (bottom staff line), `symbolIndex` (which staff line the clef symbol sits on), and `symbolOffset` (fine-tuning for glyph rendering).
- **src/note-utils.ts** — Note math: staff index ↔ note name conversion, MIDI, frequency, key signature logic. Uses German notation (H = B natural, B = Bb). `ClefName` type must match clefs in config.
- **src/staff-renderer.ts** — Canvas drawing. `StaffRendererConfig` type must list all clefs and key signature position keys explicitly.
- **src/main.ts** — App entry point, DOM wiring, game loop. Every new UI control needs: DOM ref, click handler, state in `setClef()`/`setKeySignature()`/`setLevel()`, and flow advancement.
- **src/session-state.ts** — Session progress tracking.

## Tests

Tests live in `tests/` and use Vitest. All tests are pure unit tests against `src/note-utils.ts` and `src/session-state.ts` — no DOM or canvas mocking needed.

- **pitch.test.ts** — Pitch detection: generates sine/harmonic samples and verifies note detection
- **key-signature.test.ts** — Key signature logic: note adjustment across key changes, MIDI matching, effective note names
- **levels.test.ts** — Note pool generation: verifies correct ranges and accidentals per clef/level
- **session-state.test.ts** — Session flow: input locking, session ending

To add tests: create or extend a file in `tests/`, import from `src/`, use `describe`/`it`/`expect` from Vitest. Tests should cover note-utils functions (staff index mapping, note pools, key signature math) — these are the most logic-dense and easy to test without mocking.

## Adding a New Clef

1. **config.ts**: Add to `CLEFS` object and its type, add to `KEY_SIGNATURE_POSITIONS` and its type
2. **note-utils.ts**: Add to `ClefName` union, add case in `getBaseRangeForClef()`
3. **staff-renderer.ts**: Add to `StaffRendererConfig` clefs and keySignaturePositions types, update `drawKeySignature()` clef lookup chain
4. **index.html**: Add button in `.clef-toggle`
5. **style.css**: Update `.clef-toggle` grid column count
6. **main.ts**: Add DOM ref, click handler, update `buildNotePool()` clef name detection, update `setClef()` pressed states

## Adding a New Key Signature

The `KeySignatureKey` type and `KEY_SIGNATURES` map in note-utils.ts already define up to 5 sharps/flats. To expose one in the UI: add a button in `.signature-buttons`, a DOM ref, click handler, and pressed state in `setKeySignature()` — all in main.ts.

## Key Conventions

- German note naming: H = B natural, B = Bb throughout the codebase
- Staff indices: 0 = bottom line, +2 per line, +1 per space. Lines at 0,2,4,6,8.
- Key signature positions are staff indices where accidental symbols are drawn — they must map to the correct note letter for each clef's `baseNote`
- `symbolOffset` is in lineGap units (positive = shift up on canvas)
