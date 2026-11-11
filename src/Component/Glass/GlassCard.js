import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {elevation, radius, spacing} from '../../Constants/Theme';
import {wp} from '../../Constants/Responsive';

const GlassCard = ({
  children,
  style,
  onPress,
  selected = false,
  padded = true,
  tone = 'light',
}) => {
  const body = (
    <View
      style={[
        styles.card,
        tone === 'navy' && styles.navy,
        selected && styles.selected,
        !padded && styles.noPad,
        style,
      ]}>
      {tone === 'light' ? <View pointerEvents="none" style={styles.highlight} /> : null}
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.88} delayPressIn={0} onPress={onPress}>
        {body}
      </TouchableOpacity>
    );
  }

  return body;
};

export default GlassCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.glassFill,
    borderRadius: radius.card,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderSubtle,
    padding: spacing.md,
    overflow: 'hidden',
    ...elevation.card,
  },
  navy: {
    backgroundColor: Colors.glassFillNavy,
    borderColor: Colors.borderGlass,
  },
  selected: {
    borderColor: Colors.borderSelected,
    borderWidth: wp(0.6),
  },
  noPad: {
    padding: 0,
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth * 2,
    backgroundColor: Colors.glassHighlight,
  },
});
