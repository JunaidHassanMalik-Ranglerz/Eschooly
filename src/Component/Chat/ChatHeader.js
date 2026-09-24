import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../../Assets';
import PersonAvatar from '../Profile/PersonAvatar';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {GRADIENT_END, GRADIENT_START} from '../Profile/ProfileTheme';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {EnterView} from '../AnimatedCard';
import {getChatHeaderEnter} from '../../utils/cardAnimation';

const ChatHeader = props => {
  return (
    <EnterView motion={getChatHeaderEnter()} enterKey="chat-header">
      <LinearGradient
        colors={CARD_GRADIENTS.hubAlt}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.8}
          onPress={props?.onBack}>
          <Icon name="chevron-back" size={wp(5.5)} color={Colors.white} />
        </TouchableOpacity>

        <View style={styles.userRow}>
          <PersonAvatar
            person={{
              label: props?.user?.name,
              name: props?.user?.name,
              gender: props?.user?.gender,
            }}
            size={wp(11)}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name} numberOfLines={1}>
              {props?.user?.name}
            </Text>
            <View style={styles.statusRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.statusText} numberOfLines={1}>
                {props?.user?.role || Strings.schoolAdminOnline}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.8}>
          <Image
            source={Images.threeDots}
            style={styles.menuIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </LinearGradient>
    </EnterView>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.whiteOverlay18,
  },
  backBtn: {
    marginRight: wp(2),
    zIndex: 1,
  },
  userRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
    zIndex: 1,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(0.2),
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.success,
    marginRight: wp(1.5),
  },
  statusText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: 11,
  },
  menuBtn: {
    padding: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  menuIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.white,
  },
});
