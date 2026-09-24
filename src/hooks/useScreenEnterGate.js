import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {InteractionManager} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ScrollEnterProvider} from './useScrollEnter';

export const ScreenEnterContext = createContext(null);

/** Fallback when a screen has no ScreenEnterProvider. */
export const RouteEnterContext = createContext({
  motion: 'generic',
  session: 1,
  active: true,
});

export const RouteEnterProvider = ({value, children}) => (
  <RouteEnterContext.Provider value={value}>
    {children}
  </RouteEnterContext.Provider>
);

/** Same enter pipeline as Academics tab (`menu` motion). */
export const ACADEMICS_ENTER_MOTION = 'menu';

const TAB_ACADEMICS_ENTER_MOTIONS = new Set([ACADEMICS_ENTER_MOTION]);

export const ScreenEnterProvider = ({children, motion = 'generic'}) => {
  const navigation = useNavigation();
  const sequentialEnter = isSequentialEnterMotion(motion);
  const [session, setSession] = useState(() => (sequentialEnter ? 0 : 1));
  const hasLeftRef = useRef(false);

  const bumpSession = useCallback(() => {
    setSession(value => value + 1);
  }, []);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      let interactionTask = null;
      let rafId = null;

      if (sequentialEnter) {
        if (TAB_ACADEMICS_ENTER_MOTIONS.has(motion)) {
          rafId = requestAnimationFrame(() => {
            if (!cancelled) {
              bumpSession();
            }
          });
        } else {
          interactionTask = InteractionManager.runAfterInteractions(() => {
            if (!cancelled) {
              bumpSession();
            }
          });
        }
      } else if (hasLeftRef.current) {
        bumpSession();
      }

      return () => {
        cancelled = true;
        interactionTask?.cancel?.();
        if (rafId != null) {
          cancelAnimationFrame(rafId);
        }
        hasLeftRef.current = true;
      };
    }, [bumpSession, motion, sequentialEnter]),
  );

  useEffect(() => {
    const unsubTabPress = navigation.addListener('tabPress', () => {
      if (navigation.isFocused()) {
        bumpSession();
      }
    });
    return unsubTabPress;
  }, [bumpSession, navigation]);

  const value = useMemo(
    () => ({
      gateOpen: true,
      session,
      motion,
      active: true,
    }),
    [motion, session],
  );

  return (
    <ScreenEnterContext.Provider value={value}>
      <ScrollEnterProvider>{children}</ScrollEnterProvider>
    </ScreenEnterContext.Provider>
  );
};

export const withScreenEnter = (ScreenComponent, motion) => {
  const WrappedScreen = props => (
    <ScreenEnterProvider motion={motion}>
      <ScreenComponent {...props} />
    </ScreenEnterProvider>
  );
  WrappedScreen.displayName = `WithScreenEnter(${
    ScreenComponent.displayName || ScreenComponent.name || 'Screen'
  })`;
  return WrappedScreen;
};

export const SEQUENTIAL_ENTER_MOTIONS = new Set([
  'studentHome',
  'parentHome',
  'menu',
  'library',
  'exam',
  'announcements',
  'role',
  'register',
  'syllabus',
  'timetable',
  'holidays',
  'assignment',
  'teacher',
  'attendance',
  'notification',
  'examSchedule',
  'results',
  'fee',
  'transport',
  'myProfile',
  'updatePassword',
  'chat',
  'onlineClass',
]);

export const isSequentialEnterMotion = motion =>
  SEQUENTIAL_ENTER_MOTIONS.has(motion);

/** Not a React hook — do not prefix with `use` (breaks React 19 hook queue). */
export const shouldAnimateCard = (disabled, motion) => {
  if (disabled) {
    return false;
  }
  return isSequentialEnterMotion(motion);
};

export const useEnterSession = () => {
  const screenCtx = useContext(ScreenEnterContext);
  const routeCtx = useContext(RouteEnterContext);
  if (screenCtx != null) {
    return screenCtx.session;
  }
  return routeCtx?.session ?? 1;
};

/** Screen session + local replay (e.g. child switch) for enter animations. */
export const combineMotionSession = (enterSession, replayToken = 0) =>
  Math.max(0, enterSession) * 100000 + Math.max(0, replayToken);

export const useEnterActive = () => {
  const screenCtx = useContext(ScreenEnterContext);
  const routeCtx = useContext(RouteEnterContext);
  if (screenCtx != null) {
    return screenCtx.active !== false;
  }
  return routeCtx?.active !== false;
};

export const useScreenMotion = () => {
  const screenCtx = useContext(ScreenEnterContext);
  const routeCtx = useContext(RouteEnterContext);
  if (screenCtx?.motion) {
    return screenCtx.motion;
  }
  return routeCtx?.motion ?? 'generic';
};

export const useSequentialEnterScreen = () => {
  const motion = useScreenMotion();
  return isSequentialEnterMotion(motion);
};

/** Screens that use Home-matched enter timing (speed, easing, stagger). */
export const HOME_MATCHED_SCREEN_MOTIONS = new Set([
  'role',
  'register',
  'attendance',
  'library',
  'exam',
  'examSchedule',
  'announcements',
  'syllabus',
  'assignment',
  'teacher',
  'timetable',
  'holidays',
  'results',
  'fee',
  'transport',
  'notification',
  'myProfile',
  'updatePassword',
  'chat',
  'onlineClass',
]);

export const useHomeMatchedScreenEnter = () => {
  const motion = useScreenMotion();
  return HOME_MATCHED_SCREEN_MOTIONS.has(motion);
};
