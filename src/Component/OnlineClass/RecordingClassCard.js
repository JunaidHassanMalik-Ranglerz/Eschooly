import React from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {ocText, ocTitle16} from './onlineClassText';
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
          <Text style={styles.title} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.detail} numberOfLines={1}>
            {item?.detail}
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText} numberOfLines={1}>
            {item?.status}
          </Text>
        </View>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.8}
          onPress={() => Alert.alert(Strings.watch, Strings.watchSoon)}>
          <Icon name="play-outline" size={wp(3.5)} color={Colors.black} />
          <Text style={styles.actionText} numberOfLines={1}>
            {Strings.watch}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.8}
          onPress={() => Alert.alert(Strings.download, Strings.downloadSoon)}>
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
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(4),
    marginBottom: hp(1.5),
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
    paddingRight: wp(2),
  },
  title: {
    ...ocTitle16,
    color: Colors.black,
    marginBottom: hp(0.3),
  },
  detail: {
    ...ocText,
    color: Colors.grayText,
  },
  statusBadge: {
    backgroundColor: Colors.cardBg,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.35),
  },
  statusText: {
    ...ocText,
    color: Colors.EndColor,
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
    borderRadius: wp(2.5),
    paddingVertical: hp(1.2),
    gap: wp(1.5),
  },
  actionText: {
    ...ocText,
    color: Colors.black,
  },
});
