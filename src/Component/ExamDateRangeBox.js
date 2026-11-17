import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileGradientCard from './Profile/ProfileGradientCard';
import AnimatedCard from './AnimatedCard';
import CardWave, {SCREEN_WAVES} from './CardWave';
import {useStudentTone} from './Glass/StudentTone';
import {GRADIENT_END, GRADIENT_START} from './Profile/ProfileTheme';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {CARD_GRADIENTS} from '../Constants/CardTheme';
import {elevation, radius} from '../Constants/Theme';
import {wp, hp} from '../Constants/Responsive';
import ExamDateRangeModal, {formatRangeLabel} from './ExamDateRangeModal';

const ExamDateRangeBox = ({startDate, endDate, onApply, animationIndex = 0}) => {
  const icy = useStudentTone();
  const [visible, setVisible] = useState(false);
  const rangeLabel = formatRangeLabel(startDate, endDate);

  const row = (
    <View style={styles.row}>
      <View style={icy ? styles.calendarWrapIcy : null}>
        <Icon
          name="calendar-outline"
          size={wp(5)}
          color={icy ? Colors.brandRoyal : Colors.white}
        />
      </View>
      <View style={styles.textWrap}>
        <Text style={[styles.label, icy && styles.labelIcy]}>
          {Strings.dateRange}
        </Text>
        {rangeLabel ? (
          <Text style={[styles.value, icy && styles.valueIcy]} numberOfLines={2}>
            {rangeLabel}
          </Text>
        ) : null}
      </View>
      <Icon
        name="chevron-forward"
        size={wp(4.5)}
        color={icy ? Colors.brandRoyal : Colors.whiteMuted85}
      />
    </View>
  );

  return (
    <>
      {icy ? (
        <AnimatedCard index={animationIndex} style={styles.wrapIcy}>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => setVisible(true)}
            style={styles.pressIcy}>
            <View style={styles.clipIcy}>
              <LinearGradient
                colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
                start={GRADIENT_START}
                end={GRADIENT_END}
                style={styles.fillIcy}
              />
              <View pointerEvents="none" style={styles.waveIcy}>
                <CardWave
                  variant={SCREEN_WAVES.assignmentIce}
                  color="rgba(91, 156, 255, 0.16)"
                />
              </View>
              <View style={styles.innerIcy}>{row}</View>
            </View>
          </TouchableOpacity>
        </AnimatedCard>
      ) : (
        <ProfileGradientCard
          innerStyle={styles.inner}
          animationIndex={animationIndex}
          colors={CARD_GRADIENTS.royal}
          onPress={() => setVisible(true)}>
          {row}
        </ProfileGradientCard>
      )}

      <ExamDateRangeModal
        visible={visible}
        startDate={startDate}
        endDate={endDate}
        onClose={() => setVisible(false)}
        onApply={onApply}
      />
    </>
  );
};

export default ExamDateRangeBox;

const styles = StyleSheet.create({
  inner: {
    paddingVertical: hp(1.2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  textWrap: {
    flex: 1,
    minWidth: 0,
    marginLeft: wp(3),
    marginRight: wp(2),
  },
  label: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs,
    letterSpacing: 0.5,
    marginBottom: hp(0.3),
  },
  labelIcy: {
    color: Colors.textSecondary,
    fontFamily: Fonts.semibold,
    letterSpacing: 0.6,
  },
  value: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.normal,
  },
  valueIcy: {
    color: Colors.brandNavy,
  },
  wrapIcy: {
    overflow: 'visible',
    marginBottom: hp(1.2),
  },
  pressIcy: {
    borderRadius: radius.banner,
    overflow: 'visible',
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  clipIcy: {
    borderRadius: radius.banner,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
  },
  fillIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  waveIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  innerIcy: {
    paddingHorizontal: wp(3.4),
    paddingVertical: hp(1.35),
  },
  calendarWrapIcy: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: Colors.hubCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
