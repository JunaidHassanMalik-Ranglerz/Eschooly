import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import DepthIcon from '../DepthIcon';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import {getSubjectIconTheme} from '../Syllabus/SubjectTheme';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {getSubjectGradient} from '../../Constants/CardTheme';
import {elevation, radius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {useStudentTone} from '../Glass/StudentTone';
import FeatureArtImage from '../Glass/FeatureArtImage';
import {EducationIcons} from '../../Assets/EducationIcons';

const BODY_PAD = wp(4);
const LIBRARY_GRID_GAP = wp(3.2);

const libraryCardWidth = screenW =>
  Math.floor((screenW - BODY_PAD * 2 - LIBRARY_GRID_GAP) / 2);

const getLibraryArt = item => {
  const category = String(item?.category || '').toLowerCase();
  const hay = `${item?.subtitle || ''} ${item?.category || ''} ${item?.fileType || ''} ${item?.title || ''}`.toLowerCase();

  if (/\bbiolog|\blife\s?sci|\bplant\b/.test(hay)) {
    return EducationIcons.syllabus;
  }
  if (category === 'physics' || /\bphysic/.test(hay)) {
    return EducationIcons.physicsAtom;
  }
  if (category === 'english' || /\benglish|\bliterature|\bgrammar/.test(hay)) {
    return EducationIcons.subjects;
  }
  if (/\bexam|\bmid[- ]?term|\btest\b|\bcertificate|\bdiploma|\bresult/.test(hay)) {
    return EducationIcons.resultBadge;
  }
  if (/\bplan\b|\bscheme\b|\bcalc|\bcalculator/.test(hay)) {
    return EducationIcons.exams;
  }
  if (/\bworksheet|\bassignment|\bhomework|\bclass notes/.test(hay)) {
    return EducationIcons.assignments;
  }
  if (category === 'science' || /\bscience/.test(hay)) {
    return EducationIcons.syllabus;
  }
  if (category === 'math' || /\bmath|\balgebra|\bgeometry|\bcalculus/.test(hay)) {
    return /\bnote/.test(hay) ? EducationIcons.subjects : EducationIcons.digitalLibrary;
  }
  if (/\bnote/.test(hay)) {
    return EducationIcons.assignments;
  }
  return EducationIcons.digitalLibrary;
};

const LibraryResourceCard = ({
  item,
  onPress,
  onDownload,
  downloading = false,
  animationIndex = 0,
}) => {
  const {width: screenW} = useWindowDimensions();
  const cardW = libraryCardWidth(screenW);
  const artSize = Math.round(cardW * 0.62);
  const artRegion = Math.round(cardW * 0.55);
  const gradientIndex = Number(String(item?.id || '0').replace(/\D/g, '')) || animationIndex;
  const subjectIcon = getSubjectIconTheme(item.subtitle?.split('-')[0]?.trim() || item.title);
  const icy = useStudentTone();
  const art = getLibraryArt(item);

  const downloadControl = (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={downloading || !onDownload}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      accessibilityRole="button"
      accessibilityLabel="Download"
      onPress={event => {
        event?.stopPropagation?.();
        onDownload?.(item);
      }}>
      {downloading ? (
        <ActivityIndicator size="small" color={icy ? Colors.brandRoyal : Colors.white} />
      ) : (
        <Icon
          name="download-outline"
          size={wp(5.6)}
          color={icy ? Colors.brandRoyal : Colors.whiteMuted85}
        />
      )}
    </TouchableOpacity>
  );

  if (icy) {
    return (
      <View style={[styles.icyWrap, {width: cardW}]}>
        <View style={styles.icyClip}>
          <TouchableOpacity activeOpacity={0.88} onPress={() => onPress?.(item)}>
            <LinearGradient
              colors={[Colors.bannerIceStart, '#E8F2FF', Colors.hubCard]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={[styles.icyGradient, {minHeight: artRegion + hp(9.6)}]}>
              <CardWave
                variant={SCREEN_WAVES.assignmentIce}
                color="rgba(91, 156, 255, 0.22)"
              />
              <View style={[styles.artRegion, {height: artRegion}]} pointerEvents="none">
                <FeatureArtImage source={art} width={artSize} height={artSize} />
              </View>
              <View style={styles.copyBlock}>
                <Text
                  style={[styles.title, styles.titleIcy]}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  textBreakStrategy="simple">
                  {item.title}
                </Text>
                <Text style={[styles.subtitle, styles.subtitleIcy]} numberOfLines={1}>
                  {item.subtitle}
                </Text>
              </View>
              <View style={[styles.footer, styles.footerIcy]}>
                <View style={styles.footerSpacer} />
                {downloadControl}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ProfileGradientCard
      style={styles.cardWrap}
      innerStyle={styles.inner}
      animationIndex={animationIndex}
      variant="navy"
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
          {[item.fileType, item.fileSize].filter(Boolean).join(' - ')}
        </Text>
        {downloadControl}
      </View>
    </ProfileGradientCard>
  );
};

export default LibraryResourceCard;

const TITLE_LINE = Fontsize.sm + 3;

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
  titleIcy: {
    color: Colors.textPrimary,
    fontSize: Fontsize.sm1,
    lineHeight: TITLE_LINE,
    minHeight: TITLE_LINE,
    marginBottom: hp(0.25),
  },
  subtitleIcy: {
    color: Colors.textSecondary,
    fontSize: Fontsize.xs0,
    lineHeight: Fontsize.xs1 + 2,
    marginBottom: 0,
  },
  copyBlock: {
    zIndex: 1,
    marginBottom: hp(0.45),
  },
  footerIcy: {
    borderTopColor: 'rgba(19, 69, 163, 0.28)',
    marginTop: 'auto',
    paddingTop: hp(0.75),
  },
  icyWrap: {
    flexShrink: 0,
    marginBottom: hp(1.85),
    borderRadius: radius.banner,
    backgroundColor: Colors.bannerIceStart,
    ...elevation.banner,
  },
  icyClip: {
    borderRadius: radius.banner,
    overflow: 'hidden',
  },
  icyGradient: {
    borderRadius: radius.banner,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.38)',
    paddingHorizontal: wp(3.2),
    paddingTop: hp(1.35),
    paddingBottom: hp(1.05),
  },
  artRegion: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    zIndex: 1,
  },
  footerSpacer: {
    flex: 1,
  },
});
