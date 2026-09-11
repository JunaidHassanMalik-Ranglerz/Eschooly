import React from 'react';
import {Image, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const ChatInputBar = props => {
  return (
    <View style={styles.bottomWrap}>
      <View style={styles.bar}>
        <View style={styles.inputWrap}>
          <Image
            source={Images.pin}
            style={styles.pinIcon}
            resizeMode="contain"
          />
          <TextInput
            value={props?.value}
            onChangeText={props?.onChangeText}
            placeholder={Strings.typeMessage}
            placeholderTextColor={Colors.placeholderText}
            style={styles.input}
            multiline={false}
          />
        </View>

        <TouchableOpacity
          style={styles.sendBtn}
          activeOpacity={0.85}
          onPress={props?.onSend}>
          <Image
            source={Images.send}
            style={styles.sendIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInputBar;

const styles = StyleSheet.create({
  bottomWrap: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: wp(4),
    paddingTop: hp(1.2),
    paddingBottom: hp(2.5),
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: wp(8),
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1),
    gap: wp(2),
  },
  pinIcon: {
    width: wp(5),
    height: wp(5),
  },
  input: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: 13,
    padding: 0,
  },
  sendBtn: {
    width: wp(11.5),
    height: wp(11.5),
    borderRadius: wp(6),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: hp(0.4)},
    shadowOpacity: 0.18,
    shadowRadius: wp(1.5),
  },
  sendIcon: {
    width: wp(5),
    height: wp(5),
  },
});
