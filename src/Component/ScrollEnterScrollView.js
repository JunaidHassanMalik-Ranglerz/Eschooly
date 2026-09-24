import React from 'react';
import {ScrollView as RNScrollView} from 'react-native';
import Animated from 'react-native-reanimated';
import {useScrollEnter} from '../hooks/useScrollEnter';

const AnimatedScrollView = Animated.createAnimatedComponent(RNScrollView);

const ScrollEnterScrollView = React.forwardRef((props, ref) => {
  const ctx = useScrollEnter();
  const {scrollEventThrottle = 16, ...rest} = props;

  if (!ctx?.onScroll) {
    return <RNScrollView ref={ref} {...props} />;
  }

  return (
    <AnimatedScrollView
      ref={ref}
      {...rest}
      scrollEventThrottle={scrollEventThrottle}
      onScroll={ctx.onScroll}
    />
  );
});

ScrollEnterScrollView.displayName = 'ScrollEnterScrollView';

export default ScrollEnterScrollView;
