import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Typography} from '../../Constants/Typography';
import {radius, spacing} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

const GlassTextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  vectorIcon,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  style,
  ...rest
}) => (
  <View style={[styles.wrapper, style]}>
    {label ? <Text style={styles.label}>{label}</Text> : null}
    <View style={styles.box}>
      {vectorIcon ? (
        <Icon
          name={vectorIcon}
          size={wp(5)}
          color={Colors.brandNavy}
          style={styles.icon}
        />
      ) : null}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
        secureTextEntry={!!secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        {...rest}
      />
    </View>
  </View>
);

export default GlassTextInput;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: hp(1.2),
  },
  label: {
    ...Typography.cardMeta,
    color: Colors.textPrimary,
    marginBottom: hp(0.7),
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: radius.search,
    paddingHorizontal: spacing.md,
    paddingVertical: hp(1.3),
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    ...Typography.body,
    flex: 1,
    color: Colors.textPrimary,
    padding: 0,
  },
});
