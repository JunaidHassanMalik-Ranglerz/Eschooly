import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const ChatBubble = props => {
  const item = props?.item;
  const isSent = item?.type === 'sent';

  return (
    <View style={[styles.wrap, isSent ? styles.sentWrap : styles.receivedWrap]}>
      <View style={[styles.bubble, isSent ? styles.sentBubble : styles.receivedBubble]}>
        <Text
          style={[styles.message, isSent ? styles.sentText : styles.receivedText]}
          numberOfLines={10}>
          {item?.text}
        </Text>
      </View>

      <View style={[styles.metaRow, isSent ? styles.sentMeta : styles.receivedMeta]}>
        {isSent ? (
          <>
            <Text style={styles.metaText} numberOfLines={1}>
              {item?.time}
            </Text>
            <Icon name="checkmark-done" size={wp(3.5)} color={Colors.linkBlue} />
          </>
        ) : (
          <Text style={styles.metaText} numberOfLines={1}>
            {item?.sender} · {item?.time}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(1.5),
  },
  sentWrap: {
    alignItems: 'flex-end',
  },
  receivedWrap: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: wp(75),
    borderRadius: wp(4),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.2),
  },
  sentBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: wp(1),
  },
  receivedBubble: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: wp(1),
  },
  message: {
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
  sentText: {
    color: Colors.white,
  },
  receivedText: {
    color: Colors.black,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.4),
    gap: wp(1),
  },
  sentMeta: {
    justifyContent: 'flex-end',
  },
  receivedMeta: {
    justifyContent: 'flex-start',
  },
  metaText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: 10,
  },
});
