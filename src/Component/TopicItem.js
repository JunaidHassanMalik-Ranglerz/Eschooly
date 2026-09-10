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

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.checkbox,
          status === 'completed' && styles.checkboxDone,
          status === 'in_progress' && styles.checkboxProgress,
          status === 'pending' && styles.checkboxPending,
        ]}>
        {status === 'completed' && (
          <Icon name="checkmark" size={wp(3.5)} color={Colors.white} />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{props?.topic?.title}</Text>
        <View style={styles.durationRow}>
          <Icon name="time-outline" size={wp(3.2)} color={Colors.grayText} />
          <Text style={styles.duration} numberOfLines={1}>{props?.topic?.duration}</Text>
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
  checkboxDone: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxProgress: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  checkboxPending: {
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  info: {
    flex: 1,
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.3),
    width:wp(45),
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(2.67),
    width:wp(20),
    marginLeft: wp(1),
  },
  completedBadge: {
    backgroundColor: Colors.successBg,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: wp(4),
  },
  completedText: {
    color: Colors.success,
    fontFamily: Fonts.regular,
    fontSize: wp(2.24),
  },
  progressBadge: {
    backgroundColor: Colors.pendingBg,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: wp(4),
  },
  progressText: {
    color: Colors.warning,
    fontFamily: Fonts.regular,
    fontSize: wp(2.24),
  },
  pendingBadge: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: wp(4),
  },
  pendingText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(2.24),
  },
});
