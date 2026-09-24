import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {GRADIENT_END, GRADIENT_START} from '../Profile/ProfileTheme';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {EnterView} from '../AnimatedCard';
import {getChatBubbleEnter} from '../../utils/cardAnimation';

const ChatAnnouncementCard = props => {
  const item = props?.item;
  const entering = props?.entering || getChatBubbleEnter(2, 'received');

  return (
    <EnterView motion={entering} enterKey="chat-announcement" style={styles.wrap}>
      <LinearGradient
        colors={CARD_GRADIENTS.sapphire}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.iconCircle}>
            <Icon name="megaphone-outline" size={wp(5)} color={Colors.white} />
          </View>
          <View style={styles.topText}>
            <Text style={styles.label} numberOfLines={1}>
              {Strings.chatAnnouncement}
            </Text>
            <Text style={styles.school} numberOfLines={1}>
              {item?.school}
            </Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {item?.title}
        </Text>
        <Text style={styles.desc} numberOfLines={4}>
          {item?.desc}
        </Text>

        <View style={styles.footerRow}>
          <View style={styles.footerItem}>
            <Icon name="calendar-outline" size={wp(3.5)} color={Colors.whiteMuted85} />
            <Text style={styles.footerText} numberOfLines={1}>
              {item?.date}
            </Text>
          </View>
          <View style={styles.footerItem}>
            <Icon name="time-outline" size={wp(3.5)} color={Colors.whiteMuted85} />
            <Text style={styles.footerText} numberOfLines={1}>
              {item?.time}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </EnterView>
  );
};

export default ChatAnnouncementCard;

const styles = StyleSheet.create({
  wrap: {
    borderRadius: wp(4),
    marginBottom: hp(2),
    overflow: 'hidden',
  },
  card: {
    borderRadius: wp(4),
    padding: wp(4),
    overflow: 'hidden',
    marginBottom: hp(2),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.2),
    zIndex: 1,
  },
  iconCircle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: Colors.whiteOverlay22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  topText: {
    flex: 1,
  },
  label: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.bold,
    fontSize: 10,
    letterSpacing: 0.8,
    marginBottom: hp(0.2),
  },
  school: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: 11,
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: 14,
    marginBottom: hp(0.8),
    zIndex: 1,
  },
  desc: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: hp(1.2),
    zIndex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    zIndex: 1,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
  },
  footerText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: 11,
  },
});
