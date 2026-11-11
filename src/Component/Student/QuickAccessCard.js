import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FeatureArtImage from '../Glass/FeatureArtImage';
import DepthIcon from '../DepthIcon';
import {Colors} from '../../Constants/Colors';
import {Typography} from '../../Constants/Typography';
import {elevation, radius} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';
import {Fontsize} from '../../Constants/Fontsize';

export const QUICK_ACCESS_GAP = wp(2.4);
export const QUICK_ACCESS_HEIGHT = wp(29.5);
export const QUICK_ACCESS_ICON = wp(15.2);

const QuickAccessCard = ({
  label,
  art,
  icon,
  iconColor = Colors.brandRoyal,
  selected = false,
  onPress,
  width,
  style,
}) => {
  const cardWidth = width || wp(22);
  const text = String(label || '');
  const multiline = text.includes('\n');

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      delayPressIn={0}
      onPress={onPress}
      style={[
        styles.card,
        selected && styles.selected,
        {width: cardWidth, height: QUICK_ACCESS_HEIGHT},
        style,
      ]}>
      <View style={styles.iconWrap}>
        {art ? (
          <FeatureArtImage source={art} size={QUICK_ACCESS_ICON} />
        ) : (
          <DepthIcon name={icon} size={wp(7)} color={iconColor} />
        )}
      </View>
      <View style={styles.labelBox}>
        <Text
          style={styles.label}
          numberOfLines={multiline ? 2 : 1}
          ellipsizeMode="clip"
          textBreakStrategy="simple"
          hyphenationFrequency="none"
          allowFontScaling={false}
          adjustsFontSizeToFit={!multiline}
          minimumFontScale={0.8}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default QuickAccessCard;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.hubCard,
    borderRadius: radius.iconTile,
    paddingTop: hp(1.1),
    paddingHorizontal: wp(1),
    paddingBottom: hp(0.7),
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderSubtle,
    ...elevation.card,
  },
  selected: {
    borderColor: Colors.borderSelected,
    borderWidth: wp(0.55),
    backgroundColor: Colors.icyCanvas,
  },
  iconWrap: {
    width: QUICK_ACCESS_ICON + wp(1),
    height: QUICK_ACCESS_ICON + wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.25),
  },
  labelBox: {
    height: Fontsize.xs0 * 2.45,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...Typography.cardMeta,
    color: Colors.textPrimary,
    textAlign: 'center',
    width: '100%',
    lineHeight: Fontsize.xs0 * 1.22,
    includeFontPadding: false,
  },
});
