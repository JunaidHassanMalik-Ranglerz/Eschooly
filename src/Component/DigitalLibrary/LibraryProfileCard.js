import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import PersonAvatar from '../Profile/PersonAvatar';
import {SCREEN_WAVES} from '../CardWave';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {wp, hp} from '../../Constants/Responsive';

const LibraryProfileCard = ({
  student,
  animationIndex = 0,
}) => (
  <ProfileGradientCard
    innerStyle={styles.inner}
    animationIndex={animationIndex}
    disableAnimation={false}
    colors={CARD_GRADIENTS.notification}
    waveVariant={SCREEN_WAVES.library}>
    <View style={styles.row}>
      <PersonAvatar person={student} size={wp(12)} style={styles.avatar} />

      <View style={styles.info}>
        <Text style={styles.name}>{student?.label}</Text>
        <View style={styles.badges}>
          <View style={styles.classBadge}>
            <Text style={styles.classText}>
              {student?.classLabel || student?.classBadge}
            </Text>
          </View>
          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>{student?.status || 'Active'}</Text>
          </View>
        </View>
      </View>
    </View>
  </ProfileGradientCard>
);

export default LibraryProfileCard;

const styles = StyleSheet.create({
  inner: {
    paddingVertical: hp(1.4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  avatar: {
    marginRight: wp(3),
    borderWidth: 2,
    borderColor: Colors.whiteOverlay22,
  },
  info: {
    flex: 1,
  },
  name: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(0.8),
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: wp(2),
  },
  classBadge: {
    backgroundColor: Colors.whiteOverlay18,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
  },
  classText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  activeBadge: {
    backgroundColor: 'rgba(134, 239, 172, 0.18)',
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
  },
  activeText: {
    color: '#86EFAC',
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
});
