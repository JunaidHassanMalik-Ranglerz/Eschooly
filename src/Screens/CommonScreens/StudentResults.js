import React, {useCallback, useState} from 'react';
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DepthIcon from '../../Component/DepthIcon';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import AnimatedCard from '../../Component/AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import OverallGradeCard from '../../Component/Student/OverallGradeCard';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {
  STUDENT_RESULT_TERMS,
} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';

const NAVY = '#071A3D';
const SCREEN_BG = '#DCEBFD';
const CARD_GRADIENT = ['#07346B', '#062653', '#0D5CA8'];

const SUBJECT_ICONS = {
  Mathematics: {name: 'calculator-outline', color: '#38BDF8'},
  Science: {name: 'flask-outline', color: '#0EA5E9'},
  Physics: {name: 'planet-outline', color: '#38BDF8'},
  Chemistry: {name: 'flask-outline', color: '#0EA5E9'},
  English: {name: 'book-outline', color: '#6366F1'},
  Computer: {name: 'laptop-outline', color: '#2563EB'},
  'Islamic Studies': {name: 'moon-outline', color: '#60A5FA'},
  Urdu: {name: 'language-outline', color: '#818CF8'},
  Art: {name: 'color-palette-outline', color: '#60A5FA'},
};

const gradeTone = grade => {
  if (String(grade).startsWith('A')) {
    return {bg: 'rgba(56, 189, 248, 0.18)', text: '#BFDBFE'};
  }
  if (String(grade).startsWith('B')) {
    return {bg: 'rgba(99, 102, 241, 0.18)', text: '#C7D2FE'};
  }
  return {bg: 'rgba(37, 99, 235, 0.18)', text: '#DBEAFE'};
};

