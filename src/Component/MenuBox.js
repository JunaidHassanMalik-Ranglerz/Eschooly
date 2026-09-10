import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {wp} from '../Constants/Responsive';

const MenuBox = props => {
  return (
    <Pressable style={styles.box} onPress={props?.onPress}>
      <View style={styles.iconWrap}>
        <Image
          source={props?.icon}
          style={[
            styles.icon,
            props?.iconColor && {tintColor: props?.iconColor},
          ]}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {props?.title}
      </Text>

      <View style={styles.arrowBtn}>
        <AntDesign name="arrowright" size={wp(3.5)} color={Colors.white} />
      </View>
    </Pressable>
  );
};

export default MenuBox;

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(3.5),
    paddingHorizontal: wp(4),
    backgroundColor: Colors.white,
    marginHorizontal: wp(4),
    marginTop: wp(3),
    borderRadius: wp(3.8),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconWrap: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2.5),
    backgroundColor: '#E8F8F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  icon: {
    width: wp(5.5),
    height: wp(5.5),
  },
  title: {
    flex: 1,
    fontSize: wp(4),
    color: Colors.black,
    fontFamily: Fonts.regular,
    // maxWidth:wp(43),
    width:wp(20),
  },
  arrowBtn: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3.5),
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
