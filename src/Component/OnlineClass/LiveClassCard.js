import React from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {ocText, ocLiveTitle} from './onlineClassText';
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
          onPress={() => Alert.alert(Strings.joinClass, Strings.joinClassSoon)}>
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
    borderRadius: wp(4),
    marginBottom: hp(2.5),
    backgroundColor: Colors.white,
    elevation: 6,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: hp(0.5)},
    shadowOpacity: 0.12,
    shadowRadius: wp(2),
  },
  topPart: {
    padding: wp(4),
    paddingBottom: hp(2),
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
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
    ...ocText,
    color: Colors.whiteMuted85,
    letterSpacing: 0.8,
    flex: 1,
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
    ...ocText,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  title: {
    ...ocLiveTitle,
    color: Colors.white,
    marginBottom: hp(0.4),
  },
  classInfo: {
    ...ocText,
    color: Colors.whiteMuted85,
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
    ...ocText,
    color: Colors.whiteMuted85,
    flex: 1,
  },
  bottomPart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: wp(3),
    gap: wp(2),
    borderBottomLeftRadius: wp(4),
    borderBottomRightRadius: wp(4),
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
    paddingVertical: hp(1.4),
    gap: wp(2),
  },
  joinText: {
    ...ocText,
    color: Colors.white,
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
