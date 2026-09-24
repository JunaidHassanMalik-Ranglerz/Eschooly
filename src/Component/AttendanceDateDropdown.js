import React, {useMemo, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedCard from './AnimatedCard';
import OptionPickerSheetModal from './OptionPickerSheetModal';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  PROFILE_GRADIENT,
} from './Profile/ProfileTheme';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const AttendanceDateDropdown = props => {
  const [open, setOpen] = useState(false);
  const premium = props?.premium !== false;
  const ranges = props?.ranges || [];

  const selectedLabel = useMemo(() => {
    const match = ranges.find(r => r.value === props?.selectedId);
    return match?.label || ranges[0]?.label || '';
  }, [props?.selectedId, ranges]);

  const trigger = (
    <Pressable
      style={styles.trigger}
      onPress={() => setOpen(true)}
      android_ripple={{color: Colors.whiteOverlay18}}>
      <View style={styles.calendarWrap}>
        <Image
          source={Images.calendar}
          style={[styles.calendarIcon, premium && styles.calendarIconPremium]}
          resizeMode="contain"
        />
      </View>
      <Text
        style={[styles.dateText, premium && styles.dateTextPremium]}
        numberOfLines={1}>
        {selectedLabel}
      </Text>
      <Icon
        name="chevron-down"
        size={wp(4)}
        color={premium ? Colors.whiteMuted85 : Colors.linkBlue}
      />
    </Pressable>
  );

  const sheet = (
    <OptionPickerSheetModal
      visible={open}
      onClose={() => setOpen(false)}
      title={Strings.dateRange}
      subtitle={selectedLabel}
      data={ranges}
      selectedValue={props?.selectedId}
      onSelect={item => props?.onSelect?.(item?.value)}
    />
  );

  if (premium) {
    return (
      <>
        <AnimatedCard
          index={props?.animationIndex ?? 0}
          entering={props?.entering}
          replayToken={props?.replayToken ?? 0}
          style={styles.wrap}>
          <LinearGradient
            colors={PROFILE_GRADIENT}
            start={GRADIENT_START}
            end={GRADIENT_END}
            style={styles.gradient}>
            {trigger}
          </LinearGradient>
        </AnimatedCard>
        {sheet}
      </>
    );
  }

  return (
    <>
      <View style={styles.wrapPlain}>{trigger}</View>
      {sheet}
    </>
  );
};

export default AttendanceDateDropdown;

const styles = StyleSheet.create({
  wrap: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    marginBottom: hp(1.5),
  },
  wrapPlain: {
    backgroundColor: Colors.duesCardBg,
    borderRadius: wp(3),
    overflow: 'hidden',
    marginBottom: hp(1.5),
  },
  gradient: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
  },
  calendarWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2),
  },
  calendarIcon: {
    width: wp(4),
    height: wp(4),
    tintColor: Colors.black,
  },
  calendarIconPremium: {
    tintColor: Colors.white,
  },
  dateText: {
    flex: 1,
    color: Colors.linkBlue,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs4,
    marginRight: wp(2),
  },
  dateTextPremium: {
    color: Colors.white,
  },
});
