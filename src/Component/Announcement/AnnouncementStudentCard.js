import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedCard from '../AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import FeatureArtImage from '../Glass/FeatureArtImage';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {elevation, radius} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

const ART_SIZE = wp(16);

const CATEGORY_ICONS = {
  Event: 'trophy-outline',
  Notice: 'megaphone-outline',
  General: 'megaphone-outline',
  Update: 'refresh-circle-outline',
};

const AnnouncementStudentCard = ({
  item,
  animationIndex = 0,
  entering,
  replayToken = 0,
  expanded = false,
  onPress,
}) => {
  const category = item?.category || 'Notice';
  const categoryIcon = CATEGORY_ICONS[category] || CATEGORY_ICONS.Notice;

  return (
    <AnimatedCard
      index={animationIndex}
      entering={entering}
      replayToken={replayToken}
      style={styles.wrap}>
      <Pressable disabled={!onPress} onPress={onPress} style={styles.shell}>
        <View style={styles.clip}>
          <LinearGradient
            colors={[Colors.bannerIceStart, '#E8F2FF', Colors.hubCard]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.face}>
            <CardWave
              variant={SCREEN_WAVES.assignmentIce}
              color="rgba(91, 156, 255, 0.2)"
            />
            <View style={styles.content}>
              <View style={styles.topRow}>
                <View style={styles.badge}>
                  <Icon
                    name={categoryIcon}
                    size={wp(3.6)}
                    color={Colors.brandRoyal}
                  />
                  <Text style={styles.badgeText} numberOfLines={1}>
                    {category}
                  </Text>
                </View>
                {item?.date ? (
                  <View style={styles.metaChip}>
                    <Icon
                      name="calendar-outline"
                      size={wp(3.5)}
                      color={Colors.brandRoyal}
                    />
                    <Text style={styles.metaText} numberOfLines={1}>
                      {item.date}
                    </Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.bodyRow}>
                <View style={styles.copy}>
                  <Text
                    style={styles.title}
                    textBreakStrategy="simple"
                    ellipsizeMode="tail">
                    {item?.title}
                  </Text>
                  {item?.message ? (
                    <Text
                      style={styles.message}
                      numberOfLines={expanded ? undefined : 4}
                      textBreakStrategy="simple"
                      ellipsizeMode="tail">
                      {item.message}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.art} pointerEvents="none">
                  <FeatureArtImage
                    source={EducationIcons.announcements}
                    width={ART_SIZE}
                    height={ART_SIZE}
                  />
                </View>
              </View>

              {item?.time || item?.targeting ? (
                <View style={styles.footer}>
                  {item?.time ? (
                    <View style={styles.footerItem}>
                      <Icon
                        name="time-outline"
                        size={wp(3.5)}
                        color={Colors.brandRoyal}
                      />
                      <Text style={styles.footerText} numberOfLines={1}>
                        {item.time}
                      </Text>
                    </View>
                  ) : null}
                  {item?.targeting ? (
                    <View style={[styles.footerItem, item?.time && styles.footerGap]}>
                      <Icon
                        name="people-outline"
                        size={wp(3.5)}
                        color={Colors.brandRoyal}
                      />
                      <Text style={styles.footerText} numberOfLines={2}>
                        {item.targeting}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          </LinearGradient>
        </View>
      </Pressable>
    </AnimatedCard>
  );
};

export default AnnouncementStudentCard;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(1.35),
  },
  shell: {
    borderRadius: radius.banner,
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  clip: {
    borderRadius: radius.banner,
    overflow: 'hidden',
  },
  face: {
    borderRadius: radius.banner,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    paddingHorizontal: wp(3.6),
    paddingVertical: hp(1.45),
    minHeight: hp(12.4),
    overflow: 'hidden',
  },
  content: {
    zIndex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    maxWidth: '58%',
    backgroundColor: Colors.hubCard,
    borderRadius: radius.pill,
    paddingHorizontal: wp(2.6),
    paddingVertical: hp(0.42),
  },
  badgeText: {
    color: Colors.brandRoyal,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs0,
    marginLeft: wp(1.1),
    includeFontPadding: false,
    flexShrink: 1,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    marginLeft: wp(2),
  },
  metaText: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    marginLeft: wp(1),
    includeFontPadding: false,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copy: {
    flex: 1,
    minWidth: 0,
    paddingRight: wp(1.4),
    justifyContent: 'center',
  },
  title: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm1,
    lineHeight: Fontsize.sm1 + 5,
    includeFontPadding: false,
  },
  message: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.sm + 3,
    marginTop: hp(0.45),
    includeFontPadding: false,
  },
  art: {
    width: ART_SIZE,
    height: ART_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginTop: hp(1.05),
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    maxWidth: '100%',
  },
  footerGap: {
    marginLeft: wp(3.4),
  },
  footerText: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    marginLeft: wp(1.1),
    flexShrink: 1,
    includeFontPadding: false,
  },
});
