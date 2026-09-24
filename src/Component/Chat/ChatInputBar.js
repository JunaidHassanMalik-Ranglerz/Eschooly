import React from 'react';
import {Image, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {EnterView} from '../AnimatedCard';
import {getChatInputEnter, getChatSendEnter} from '../../utils/cardAnimation';

const ChatInputBar = props => {
  const inputEntering = props?.inputEntering || getChatInputEnter(0);
  const sendEntering = props?.sendEntering || getChatSendEnter(1);

  return (
    <View style={styles.bottomWrap}>
      <View style={styles.bar}>
        <EnterView
          motion={inputEntering}
          enterKey="chat-input"
          style={styles.inputEnter}>
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
              placeholderTextColor={Colors.whiteMuted75}
              style={styles.input}
              multiline={false}
            />
          </View>
        </EnterView>

        <EnterView motion={sendEntering} enterKey="chat-send" style={styles.sendEnter}>
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
        </EnterView>
      </View>
    </View>
  );
};

export default ChatInputBar;

const styles = StyleSheet.create({
  bottomWrap: {
    backgroundColor: '#051B41',
    borderTopWidth: 1,
    borderTopColor: Colors.whiteOverlay18,
    paddingHorizontal: wp(4),
    paddingTop: hp(1.2),
    paddingBottom: hp(2.5),
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
  },
  inputEnter: {
    flex: 1,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A2F5C',
    borderRadius: wp(8),
    borderWidth: 1,
    borderColor: Colors.whiteOverlay22,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1),
    gap: wp(2),
  },
  pinIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.whiteMuted85,
  },
  input: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: 13,
    padding: 0,
  },
  sendEnter: {
    flexShrink: 0,
  },
  sendBtn: {
    width: wp(11.5),
    height: wp(11.5),
    borderRadius: wp(6),
    backgroundColor: '#2563EB',
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
