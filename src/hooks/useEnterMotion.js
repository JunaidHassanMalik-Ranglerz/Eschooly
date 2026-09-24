import {useLayoutEffect, useMemo} from 'react';
import {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const ENTER_EASING = Easing.bezier(0.2, 0.92, 0.32, 1);
const DEFAULT_DURATION = 520;
const MAX_ENTER_DELAY = 720;
const OFFSET_SCALE = 0.58;

const HOME_DURATION = 560;
const HOME_MAX_DELAY = 1160;
const HOME_OFFSET_SCALE = 0.62;
const TAB_SHELL_OFFSET_SCALE = 0.48;
const TAB_SHELL_DURATION = 580;

export const MOTION_KINDS = {
  glideLeft: 'glideLeft',
  glideRight: 'glideRight',
  glideUp: 'glideUp',
  glideDown: 'glideDown',
  pop: 'pop',
  squeeze: 'squeeze',
  stretch: 'stretch',
  bounceUp: 'bounceUp',
  tiltIn: 'tiltIn',
  cascade: 'cascade',
  flipIn: 'flipIn',
  elastic: 'elastic',
  snapDown: 'snapDown',
  wow: 'wow',
  orbitIn: 'orbitIn',
  appear: 'appear',
  stack: 'stack',
  rippleScale: 'rippleScale',
};

export const KIND_CYCLE = [
  MOTION_KINDS.glideLeft,
  MOTION_KINDS.pop,
  MOTION_KINDS.glideRight,
  MOTION_KINDS.squeeze,
  MOTION_KINDS.bounceUp,
  MOTION_KINDS.stretch,
  MOTION_KINDS.tiltIn,
  MOTION_KINDS.cascade,
  MOTION_KINDS.flipIn,
  MOTION_KINDS.elastic,
  MOTION_KINDS.snapDown,
  MOTION_KINDS.wow,
  MOTION_KINDS.orbitIn,
  MOTION_KINDS.appear,
  MOTION_KINDS.glideUp,
  MOTION_KINDS.stack,
];

const START = {
  glideLeft: {tx: -36, ty: 0},
  glideRight: {tx: 36, ty: 0},
  glideUp: {tx: 0, ty: -28},
  glideDown: {tx: 0, ty: 28},
  pop: {tx: 0, ty: 24},
  squeeze: {tx: -22, ty: 16},
  stretch: {tx: 22, ty: 16},
  bounceUp: {tx: 0, ty: 28},
  tiltIn: {tx: 22, ty: 16},
  cascade: {tx: -16, ty: 20},
  flipIn: {tx: 28, ty: 8},
  elastic: {tx: 0, ty: 22},
  snapDown: {tx: 0, ty: -24},
  wow: {tx: -20, ty: 14},
  orbitIn: {tx: -26, ty: -16},
  appear: {tx: 0, ty: 18},
  stack: {tx: 8, ty: 20},
  rippleScale: {tx: 0, ty: 18},
};

const START_ROTATE_DEG = {
  tiltIn: -12,
  flipIn: 14,
  orbitIn: -14,
  wow: 10,
  elastic: -8,
};

export const inferMotionKind = config => {
  if (config?.kind && START[config.kind]) {
    return config.kind;
  }
  if (config?.bounce) {
    return MOTION_KINDS.bounceUp;
  }
  const x = config?.fromX ?? 0;
  const y = config?.fromY ?? 0;
  if (x < -20) {
    return MOTION_KINDS.glideLeft;
  }
  if (x > 20) {
    return MOTION_KINDS.glideRight;
  }
  if (y < -20) {
    return MOTION_KINDS.glideUp;
  }
  if (y > 20) {
    return MOTION_KINDS.glideDown;
  }
  return MOTION_KINDS.appear;
};

const rest = (tx, ty, opacity, rotate) => {
  cancelAnimation(tx);
  cancelAnimation(ty);
  cancelAnimation(opacity);
  cancelAnimation(rotate);
  tx.value = 0;
  ty.value = 0;
  opacity.value = 1;
  rotate.value = 0;
};

export const useEnterMotion = (config, session = 0, active = true) => {
  const enabled = Boolean(config) && active && session >= 1;
  const isHomeProfile = config?.profile === 'home';
  const enterVisible = config?.enterVisible === true;
  const kind = inferMotionKind(config);
  const offsetScale = enterVisible
    ? TAB_SHELL_OFFSET_SCALE
    : config?.fullOffset
      ? 1
      : isHomeProfile
        ? HOME_OFFSET_SCALE
        : OFFSET_SCALE;
  const start = useMemo(() => {
    const base = START[kind] || START.appear;
    const tx = (config?.fromX ?? base.tx) * offsetScale;
    const ty = (config?.fromY ?? base.ty) * offsetScale;
    return {tx, ty};
  }, [kind, config?.fromX, config?.fromY, offsetScale]);
  const startRotateDeg = useMemo(() => {
    if (typeof config?.fromRotateDeg === 'number') {
      return config.fromRotateDeg;
    }
    if (config?.spinIn) {
      const sign = (config?.spinIndex ?? 0) % 2 === 0 ? 1 : -1;
      return sign * (config?.spinDeg ?? 10);
    }
    return START_ROTATE_DEG[kind] ?? 0;
  }, [kind, config?.fromRotateDeg, config?.spinIn, config?.spinIndex, config?.spinDeg]);
  const delay = isHomeProfile
    ? Math.min(Math.max(config?.delay ?? 0, 0), HOME_MAX_DELAY)
    : Math.min(Math.max(config?.delay ?? 0, 0), MAX_ENTER_DELAY);
  const duration = enterVisible
    ? config?.duration ?? TAB_SHELL_DURATION
    : isHomeProfile
      ? config?.duration ?? HOME_DURATION
      : config?.duration ?? DEFAULT_DURATION;
  const tx = useSharedValue(start.tx);
  const ty = useSharedValue(start.ty);
  const rotate = useSharedValue(startRotateDeg);
  const opacity = useSharedValue(enterVisible ? 0.96 : 0);

  useLayoutEffect(() => {
    if (!enabled) {
      cancelAnimation(tx);
      cancelAnimation(ty);
      cancelAnimation(opacity);
      cancelAnimation(rotate);
      if (config && session >= 1 && !active) {
        rest(tx, ty, opacity, rotate);
        return undefined;
      }
      if (!config || !active || config.fullOffset) {
        tx.value = start.tx;
        ty.value = start.ty;
        rotate.value = startRotateDeg;
        opacity.value = enterVisible ? 0.96 : 0;
        return undefined;
      }
      rest(tx, ty, opacity, rotate);
      return undefined;
    }

    cancelAnimation(tx);
    cancelAnimation(ty);
    cancelAnimation(opacity);
    cancelAnimation(rotate);

    tx.value = start.tx;
    ty.value = start.ty;
    rotate.value = startRotateDeg;
    opacity.value = enterVisible ? 0.96 : 0;

    const timing = {duration, easing: ENTER_EASING};
    const homeSequential = isHomeProfile && config?.fullOffset;
    const snapRest = finished => {
      'worklet';
      if (finished) {
        tx.value = 0;
        ty.value = 0;
        opacity.value = 1;
        rotate.value = 0;
      }
    };

    if (enterVisible) {
      opacity.value = withDelay(
        delay,
        withTiming(1, {duration: Math.min(duration, 280), easing: ENTER_EASING}),
      );
      tx.value = withDelay(delay, withTiming(0, timing));
      ty.value = withDelay(delay, withTiming(0, timing, snapRest));
      rotate.value = withDelay(
        delay,
        withTiming(0, {...timing, duration: duration + 40}),
      );
    } else if (homeSequential) {
      opacity.value = withDelay(delay, withTiming(1, timing));
      tx.value = withDelay(delay, withTiming(0, timing));
      ty.value = withDelay(delay, withTiming(0, timing));
      rotate.value = withDelay(delay, withTiming(0, timing));
    } else {
      opacity.value = withDelay(delay, withTiming(1, timing));
      tx.value = withDelay(delay, withTiming(0, timing));
      rotate.value = withDelay(delay, withTiming(0, timing));
      ty.value = withDelay(delay, withTiming(0, timing, snapRest));
    }

    return () => {
      cancelAnimation(tx);
      cancelAnimation(ty);
      cancelAnimation(opacity);
      cancelAnimation(rotate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    enabled,
    active,
    session,
    start.tx,
    start.ty,
    startRotateDeg,
    delay,
    duration,
    enterVisible,
    config?.fullOffset,
  ]);

  return useAnimatedStyle(() => {
    const transform = [{translateX: tx.value}, {translateY: ty.value}];
    if (Math.abs(rotate.value) > 0.01) {
      transform.push({rotateZ: `${rotate.value}deg`});
    }
    return {
      opacity: opacity.value,
      transform,
    };
  });
};
