import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DepthIcon from '../DepthIcon';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import {getSubjectIconTheme} from '../Syllabus/SubjectTheme';
import {SCREEN_WAVES} from '../CardWave';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {getSubjectGradient} from '../../Constants/CardTheme';
import {wp, hp} from '../../Constants/Responsive';

const LibraryResourceCard = ({item, onPress, animationIndex = 0}) => {
  const gradientIndex = Number(String(item?.id || '0').replace(/\D/g, '')) || animationIndex;

  const subjectIcon = getSubjectIconTheme(item.subtitle?.split('-')[0]?.trim() || item.title);

  return (
    <ProfileGradientCard
      style={styles.cardWrap}
      innerStyle={styles.inner}
      animationIndex={animationIndex}
      colors={getSubjectGradient(gradientIndex)}
      waveVariant={animationIndex === 3 ? SCREEN_WAVES.library : null}
      onPress={() => onPress?.(item)}>
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <DepthIcon name={subjectIcon.icon} size={wp(5)} color={subjectIcon.color} />
        </View>
        {item.isNew ? (
          <View style={styles.newBadge}>
            <Text style={styles.newText}>NEW</Text>
          </View>
        ) : (
          <View />
        )}
      </View>

      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>

      <View style={styles.footer}>
        <Text style={styles.fileInfo}>
          {item.fileType} - {item.fileSize}
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
          onPress={() => {}}>
          <Icon name="download-outline" size={wp(4.5)} color={Colors.whiteMuted85} />
        </TouchableOpacity>
      </View>
    </ProfileGradientCard>
  );
};

export default LibraryResourceCard;

const styles = StyleSheet.create({
  cardWrap: {
    width: '48%',
  },
  inner: {
    paddingVertical: hp(1.2),
    minHeight: hp(18),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: hp(1),
    zIndex: 1,
  },
  iconBox: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  newBadge: {
    backgroundColor: 'rgba(134, 239, 172, 0.22)',
    borderRadius: wp(2),
    paddingHorizontal: wp(1.8),
    paddingVertical: hp(0.2),
  },
  newText: {
    color: '#86EFAC',
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
    lineHeight: Fontsize.sm + 1,
    marginBottom: hp(0.4),
    minHeight: (Fontsize.sm + 1) * 2,
    includeFontPadding: false,
    zIndex: 1,
  },
  subtitle: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginBottom: hp(0.8),
    zIndex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.whiteOverlay18,
    paddingTop: hp(0.8),
    zIndex: 1,
  },
  fileInfo: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    flex: 1,
  },
});
