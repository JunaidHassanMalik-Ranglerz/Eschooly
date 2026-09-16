import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const LibraryResourceCard = ({item, onPress}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPress?.(item)}
        style={styles.body}>
        <View style={styles.topRow}>
          <View style={[styles.iconBox, {backgroundColor: item.iconBg}]}>
            <Icon name={item.icon} size={wp(5)} color={item.iconColor} />
          </View>
          {item.isNew ? (
            <View style={styles.newBadge}>
              <Text style={styles.newText}>NEW</Text>
            </View>
          ) : (
            <View />
          )}
        </View>

        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.fileInfo}>
          {item.fileType} - {item.fileSize}
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
          onPress={() => {}}>
          <Icon
            name="download-outline"
            size={wp(4.5)}
            color={Colors.grayText}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LibraryResourceCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: hp(1.5),
    overflow: 'hidden',
  },
  body: {
    paddingHorizontal: wp(3.5),
    paddingTop: wp(3.5),
    paddingBottom: hp(0.8),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: hp(1.2),
  },
  iconBox: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  newBadge: {
    backgroundColor: Colors.successBg,
    borderRadius: wp(2),
    paddingHorizontal: wp(1.8),
    paddingVertical: hp(0.2),
  },
  newText: {
    color: Colors.success,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
    lineHeight: Fontsize.sm + 1,
    marginBottom: hp(0.4),
    minHeight: (Fontsize.sm + 1) * 2,
    includeFontPadding: false,
  },
  subtitle: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginBottom: hp(1),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3.5),
    paddingBottom: wp(3.5),
  },
  fileInfo: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    flex: 1,
  },
});
