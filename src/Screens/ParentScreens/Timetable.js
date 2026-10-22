import React, {useEffect, useMemo, useState} from 'react';

import {ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';

import {SafeAreaView} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons';

import MainHeaderComponent from '../../Component/MainHeaderComponent';

import ProfileGradientCard from '../../Component/Profile/ProfileGradientCard';

import ProfileSectionTitle from '../../Component/Profile/ProfileSectionTitle';
import AnimatedCard from '../../Component/AnimatedCard';

import {CARD_RADIUS} from '../../Component/Profile/ProfileTheme';

import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {Colors} from '../../Constants/Colors';

import {Fonts} from '../../Constants/Fonts';

import {Fontsize} from '../../Constants/Fontsize';

import {Strings} from '../../Constants/Strings';

import {wp, hp} from '../../Constants/Responsive';

import {useRoleData} from '../../hooks/useRoleData';

import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../utils/toast';
import {fetchChildTimetable, fetchParentHome} from '../../store/slices/parentHomeSlice';
import {fetchStudentTimetable} from '../../store/slices/studentHomeSlice';

const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];



const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTHS = [

  'January', 'February', 'March', 'April', 'May', 'June',

  'July', 'August', 'September', 'October', 'November', 'December',

];



const getStartLabel = time => (time || '').split(' - ')[0] || time;



const buildWeek = date => {

  const start = new Date(date);

  start.setDate(date.getDate() - date.getDay());

  return Array.from({length: 7}, (_, index) => {

    const item = new Date(start);

    item.setDate(start.getDate() + index);

    return {

      key: String(index),

      label: WEEK_DAYS[index],

      day: item.getDate(),

      date: item,

    };

  });

};



