import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const LiveClassCard = props => {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryLight]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.topPart}>
        <View style={styles.topRow}>
          <View style={styles.zoomRow}>
            <View style={styles.zoomIconBox}>
              <Icon
                name="videocam-outline"
                size={wp(4)}
                color={Colors.whiteMuted85}
              />
            </View>
            <Text style={styles.zoomText} numberOfLines={1}>
              {Strings.zoomMeeting}
            </Text>
          </View>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText} numberOfLines={1}>
              {Strings.liveBadge}
            </Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {props?.item?.title}
        </Text>
        <Text style={styles.classInfo} numberOfLines={1}>
          {props?.item?.classInfo}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Icon name="people-outline" size={wp(4)} color={Colors.whiteMuted85} />
            <Text style={styles.infoText} numberOfLines={1}>
              {props?.item?.joined}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="time-outline" size={wp(4)} color={Colors.whiteMuted85} />
            <Text style={styles.infoText} numberOfLines={1}>
              {props?.item?.started}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.bottomPart}>
        <TouchableOpacity
          style={styles.joinBtn}
          activeOpacity={0.85}
          onPress={() => {}}>
          <Icon name="videocam" size={wp(4.5)} color={Colors.white} />
          <Text style={styles.joinText} numberOfLines={1}>
            {Strings.joinClass}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.noteBtn} activeOpacity={0.85}>
          <Image
            source={Images.onlineClasstickIcon}
            style={styles.tickIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LiveClassCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: wp(5),
    marginBottom: hp(2.2),
    backgroundColor: Colors.white,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  topPart: {
    padding: wp(4),
    paddingBottom: hp(2),
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  zoomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    flex: 1,
    paddingRight: wp(2),
  },
  zoomIconBox: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(2),
    backgroundColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    letterSpacing: 0.6,
    flex: 1,
    includeFontPadding: false,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.red,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    gap: wp(1.2),
  },
  liveDot: {
    width: wp(1.8),
    height: wp(1.8),
    borderRadius: wp(1),
    backgroundColor: Colors.white,
  },
  liveText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
    letterSpacing: 0.4,
    includeFontPadding: false,
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.ml,
    marginBottom: hp(0.4),
  },
  classInfo: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(1.5),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    flex: 1,
  },
  infoText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    flex: 1,
    includeFontPadding: false,
  },
  bottomPart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: wp(3),
    gap: wp(2),
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  joinBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: wp(8),
    paddingVertical: hp(1.35),
    gap: wp(2),
  },
  joinText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    includeFontPadding: false,
  },
  noteBtn: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickIcon: {
    width: wp(5.5),
    height: wp(5.5),
  },
});
