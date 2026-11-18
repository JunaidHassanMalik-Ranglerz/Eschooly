import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import TopicItem from './TopicItem';
import ProgressBar from './ProgressBar';
import AnimatedCard from './AnimatedCard';
import CardWave, {SCREEN_WAVES} from './CardWave';
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
import {elevation, radius} from '../Constants/Theme';
import {wp, hp} from '../Constants/Responsive';
import {useStudentTone} from './Glass/StudentTone';

const TopicSeparator = () => <View style={styles.topicSep} />;

const ChapterCard = ({chapter, open, onToggle, subjectLabel, animationIndex = 0}) => {
  const theme = getSubjectTheme(subjectLabel);
  const icy = useStudentTone();

  const inner = (
        <TouchableOpacity
          style={styles.header}
          activeOpacity={0.8}
          onPress={() => onToggle?.()}>
          <View style={[styles.numberBox, icy && styles.numberBoxIcy]}>
            <Text style={[styles.number, icy && styles.numberIcy]} numberOfLines={1}>
              {chapter?.number}
            </Text>
          </View>

          <View style={styles.headerCenter}>
            <View style={styles.titleRow}>
              <Text
                style={[styles.title, icy && styles.titleIcy]}
                numberOfLines={2}>
                {chapter?.title}
              </Text>
              <Icon
                name={open ? 'chevron-up' : 'chevron-down'}
                size={wp(4.5)}
                color={icy ? Colors.textSecondary : Colors.whiteMuted85}
              />
            </View>
            <Text style={[styles.meta, icy && styles.metaIcy]} numberOfLines={2}>
              {chapter?.meta}
            </Text>

            <View style={styles.progressRow}>
              <ProgressBar
                progress={chapter?.progress}
                fillColor={icy ? Colors.brandRoyal : undefined}
                style={[styles.progressBar, icy && styles.progressBarIcy]}
              />
              <Text style={[styles.percent, icy && styles.percentIcy]} numberOfLines={1}>
                {chapter?.percentText}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
  );

  return (
    <AnimatedCard
      index={animationIndex}
      style={[styles.wrap, icy ? styles.wrapIcy : IDENTITY_CARD_SHADOW]}>
      {icy ? (
        <View style={styles.clipIcy}>
          <LinearGradient
            colors={[Colors.bannerIceStart, '#E8F2FF', Colors.hubCard]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[styles.card, styles.cardIcy]}>
            <CardWave
              variant={SCREEN_WAVES.assignmentIce}
              color="rgba(91, 156, 255, 0.18)"
            />
            <View style={styles.foreground}>{inner}</View>
            {open && chapter?.topics?.length > 0 ? (
              <FlatList
                data={chapter?.topics}
                keyExtractor={item => item?.id}
                renderItem={({item}) => <TopicItem topic={item} premium={false} />}
                ItemSeparatorComponent={TopicSeparator}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                style={[styles.topics, styles.topicsIcy]}
              />
            ) : null}
          </LinearGradient>
        </View>
      ) : (
      <LinearGradient
        colors={theme.gradient}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={styles.card}>
        {inner}

        {open && chapter?.topics?.length > 0 ? (
          <FlatList
            data={chapter?.topics}
            keyExtractor={item => item?.id}
            renderItem={({item}) => <TopicItem topic={item} premium />}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            style={styles.topics}
          />
        ) : null}
      </LinearGradient>
      )}
    </AnimatedCard>
  );
};

export default ChapterCard;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(1.5),
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  card: {
    borderRadius: CARD_RADIUS,
    padding: wp(4),
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  numberBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2.5),
    backgroundColor: Colors.whiteOverlay22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  number: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
  },
  headerCenter: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
    marginRight: wp(2),
  },
  meta: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.3),
    marginBottom: hp(1),
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    marginRight: wp(1),
    height: hp(0.7),
    borderRadius: hp(0.35),
  },
  percent: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    textAlign: 'right',
    minWidth: wp(9),
  },
  topics: {
    marginTop: hp(0.8),
    paddingTop: hp(0.8),
    borderTopWidth: 1,
    borderTopColor: Colors.whiteOverlay18,
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
  },
  cardIcy: {
    borderRadius: radius.banner,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    backgroundColor: Colors.bannerIceStart,
  },
  topicSep: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderSubtle,
  },
  numberBoxIcy: {
    backgroundColor: Colors.hubCard,
  },
  numberIcy: {
    color: Colors.brandNavy,
  },
  titleIcy: {
    color: Colors.textPrimary,
  },
  metaIcy: {
    color: Colors.textSecondary,
  },
  progressBarIcy: {
    backgroundColor: Colors.hubCard,
  },
  percentIcy: {
    color: Colors.brandRoyal,
  },
  topicsIcy: {
    borderTopColor: Colors.borderSubtle,
    zIndex: 1,
  },
});