const Timetable = () => {

  const dispatch = useDispatch();
  const {isParent} = useRoleData();
  const {selectedChildId, children} = useSelector(state => state.parentHome);
  const [parentSlots, setParentSlots] = useState([]);
  const [studentSlots, setStudentSlots] = useState([]);
  const [loading, setLoading] = useState(!isParent);

  const [viewMode, setViewMode] = useState(Strings.day);

  const [currentDate, setCurrentDate] = useState(() => new Date());

  const week = useMemo(() => buildWeek(currentDate), [currentDate]);
  const dayName = DAY_NAMES[currentDate.getDay()];
  const parentChild = children.find(item => item.value === String(selectedChildId));
  const classLabel = isParent ? parentChild?.className || '' : '';
  const timetable = isParent ? parentSlots : studentSlots;

  const visibleItems = timetable.filter(item => item.subject !== 'Break');

  const list = viewMode === Strings.week ? visibleItems.slice(0, 3) : visibleItems;

  useEffect(() => {
    if (!isParent || selectedChildId) {
      return undefined;
    }
    dispatch(fetchParentHome());
  }, [dispatch, isParent, selectedChildId]);

  useEffect(() => {
    if (!isParent || !selectedChildId) {
      return undefined;
    }

    let active = true;
    setLoading(true);

    dispatch(fetchChildTimetable({childId: selectedChildId, day: dayName}))
      .unwrap()
      .then(slots => {
        if (active) {
          setParentSlots(slots);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setParentSlots([]);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load timetable.',
        });
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [dayName, dispatch, isParent, selectedChildId]);

  useEffect(() => {
    if (isParent) {
      return undefined;
    }

    let active = true;
    setLoading(true);

    dispatch(fetchStudentTimetable(dayName))
      .unwrap()
      .then(slots => {
        if (active) {
          setStudentSlots(slots);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setStudentSlots([]);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load timetable.',
        });
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [dayName, dispatch, isParent]);



  const changeWeek = direction => {

    const next = new Date(currentDate);

    next.setDate(currentDate.getDate() + direction * 7);

    setCurrentDate(next);

  };



  const renderSlot = (item, index) => (

    <ProfileGradientCard

      key={item.id}

      innerStyle={styles.slotInner}

      animationIndex={index + 5}

      colors={CARD_GRADIENTS.notification}

      waveVariant={index === 0 ? 'timetable' : null}
      disableAnimation>

      <View style={styles.slotRow}>

        <Text style={styles.timePremium}>{getStartLabel(item.time)}</Text>

        <View style={styles.slotBody}>

          <Text style={styles.subjectPremium}>{item.subject}</Text>

          <Text style={styles.classPremium}>
            {[
              item.period ? `Period ${item.period}` : '',
              item.time,
              item.classLabel ? `Class ${item.classLabel}` : classLabel,
              item.teacher,
            ]
              .filter(Boolean)
              .join(' · ')}
          </Text>

        </View>

      </View>

    </ProfileGradientCard>

  );



  return (


      <SafeAreaView style={styles.container} edges={['top']}>

        <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />

        <MainHeaderComponent title={Strings.timetable} navyBack />



        <ScrollEnterScrollView

          contentContainerStyle={styles.content}

          showsVerticalScrollIndicator={false}

          bounces={false}

          overScrollMode="never"

          removeClippedSubviews={false}>

          <AnimatedCard index={1} style={styles.toggleCard}>
            <View style={styles.toggleWrap}>
              {[Strings.day, Strings.week].map(tab => {
                const active = tab === viewMode;
                return (
                  <TouchableOpacity
                    key={tab}
                    style={[styles.toggleBtn, active && styles.toggleBtnActive]}
                    activeOpacity={0.85}
                    onPress={() => setViewMode(tab)}>
                    <Text style={[styles.toggleText, active && styles.toggleTextActive]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </AnimatedCard>



          <AnimatedCard index={2} style={styles.monthCard}>
          <View style={styles.monthRow}>

            <TouchableOpacity onPress={() => changeWeek(-1)} style={styles.monthArrow}>

              <Icon name="chevron-back" size={wp(4.5)} color={Colors.primary} />

            </TouchableOpacity>

            <Text style={styles.month}>

              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}

            </Text>

            <TouchableOpacity onPress={() => changeWeek(1)} style={styles.monthArrow}>

              <Icon name="chevron-forward" size={wp(4.5)} color={Colors.primary} />

            </TouchableOpacity>

          </View>
          </AnimatedCard>

          <AnimatedCard index={3} style={styles.weekCard}>
          <View style={styles.weekRow}>

            {week.map(item => {

              const active =

                item.date.getDate() === currentDate.getDate() &&

                item.date.getMonth() === currentDate.getMonth();

              return (

                <TouchableOpacity

                  key={item.key}

                  style={styles.dayCol}

                  activeOpacity={0.85}

                  onPress={() => setCurrentDate(item.date)}>

                  <Text style={styles.dayLabel}>{item.label}</Text>

                  <View style={[styles.dateCircle, active && styles.dateCircleActive]}>

                    <Text style={[styles.dateText, active && styles.dateTextActive]}>

                      {item.day}

                    </Text>

                  </View>

                </TouchableOpacity>

              );

            })}

          </View>
          </AnimatedCard>

          <ProfileSectionTitle animationIndex={4} style={styles.scheduleTitle}>
            {Strings.timetable}
          </ProfileSectionTitle>



          {loading || (isParent && !selectedChildId) ? (
            <ActivityIndicator style={styles.loader} size="large" color={Colors.primary} />
          ) : (
            list.map(renderSlot)
          )}

          {!loading && !(isParent && !selectedChildId) && list.length === 0 ? (
            <Text style={styles.emptyText}>{Strings.noTimetable}</Text>
          ) : null}

        </ScrollEnterScrollView>

      </SafeAreaView>

  );

};

export default withScreenEnter(Timetable, 'timetable');



const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: Colors.parentBg,

  },

  content: {

    paddingHorizontal: wp(4),

    paddingBottom: hp(3),

  },

  toggleCard: {
    borderRadius: wp(8),
    overflow: 'hidden',
    marginBottom: hp(1.8),
  },
  weekCard: {
    borderRadius: wp(4),
    overflow: 'hidden',
    marginBottom: hp(0.5),
  },
  monthCard: {
    borderRadius: wp(4),
    overflow: 'hidden',
    marginBottom: hp(1.8),
  },
  toggleWrap: {
    flexDirection: 'row',
    backgroundColor: '#DCEBFD',
    borderRadius: wp(8),
    padding: wp(1.2),
    borderWidth: 1,
    borderColor: '#C0D5F2',
  },

  toggleBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1.15),
    borderRadius: wp(7),
  },

  toggleBtnActive: {
    backgroundColor: '#071A3D',
  },

  toggleText: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },

  toggleTextActive: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
  },

  monthRow: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

  },

  monthArrow: {

    paddingHorizontal: wp(3),

    paddingVertical: hp(0.6),

  },

  month: {

    color: Colors.black,

    fontFamily: Fonts.bold,

    fontSize: Fontsize.sm,

  },

  weekRow: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: hp(2.2),

  },

  dayCol: {

    alignItems: 'center',

    flex: 1,

  },

  dayLabel: {

    color: Colors.grayText,

    fontFamily: Fonts.regular,

    fontSize: Fontsize.xxm,

    marginBottom: hp(0.8),

  },

  dateCircle: {

    width: wp(9),

    height: wp(9),

    borderRadius: wp(9),

    overflow: 'hidden',

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: Colors.transparent,

  },

  dateCircleActive: {

    backgroundColor: Colors.primary,

    borderRadius: wp(9),

    overflow: 'hidden',

  },

  dateText: {

    color: Colors.black,

    fontFamily: Fonts.medium,

    fontSize: Fontsize.xs1,

    includeFontPadding: false,

    textAlignVertical: 'center',

    textAlign: 'center',

  },

  dateTextActive: {

    color: Colors.white,

    fontFamily: Fonts.semibold,

  },

  scheduleTitle: {

    marginTop: hp(0.5),

  },

  loader: {
    marginTop: hp(4),
  },

  emptyText: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
    marginTop: hp(2),
  },

  slotInner: {

    paddingVertical: hp(1.4),

  },

  slotRow: {

    flexDirection: 'row',

    alignItems: 'center',

    zIndex: 1,

  },

  timePremium: {

    width: wp(22),

    color: Colors.whiteMuted85,

    fontFamily: Fonts.medium,

    fontSize: Fontsize.xs1,

  },

  slotBody: {

    flex: 1,

  },

  subjectPremium: {

    color: Colors.white,

    fontFamily: Fonts.semibold,

    fontSize: Fontsize.xs5,

  },

  classPremium: {

    color: Colors.whiteMuted75,

    fontFamily: Fonts.regular,

    fontSize: Fontsize.xs0,

    marginTop: hp(0.35),

  },

});


