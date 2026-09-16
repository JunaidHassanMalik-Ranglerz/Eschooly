import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const RecordingClassCard = props => {
  const item = props?.item;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Image
          source={Images.videoIcon}
          style={styles.videoIcon}
          resizeMode="contain"
        />

        <View style={styles.info}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {item?.title}
            </Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText} numberOfLines={1}>
                {item?.status}
              </Text>
            </View>
          </View>
          <Text style={styles.detail} numberOfLines={1}>
            {item?.detail}
          </Text>
        </View>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.8}
          onPress={() => {}}>
          <Icon name="play-outline" size={wp(3.5)} color={Colors.black} />
          <Text style={styles.actionText} numberOfLines={1}>
            {Strings.watch}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.8}
          onPress={() => {}}>
          <Icon name="download-outline" size={wp(3.5)} color={Colors.black} />
          <Text style={styles.actionText} numberOfLines={1}>
            {Strings.download}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecordingClassCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    padding: wp(4),
    marginBottom: hp(1.5),
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  videoIcon: {
    width: wp(10),
    height: wp(10),
    marginRight: wp(3),
  },
  info: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.3),
  },
  title: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
    marginRight: wp(2),
    includeFontPadding: false,
  },
  detail: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  statusBadge: {
    backgroundColor: Colors.cardBg,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: Colors.mutedText,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    gap: wp(2),
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: wp(5),
    paddingVertical: hp(1.15),
    gap: wp(1.5),
  },
  actionText: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    includeFontPadding: false,
  },
});
