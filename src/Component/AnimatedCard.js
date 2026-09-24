import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Reanimated, {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import {
  combineMotionSession,
  useEnterActive,
  useEnterSession,
  useScreenMotion,
  shouldAnimateCard,
  isSequentialEnterMotion,
} from '../hooks/useScreenEnterGate';
import {useScrollEnter} from '../hooks/useScrollEnter';
import {useEnterMotion} from '../hooks/useEnterMotion';
import {
  getScreenCardEntering,
  getScrollRevealEntering,
  resolveScreenEnterMotion,
  SCROLL_REVEAL_LEAD_PX,
} from '../utils/cardAnimation';

const RADIUS_KEYS = [
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
];

const clipFromStyle = style => {
  const flat = StyleSheet.flatten(style) || {};
  const clip = {};
  let hasRadius = false;
  RADIUS_KEYS.forEach(key => {
    if (flat[key] != null) {
      clip[key] = flat[key];
      hasRadius = true;
    }
  });
  if (hasRadius || flat.overflow === 'hidden') {
    clip.overflow = 'hidden';
  }
  return clip;
};

const enterClipStyle = {
  overflow: 'visible',
};

export const EnterView = ({
  children,
  style,
  motion,
  disabled = false,
  enterKey = 'enter',
  replayToken = 0,
}) => {
  const enterSession = useEnterSession();
  const active = useEnterActive();
  const isFocused = useIsFocused();
  const screenMotion = useScreenMotion();
  const shouldAnimate = shouldAnimateCard(disabled, screenMotion);
  const sequentialEnter = isSequentialEnterMotion(screenMotion);
  const motionSession = combineMotionSession(enterSession, replayToken);
  const motionConfig = resolveScreenEnterMotion(screenMotion, motion);
  const runEnter = shouldAnimate && active && isFocused;
  const animatedStyle = useEnterMotion(
    shouldAnimate ? motionConfig : null,
    motionSession,
    runEnter,
  );

  if (!shouldAnimate) {
    return <View style={style}>{children}</View>;
  }

  return (
    <Reanimated.View
      key={`${enterKey}-${motionSession}`}
      pointerEvents="box-none"
      collapsable={false}
      style={[
        style,
        sequentialEnter ? enterClipStyle : clipFromStyle(style),
        animatedStyle,
      ]}>
      {children}
    </Reanimated.View>
  );
};

const AnimatedCard = ({
  children,
  index = 0,
  style,
  disabled = false,
  entering,
  replayToken = 0,
  revealOnScroll,
}) => {
  const enterSession = useEnterSession();
  const active = useEnterActive();
  const isFocused = useIsFocused();
  const motion = useScreenMotion();
  const scrollCtx = useScrollEnter();
  const shouldAnimate = shouldAnimateCard(disabled, motion);
  const motionSession = combineMotionSession(enterSession, replayToken);
  const sequentialEnter = isSequentialEnterMotion(motion);

  /** Scroll reveal only when explicitly requested — auto index gate caused stuck cards. */
  const waitForScroll = revealOnScroll === true;

  const layoutY = useSharedValue(Number.MAX_SAFE_INTEGER);
  const [scrollRevealed, setScrollRevealed] = useState(!waitForScroll);

  useEffect(() => {
    if (!waitForScroll) {
      setScrollRevealed(true);
      return;
    }
    setScrollRevealed(false);
    layoutY.value = Number.MAX_SAFE_INTEGER;
  }, [motionSession, waitForScroll, layoutY]);

  const markRevealed = useCallback(() => {
    setScrollRevealed(true);
  }, []);

  useAnimatedReaction(
    () => {
      if (!scrollCtx || !waitForScroll) {
        return 1;
      }
      const visibleBottom =
        scrollCtx.scrollY.value + scrollCtx.viewportH.value - SCROLL_REVEAL_LEAD_PX;
      if (layoutY.value >= Number.MAX_SAFE_INTEGER / 2) {
        return 0;
      }
      return layoutY.value <= visibleBottom ? 1 : 0;
    },
    (current, previous) => {
      if (current === 1 && previous !== 1) {
        runOnJS(markRevealed)();
      }
    },
    [waitForScroll, scrollCtx, markRevealed],
  );

  const onLayout = useCallback(
    event => {
      if (!waitForScroll) {
        return;
      }
      layoutY.value = event.nativeEvent.layout.y;
    },
    [layoutY, waitForScroll],
  );

  const resolvedEntering =
    entering ||
    (waitForScroll
      ? getScrollRevealEntering(motion, index)
      : getScreenCardEntering(motion, index));

  const motionConfig = resolveScreenEnterMotion(motion, resolvedEntering);
  const runEnter =
    shouldAnimate &&
    active &&
    isFocused &&
    (!waitForScroll || scrollRevealed);
  const animatedStyle = useEnterMotion(
    shouldAnimate ? motionConfig : null,
    motionSession,
    runEnter,
  );

  if (!shouldAnimate) {
    return <View style={style}>{children}</View>;
  }

  return (
    <Reanimated.View
      key={`card-${index}-${motionSession}`}
      pointerEvents="box-none"
      collapsable={false}
      onLayout={waitForScroll ? onLayout : undefined}
      style={[
        style,
        sequentialEnter ? enterClipStyle : clipFromStyle(style),
        animatedStyle,
      ]}>
      {children}
    </Reanimated.View>
  );
};

export default AnimatedCard;
