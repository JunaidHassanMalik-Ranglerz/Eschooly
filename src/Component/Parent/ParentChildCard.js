import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const ParentChildCard = ({
  child,
  onPress,
  showRoll = false,
  chevron = 'chevron-forward',
}) => {
  if (!child) {
    return null;
  }

  return (
    <View style={styles.wrap}>
      <Pressable
        style={styles.card}
        onPress={onPress}
        android_ripple={{color: 'transparent', foreground: false}}>
        <View style={styles.inner} pointerEvents="none">
          <View style={styles.avatarWrap}>
            <Image
              source={Images.avator}
              style={styles.avatar}
              resizeMode="contain"
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {child.label}
            </Text>
            <Text style={styles.meta} numberOfLines={1}>
              {child.classLabel ||
                (child.className && child.section
                  ? `${child.className}${child.section}`
                  : child.classBadge)}
            </Text>
            {showRoll ? (
              <Text style={styles.roll} numberOfLines={1}>
                {Strings.rollNo} {child.rollNo}
              </Text>
            ) : null}
          </View>
          <Icon name={chevron} size={wp(5)} color={Colors.grayText} />
        </View>
      </Pressable>
    </View>
  );
};

export default ParentChildCard;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    borderRadius: wp(4.5),
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  card: {
    width: '100%',
    borderRadius: wp(4.5),
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
  },
  avatarWrap: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
    overflow: 'hidden',
  },
  avatar: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.primary,
  },
  info: {
    flex: 1,
    marginRight: wp(2),
  },
  name: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(0.2),
  },
  meta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  roll: {
    color: Colors.mutedText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
});
