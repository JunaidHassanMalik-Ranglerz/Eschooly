import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ProgressBar from './ProgressBar';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const OverallProgressCard = props => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.percentRow}>
          <Text style={styles.percent} numberOfLines={1}>
            {props?.overview?.percentText}
          </Text>
          <Text style={styles.completeText}>{Strings.complete}</Text>
        </View>

        <View style={styles.trackBadge}>
          <Image
            source={Images.greenTick}
            style={styles.greenTickIcon}
            resizeMode="contain"
          />
          <Text style={styles.trackText}>{Strings.onTrack}</Text>
        </View>
      </View>

      <ProgressBar
        progress={props?.overview?.progress}
        style={styles.progressBar}
      />

      <Text style={styles.subText} numberOfLines={1}>
        {props?.overview?.completedTopics} {Strings.of}{' '}
        {props?.overview?.totalTopics} {Strings.topicsCompleted}
      </Text>
    </View>
  );
};

export default OverallProgressCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(4),
    marginBottom: hp(2),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  percentRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  percent: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: wp(5.33),
    marginRight: wp(2),
    width:wp(13),
  },
  completeText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(2.24),
  },
  trackBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successBg,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
    borderRadius: wp(5),
  },
  greenTickIcon: {
    width: wp(3.5),
    height: wp(3.5),
  },
  trackText: {
    color: Colors.onTrack,
    fontFamily: Fonts.regular,
    fontSize: wp(2.67),
    marginLeft: wp(1),
  },
  progressBar: {
    width: wp(83.7),
    marginBottom: hp(1.2),
    height: hp(1),
    borderRadius: hp(0.6),
  },
  subText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(2.24),
    width:wp(45),
  },
});
