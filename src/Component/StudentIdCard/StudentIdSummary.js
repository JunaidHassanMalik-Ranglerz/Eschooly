import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Constants/Colors';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';
import {GRADIENT_END, GRADIENT_START} from '../Profile/ProfileTheme';
import PersonAvatar from '../Profile/PersonAvatar';

const StudentIdSummary = ({data}) => {
  return (
    <LinearGradient
      colors={CARD_GRADIENTS.royal}
      start={GRADIENT_START}
      end={GRADIENT_END}
      style={styles.wrap}>
      <PersonAvatar
        person={{
          value: data.value,
          label: data.name,
          name: data.name,
          initials: data.initials,
          gender: data.gender,
          photo: data.photo,
          photoUrl: data.photoUrl,
          className: data.class,
          classBadge: data.classBadge,
          classInfo: data.classInfo,
        }}
        size={wp(12)}
        borderColor="rgba(255,255,255,0.35)"
        borderWidth={1.5}
        style={styles.avatar}
      />

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>{data.status}</Text>
          </View>
        </View>
        <Text style={styles.meta}>{data.summaryLine}</Text>
      </View>
    </LinearGradient>
  );
};

export default StudentIdSummary;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2.8),
    borderRadius: wp(4),
    padding: wp(3.5),
    borderWidth: 1,
    borderColor: '#65C4FF',
    overflow: 'hidden',
  },
  avatar: {
    marginRight: wp(3),
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.35),
    gap: wp(2),
  },
  name: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  activeBadge: {
    backgroundColor: Colors.whiteOverlay22,
    borderRadius: wp(3),
    paddingHorizontal: wp(2.2),
    paddingVertical: hp(0.3),
  },
  activeText: {
    color: Colors.iconSky,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  meta: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
});
