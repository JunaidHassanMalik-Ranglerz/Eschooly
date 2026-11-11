import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Typography} from '../../Constants/Typography';
import {radius, spacing} from '../../Constants/Theme';
import {hp} from '../../Constants/Responsive';

const GlassButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  compact = false,
  style,
  textStyle,
}) => {
  const outline = variant === 'outline';
  const blocked = loading || disabled;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      delayPressIn={0}
      disabled={blocked}
      onPress={blocked ? undefined : onPress}
      style={[
        styles.btn,
        compact && styles.compact,
        outline && styles.outline,
        blocked && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={outline ? Colors.brandNavy : Colors.white}
        />
      ) : (
        <Text style={[styles.label, outline && styles.outlineLabel, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default GlassButton;

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.brandNavy,
    borderRadius: radius.pill,
    paddingVertical: hp(1.6),
    paddingHorizontal: spacing.lg,
    marginTop: hp(1.5),
  },
  compact: {
    marginTop: hp(1.2),
    paddingVertical: hp(1.1),
    alignSelf: 'center',
    minWidth: 140,
  },
  outline: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  label: {
    ...Typography.button,
    color: Colors.white,
  },
  outlineLabel: {
    color: Colors.brandNavy,
  },
  disabled: {
    opacity: 0.7,
  },
});
