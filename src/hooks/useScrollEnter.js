import React, {createContext, useCallback, useContext, useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSharedValue, useAnimatedScrollHandler} from 'react-native-reanimated';

const ScrollEnterContext = createContext(null);

export const ScrollEnterProvider = ({children, resetOnFocus = true}) => {
  const {height} = useWindowDimensions();
  const scrollY = useSharedValue(0);
  const viewportH = useSharedValue(Math.max(height * 0.86, 480));

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  useFocusEffect(
    useCallback(() => {
      if (resetOnFocus) {
        scrollY.value = 0;
      }
    }, [resetOnFocus, scrollY]),
  );

  const value = useMemo(
    () => ({
      scrollY,
      viewportH,
      onScroll,
    }),
    [scrollY, viewportH, onScroll],
  );

  return (
    <ScrollEnterContext.Provider value={value}>
      {children}
    </ScrollEnterContext.Provider>
  );
};

export const useScrollEnter = () => useContext(ScrollEnterContext);
