import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import OptionPickerSheetModal from './OptionPickerSheetModal';
import CardWave, {SCREEN_WAVES} from './CardWave';
import FeatureArtImage from './Glass/FeatureArtImage';
import {EducationIcons} from '../Assets/EducationIcons';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
} from './Profile/ProfileTheme';
import {getSubjectTheme} from './Syllabus/SubjectTheme';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {elevation, radius} from '../Constants/Theme';
import {wp, hp} from '../Constants/Responsive';
import AnimatedCard from './AnimatedCard';
import {useStudentTone} from './Glass/StudentTone';

const SyllabusFilter = props => {
  const [open, setOpen] = useState(false);
  const theme = getSubjectTheme(props?.label);
  const animationIndex = props?.animationIndex ?? 1;
  const subjects = props?.subjects || [];
  const icy = useStudentTone();

  const cardInner = (
    <>
      <TouchableOpacity
        style={[styles.dropdownWrap, icy && styles.dropdownWrapIcy]}
        activeOpacity={0.8}
        onPress={() => setOpen(true)}>
        {icy ? (
          <FeatureArtImage
            source={EducationIcons.syllabus}
            width={wp(9)}
            height={wp(9)}
          />
        ) : (
          <Icon
            name={theme.icon}
            size={wp(5.5)}
            color={theme.iconColor}
          />
        )}
        <View style={styles.dropdownTextCol}>
          <Text
            style={[styles.subjectLabel, icy && styles.subjectLabelIcy]}
            numberOfLines={1}>
            {Strings.subject}
          </Text>
          <Text
            style={[styles.selectedText, icy && styles.selectedTextIcy]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {props?.label}
          </Text>
        </View>
        <Icon
          name="chevron-down"
          size={wp(4.5)}
          color={icy ? Colors.textSecondary : Colors.whiteMuted85}
        />
      </TouchableOpacity>

      <View style={[styles.classBadge, icy && styles.classBadgeIcy]}>
        <Icon
          name="school-outline"
          size={wp(4)}
          color={icy ? Colors.brandNavy : Colors.white}
        />
        <Text
          style={[styles.classText, icy && styles.classTextIcy]}
          numberOfLines={1}>
          {props?.className}
        </Text>
      </View>
    </>
  );

  return (
    <AnimatedCard
      index={animationIndex}
      style={[styles.wrap, icy ? styles.wrapIcy : IDENTITY_CARD_SHADOW]}>
      {icy ? (
        <View style={styles.clipIcy}>
          <LinearGradient
            colors={[Colors.bannerIceStart, '#E8F2FF', Colors.hubCard]}
            start={GRADIENT_START}
            end={GRADIENT_END}
            style={[styles.card, styles.cardIcy]}>
            <CardWave
              variant={SCREEN_WAVES.assignmentIce}
              color="rgba(91, 156, 255, 0.18)"
            />
            <View style={styles.foreground}>{cardInner}</View>
          </LinearGradient>
        </View>
      ) : (
        <LinearGradient
          colors={theme.gradient}
          start={GRADIENT_START}
          end={GRADIENT_END}
          style={styles.card}>
          {cardInner}
        </LinearGradient>
      )}

      <OptionPickerSheetModal
        visible={open}
        onClose={() => setOpen(false)}
        title={Strings.subject}
        subtitle={props?.label}
        data={subjects}
        selectedValue={props?.value}
        onSelect={item => props?.onChange?.(item)}
        variant={icy ? 'ice' : 'navy'}
      />
    </AnimatedCard>
  );
};

export default SyllabusFilter;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(2),
    borderRadius: CARD_RADIUS,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: CARD_RADIUS,
    padding: wp(3),
    overflow: 'hidden',
  },
  dropdownWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(2),
    borderRadius: wp(3),
    overflow: 'hidden',
    height: wp(12.13),
    backgroundColor: Colors.whiteOverlay18,
    paddingHorizontal: wp(3),
    gap: wp(2),
  },
  dropdownTextCol: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  subjectLabel: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxm,
  },
  selectedText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.15),
  },
  classBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteOverlay22,
    borderRadius: wp(3),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.7),
    gap: wp(1.2),
  },
  classText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xxm,
    maxWidth: wp(16),
  },
  wrapIcy: {
    borderRadius: radius.banner,
    overflow: 'visible',
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  clipIcy: {
    borderRadius: radius.banner,
    overflow: 'hidden',
  },
  foreground: {
    zIndex: 1,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcy: {
    borderRadius: radius.banner,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    flexDirection: 'column',
  },
  dropdownWrapIcy: {
    backgroundColor: Colors.hubCard,
    height: wp(13.2),
    overflow: 'visible',
  },
  subjectLabelIcy: {
    color: Colors.textSecondary,
  },
  selectedTextIcy: {
    color: Colors.textPrimary,
    fontSize: Fontsize.xs1,
    fontFamily: Fonts.bold,
  },
  classBadgeIcy: {
    backgroundColor: Colors.hubCard,
  },
  classTextIcy: {
    color: Colors.brandNavy,
    maxWidth: wp(22),
  },
});
