import {shouldBumpEnterSession} from '../src/utils/enterSession';

describe('Home enter-session replay gate', () => {
  it('does not bump sequential enter on Home — session starts ready', () => {
    expect(
      shouldBumpEnterSession({
        sequentialEnter: true,
        replayOnFocus: false,
        hasPlayed: false,
        hasLeft: false,
      }),
    ).toBe(false);
  });

  it('does not replay sequential enter when returning to Home', () => {
    expect(
      shouldBumpEnterSession({
        sequentialEnter: true,
        replayOnFocus: false,
        hasPlayed: true,
        hasLeft: true,
      }),
    ).toBe(false);
  });

  it('keeps Academics and other sequential screens replaying on focus', () => {
    expect(
      shouldBumpEnterSession({
        sequentialEnter: true,
        replayOnFocus: true,
        hasPlayed: true,
        hasLeft: true,
      }),
    ).toBe(true);
  });

  it('does not bump generic screens unless they have already left', () => {
    expect(
      shouldBumpEnterSession({
        sequentialEnter: false,
        replayOnFocus: true,
        hasPlayed: false,
        hasLeft: false,
      }),
    ).toBe(false);
    expect(
      shouldBumpEnterSession({
        sequentialEnter: false,
        replayOnFocus: true,
        hasPlayed: true,
        hasLeft: true,
      }),
    ).toBe(true);
  });
});
