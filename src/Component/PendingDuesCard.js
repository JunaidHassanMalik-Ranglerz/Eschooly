import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';
import { Strings } from '../Constants/Strings';
import { wp, hp } from '../Constants/Responsive';
import { Images } from '../Assets';

const PendingDuesCard = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Dues')}>
      <View style={styles.iconBox}>
        <Image source={Images.pendingDues} style={styles.endingDuesIcon} resizeMode="contain" />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.amount} numberOfLines={1}>{Strings.pendingDuesAmount}</Text>
        <Text style={styles.label} numberOfLines={1}>{Strings.pendingDuesLabel}</Text>
      </View>

      <View style={styles.arrowBtn}>
        <Icon name="chevron-forward" color={Colors.white} style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
};

export default PendingDuesCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.duesCardBg,
    marginHorizontal: wp(4),
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: wp(4),
  },
  iconBox: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(3),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    marginLeft: wp(3),
  },
  amount: {
    color: Colors.primary,
    fontFamily: Fonts.regular,

    fontSize: wp(5.3),
    width: wp(40),
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    marginTop: hp(0.3),
    width: wp(40),
  },
  arrowBtn: {
    width: wp(8.5),
    height: wp(8.5),
    borderRadius: wp(4.5),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endingDuesIcon: {
    width: wp(6.4),
    height: wp(6.4),

  },
  arrowIcon: {
    width: wp(4.5),
    height: wp(4.5),
    marginLeft: wp(1.5),
    marginTop: wp(0.8),
  }
});
