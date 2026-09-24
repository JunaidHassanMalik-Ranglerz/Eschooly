import React from 'react';
import {FlatList as RNFlatList} from 'react-native';
import Animated from 'react-native-reanimated';
import {useScrollEnter} from '../hooks/useScrollEnter';

const AnimatedFlatList = Animated.createAnimatedComponent(RNFlatList);

const ScrollEnterFlatList = React.forwardRef((props, ref) => {
  const ctx = useScrollEnter();
  const {scrollEventThrottle = 16, ...rest} = props;

  if (!ctx?.onScroll) {
    return <RNFlatList ref={ref} {...props} />;
  }

  return (
    <AnimatedFlatList
      ref={ref}
      {...rest}
      scrollEventThrottle={scrollEventThrottle}
      onScroll={ctx.onScroll}
    />
  );
});

ScrollEnterFlatList.displayName = 'ScrollEnterFlatList';

export default ScrollEnterFlatList;
