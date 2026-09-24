import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import TopicItem from './TopicItem';
import ProgressBar from './ProgressBar';
import AnimatedCard from './AnimatedCard';
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
import {wp, hp} from '../Constants/Responsive';

const ChapterCard = ({chapter, open, onToggle, subjectLabel, animationIndex = 0}) => {
  const theme = getSubjectTheme(subjectLabel);

  return (
    <AnimatedCard index={animationIndex} style={[styles.wrap, IDENTITY_CARD_SHADOW]}>
      <LinearGradient
        colors={theme.gradient}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={styles.card}>
        <TouchableOpacity
          style={styles.header}
          activeOpacity={0.8}
          onPress={() => onToggle?.()}>
          <View style={styles.numberBox}>
            <Text style={styles.number} numberOfLines={1}>
              {chapter?.number}
            </Text>
          </View>

          <View style={styles.headerCenter}>
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>
                {chapter?.title}
              </Text>
              <Icon
                name={open ? 'chevron-up' : 'chevron-down'}
                size={wp(4.5)}
                color={Colors.whiteMuted85}
              />
            </View>
            <Text style={styles.meta} numberOfLines={1}>
              {chapter?.meta}
            </Text>

            <View style={styles.progressRow}>
              <ProgressBar progress={chapter?.progress} style={styles.progressBar} />
              <Text style={styles.percent} numberOfLines={1}>
                {chapter?.percentText}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

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
});
