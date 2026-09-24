import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const TopicItem = props => {
  const status = props?.topic?.status;
  const premium = props?.premium;

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.checkbox,
          premium && styles.checkboxPremium,
          status === 'completed' && styles.checkboxDone,
          status === 'in_progress' && styles.checkboxProgress,
          status === 'pending' && styles.checkboxPending,
        ]}>
        {status === 'completed' && (
          <Icon name="checkmark" size={wp(3.5)} color={Colors.white} />
        )}
      </View>

      <View style={styles.info}>
        <Text
          style={[styles.title, premium && styles.titlePremium]}
          numberOfLines={1}>
          {props?.topic?.title}
        </Text>
        <View style={styles.durationRow}>
          <Icon
            name="time-outline"
            size={wp(3.2)}
            color={premium ? Colors.whiteMuted75 : Colors.grayText}
          />
          <Text
            style={[styles.duration, premium && styles.durationPremium]}
            numberOfLines={1}>
            {props?.topic?.duration}
          </Text>
        </View>
      </View>

      {status === 'completed' && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>{Strings.completed}</Text>
        </View>
      )}

      {status === 'in_progress' && (
        <View style={styles.progressBadge}>
          <Text style={styles.progressText}>{Strings.inProgress}</Text>
        </View>
      )}

      {status === 'pending' && (
        <View style={styles.pendingBadge}>
          <Text style={styles.pendingText}>{Strings.pending}</Text>
        </View>
      )}
    </View>
  );
};

export default TopicItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
  },
  checkbox: {
    width: wp(5.5),
    height: wp(5.5),
    borderRadius: wp(1.5),
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  checkboxPremium: {
    backgroundColor: Colors.whiteOverlay18,
    borderColor: Colors.whiteOverlay22,
  },
  checkboxDone: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxProgress: {
    borderColor: Colors.iconSky,
    backgroundColor: Colors.transparent,
  },
  checkboxPending: {
    borderColor: Colors.whiteMuted75,
    backgroundColor: Colors.transparent,
  },
  info: {
    flex: 1,
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.3),
    width: wp(45),
  },
  titlePremium: {
    color: Colors.white,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(2.67),
    width: wp(20),
    marginLeft: wp(1),
  },
  durationPremium: {
    color: Colors.whiteMuted75,
  },
  completedBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.18)',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: wp(4),
  },
  completedText: {
    color: '#BFDBFE',
    fontFamily: Fonts.regular,
    fontSize: wp(2.24),
  },
  progressBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.18)',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: wp(4),
  },
  progressText: {
    color: '#C7D2FE',
    fontFamily: Fonts.regular,
    fontSize: wp(2.24),
  },
  pendingBadge: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: wp(4),
  },
  pendingText: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: wp(2.24),
  },
});
