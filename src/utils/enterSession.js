/** Pure gate for enter-session bumps. Home passes replayOnFocus=false. */
export const shouldBumpEnterSession = ({
  sequentialEnter,
  replayOnFocus = true,
  hasPlayed,
  hasLeft,
} = {}) => {
  if (sequentialEnter) {
    if (!replayOnFocus) {
      return false;
    }
    return true;
  }
  return Boolean(replayOnFocus && hasLeft);
};
