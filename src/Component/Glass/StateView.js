import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import GlassButton from './GlassButton';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {Typography} from '../../Constants/Typography';
import {spacing} from '../../Constants/Theme';
import {hp} from '../../Constants/Responsive';

const StateView = ({status = 'empty', message, onRetry, style}) => {
  if (status === 'loading') {
    return (
      <View style={[styles.wrap, style]}>
        <ActivityIndicator size="small" color={Colors.brandNavy} />
      </View>
    );
  }

  const copy =
    message ||
    (status === 'error' ? Strings.stateError : Strings.stateEmpty);

  return (
    <View style={[styles.wrap, style]}>
      <Text style={styles.message}>{copy}</Text>
      {status === 'error' && onRetry ? (
        <GlassButton title={Strings.retryAction} onPress={onRetry} compact />
      ) : null}
    </View>
  );
};

export default StateView;

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(4),
    paddingHorizontal: spacing.lg,
  },
  message: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