const StudentResults = () => {
  const {
    activeStudent,
    getResultsForTerm,
    isParent,
    childList,
    selectedChildId,
    setSelectedChildId,
    canSwitchChild,
  } = useRoleData();
  const [activeTerm, setActiveTerm] = useState(Strings.monthly);
  const [termReplay, setTermReplay] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);
  const result = getResultsForTerm(activeTerm);
  const classLine = [activeStudent?.classLabel, activeStudent?.rollNo ? `Roll ${activeStudent.rollNo}` : '']
    .filter(Boolean)
    .join(' · ');

  const selectTerm = useCallback(term => {
    if (term === activeTerm) {
      return;
    }
    setActiveTerm(term);
    setDownloaded(false);
    setTermReplay(value => value + 1);
  }, [activeTerm]);

  const openSwitch = useCallback(() => {
    setSwitchVisible(true);
    setModalReplay(value => value + 1);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={SCREEN_BG} barStyle="dark-content" />
      <MainHeaderComponent title={Strings.results} notificationCount={1} navyBack />

      <ScrollEnterScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled">
        {isParent ? (
          <AnimatedCard index={1} entering={getHomeScreenEnter(1)} style={styles.childWrap}>
            <SelectedChildBanner
              child={activeStudent}
              variant="large"
              waveVariant={SCREEN_WAVES.parentHome}
              disableEnterAnimation
              compactMargin
              canSwitch={canSwitchChild}
              onSwitchPress={canSwitchChild ? openSwitch : undefined}
            />
          </AnimatedCard>
        ) : null}

        <AnimatedCard
          index={1}
          entering={getHomeScreenEnter(1)}
          replayToken={termReplay}
          style={styles.resultCardWrap}>
          <LinearGradient
            colors={['#0A2F5C', '#0D5CA8', '#2563EB']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.resultCard}>
            <CardWave variant={SCREEN_WAVES.results} />
            <Text style={styles.cardKicker}>{Strings.resultCard}</Text>
            <View style={styles.cardTop}>
              <View style={styles.cardIdentity}>
                <Text style={styles.cardName} numberOfLines={1}>
                  {activeStudent?.label}
                </Text>
                <Text style={styles.cardMeta} numberOfLines={1}>
                  {classLine}
                </Text>
                <Text style={styles.cardTerm}>{activeTerm}</Text>
              </View>
              <View style={styles.cardGradeBox}>
                <Text style={styles.cardGradeLabel}>{Strings.overallGrade}</Text>
                <Text style={styles.cardGrade}>{result.overall}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.downloadBtn}
              activeOpacity={0.85}
              onPress={() => setDownloaded(true)}>
              <Icon
                name={downloaded ? 'checkmark-circle' : 'download-outline'}
                size={wp(4.6)}
                color={Colors.white}
              />
              <Text style={styles.downloadText}>
                {downloaded ? Strings.resultDownloaded : Strings.downloadResult}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </AnimatedCard>

        <AnimatedCard
          index={1}
          entering={getHomeScreenEnter(1)}
          style={styles.tabTrackEnter}>
          <View style={styles.tabTrack}>
            {STUDENT_RESULT_TERMS.map(tab => {
              const active = tab === activeTerm;
              return (
                <TouchableOpacity
                  key={tab}
                  activeOpacity={0.88}
                  onPress={() => selectTerm(tab)}
                  style={[styles.tab, active && styles.tabActive]}>
                  <Text style={[styles.tabText, active && styles.tabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </AnimatedCard>

        <View style={styles.listWrap}>
          {result.subjects.map((item, index) => {
            const slot = index + 2;
            const meta = SUBJECT_ICONS[item.name] || {
              name: 'school-outline',
              color: Colors.iconSky,
            };
            const tone = gradeTone(item.grade);
            return (
              <AnimatedCard
                key={`${activeTerm}-${item.id}`}
                index={slot}
                entering={getHomeScreenEnter(slot)}
                replayToken={termReplay}
                style={[
                  styles.cardWrap,
                  index < result.subjects.length - 1 && styles.cardSpacing,
                ]}>
                <LinearGradient
                  colors={CARD_GRADIENT}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={styles.subjectCard}>
                  <DepthIcon name={meta.name} size={wp(6.2)} color={meta.color} />
                  <View style={styles.subjectInfo}>
                    <Text style={styles.subjectName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.subjectScore}>{item.score}%</Text>
                  </View>
                  <View style={[styles.gradeBadge, {backgroundColor: tone.bg}]}>
                    <Text style={[styles.gradeText, {color: tone.text}]}>
                      {item.grade}
                    </Text>
                  </View>
                </LinearGradient>
              </AnimatedCard>
            );
          })}
        </View>

        <AnimatedCard
          key={`${activeTerm}-overall`}
          index={result.subjects.length + 2}
          entering={getHomeScreenEnter(result.subjects.length + 2)}
          replayToken={termReplay}
          style={styles.gradeCardWrap}>
          <OverallGradeCard
            grade={result.overall}
            hint={result.hint || Strings.greatProgress}
          />
        </AnimatedCard>
      </ScrollEnterScrollView>

      {isParent && canSwitchChild ? (
        <ChildSwitchModal
          visible={switchVisible}
          childrenList={childList}
          selectedId={selectedChildId}
          onSelect={nextId => {
            setSelectedChildId(nextId);
            setDownloaded(false);
          }}
          onClose={() => setSwitchVisible(false)}
          replayToken={modalReplay}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default withScreenEnter(StudentResults, 'results');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scrollArea: {
    flex: 1,
  },
  childWrap: {
    marginBottom: hp(0.4),
  },
  resultCardWrap: {
    borderRadius: wp(5.5),
    overflow: 'hidden',
    marginBottom: hp(1.6),
  },
  resultCard: {
    borderRadius: wp(5.5),
    borderWidth: 1,
    borderColor: '#65C4FF',
    paddingHorizontal: wp(4.5),
    paddingTop: hp(1.8),
    paddingBottom: hp(1.6),
    overflow: 'hidden',
  },
  cardKicker: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    zIndex: 1,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.8),
    zIndex: 1,
  },
  cardIdentity: {
    flex: 1,
    marginRight: wp(3),
  },
  cardName: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  cardMeta: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.25),
  },
  cardTerm: {
    color: '#BFDBFE',
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.35),
  },
  cardGradeBox: {
    alignItems: 'center',
    minWidth: wp(16),
  },
  cardGradeLabel: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
  },
  cardGrade: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.ml,
    marginTop: hp(0.1),
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1.6),
    backgroundColor: Colors.whiteOverlay22,
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: 'rgba(108, 183, 255, 0.45)',
    paddingVertical: hp(1.15),
    zIndex: 1,
  },
  downloadText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginLeft: wp(1.6),
  },
  tabTrackEnter: {
    marginBottom: hp(1.8),
  },
  content: {
    paddingHorizontal: wp(4.5),
    paddingTop: hp(1.6),
    paddingBottom: hp(4),
  },
  tabTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SCREEN_BG,
    borderRadius: wp(8),
    padding: wp(1.2),
    borderWidth: 1,
    borderColor: '#C0D5F2',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1),
    borderRadius: wp(6.5),
  },
  tabActive: {
    backgroundColor: NAVY,
  },
  tabText: {
    color: '#5A6B82',
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  tabTextActive: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
  },
  listWrap: {
    marginBottom: hp(1.8),
  },
  cardWrap: {
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#0A4E8A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.22,
    shadowRadius: 8,
  },
  cardSpacing: {
    marginBottom: hp(1.2),
  },
  subjectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#65C4FF',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    overflow: 'hidden',
  },
  subjectInfo: {
    flex: 1,
    marginHorizontal: wp(3),
    zIndex: 1,
  },
  subjectName: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  subjectScore: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.15),
  },
  gradeBadge: {
    minWidth: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    zIndex: 1,
  },
  gradeText: {
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
  },
  gradeCardWrap: {
    borderRadius: wp(5.5),
    overflow: 'hidden',
  },
});
