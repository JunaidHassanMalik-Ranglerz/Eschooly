import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../Constants/Colors';

const ProgressBar = props => {
  const barStyle = StyleSheet.flatten([styles.track, props?.style]);
  const height = barStyle?.height ?? 8;
  const radius = barStyle?.borderRadius ?? height / 2;
  const progress = Math.min(Math.max(props?.progress ?? 0, 0), 1);

  return (
    <View style={[styles.track, props?.style]}>
      <View
        style={[
          styles.fill,
          {width: `${progress * 100}%`, borderRadius: radius},
        ]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  track: {
    backgroundColor: Colors.lightGray,
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
});
