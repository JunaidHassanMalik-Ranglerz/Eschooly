import React from 'react';
import {Pressable} from 'react-native';

const PressableScale = ({children, style, onPress, disabled, ...rest}) => (
  <Pressable
    style={style}
    onPress={onPress}
    disabled={disabled}
    delayPressIn={0}
    unstable_pressDelay={0}
    {...rest}>
    {children}
  </Pressable>
);

export default PressableScale;
