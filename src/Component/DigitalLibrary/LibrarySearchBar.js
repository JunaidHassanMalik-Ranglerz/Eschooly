import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {radius, spacing} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {useStudentTone} from '../Glass/StudentTone';

const LibrarySearchBar = ({
  value,
  onChangeText,
  placeholder,
  animationIndex = 1,
  look,
}) => {
  const icy = useStudentTone();
  const onNavy = icy && look === 'onNavy';

  const field = (
    <View style={[styles.row, icy && !onNavy && styles.rowIcy, onNavy && styles.rowOnNavy]}>
      <Icon
        name="search-outline"
        size={wp(5)}
        color={onNavy ? Colors.textOnNavyMuted : icy ? Colors.brandRoyal : Colors.whiteMuted85}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={
          onNavy
            ? Colors.textOnNavyMuted
            : icy
              ? Colors.textSecondary
              : Colors.whiteMuted75
        }
        style={[styles.input, icy && !onNavy && styles.inputIcy, onNavy && styles.inputOnNavy]}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <View pointerEvents="none" style={styles.sliders}>
        <Icon
          name="options-outline"
          size={wp(4.8)}
          color={onNavy ? Colors.textOnNavyMuted : icy ? Colors.textSecondary : Colors.whiteMuted85}
        />
      </View>
    </View>
  );

  if (onNavy) {
    return <View style={styles.onNavyWrap}>{field}</View>;
  }

  return (
    <ProfileGradientCard
      innerStyle={styles.inner}
      style={styles.wrap}
      animationIndex={animationIndex}
      variant={icy ? 'light' : 'navy'}
      colors={icy ? undefined : CARD_GRADIENTS.royal}>
      {field}
    </ProfileGradientCard>
  );
};

export default LibrarySearchBar;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(2),
  },
  inner: {
    paddingVertical: hp(0.4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    borderRadius: wp(3.5),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1),
    zIndex: 1,
  },
  input: {
    flex: 1,
    marginLeft: wp(2),
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    padding: 0,
  },
  rowIcy: {
    backgroundColor: Colors.hubCard,
  },
  inputIcy: {
    color: Colors.textPrimary,
  },
  onNavyWrap: {
    marginTop: hp(0.15),
    marginBottom: 0,
  },
  rowOnNavy: {
    backgroundColor: Colors.searchOnNavy,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
    paddingHorizontal: spacing.md,
    paddingVertical: hp(1.15),
    minHeight: hp(5.4),
    alignItems: 'center',
  },
  inputOnNavy: {
    color: Colors.white,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  sliders: {
    marginLeft: spacing.xs,
  },
});
