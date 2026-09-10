import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const ClassCategoryCard = ({item, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={() => onPress?.(item)}>
      <View style={styles.iconBox}>
        <Icon name="folder-outline" size={wp(5.5)} color={Colors.primary} />
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>

      <Icon name="chevron-forward" size={wp(5)} color={Colors.grayText} />
    </TouchableOpacity>
  );
};

export default ClassCategoryCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(4),
    marginBottom: hp(1.5),
  },
  iconBox: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    backgroundColor: Colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  info: {
    flex: 1,
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.3),
  },
  subtitle: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
  },
});
