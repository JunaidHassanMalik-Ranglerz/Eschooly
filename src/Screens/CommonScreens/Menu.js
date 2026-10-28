import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ParentChildCard from '../../Component/Parent/ParentChildCard';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import AcademicMenuCard from '../../Component/AcademicMenuCard';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import AnimatedCard from '../../Component/AnimatedCard';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {MENU_LIST} from '../../Constants/dummydata';
import {SCREEN_WAVES} from '../../Component/CardWave';
import {FEATURE_ICON_META} from '../../Constants/IconTheme';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {
  ACADEMICS_ENTER_MOTION,
  ScreenEnterProvider,
} from '../../hooks/useScreenEnterGate';
import {ACADEMICS_PROFILE_ENTERING} from '../../utils/cardAnimation';
import {showToast} from '../../utils/toast';
import {fetchChildDashboard, fetchParentHome} from '../../store/slices/parentHomeSlice';

const Menu = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isParent, studentLabel} = useRoleData();
  const {children, selectedChildId: homeChildId} = useSelector(state => state.parentHome);
  const homeStudent = useSelector(state => state.studentHome.student);
  const [switchVisible, setSwitchVisible] = useState(false);
  const parentChild =
    children.find(item => item.value === String(homeChildId)) || children[0] || null;
  const parentCanSwitch = children.length > 1;
  const bannerStudent = {
    label: homeStudent?.label || '',
    classInfo: homeStudent?.className || homeStudent?.classLabel || '',
    classLabel: homeStudent?.classLabel || homeStudent?.className || '',
    className: homeStudent?.className || '',
    photoUrl: homeStudent?.photoUrl || '',
    rollNo: homeStudent?.rollNo || '',
  };

  useEffect(() => {
    if (!isParent || homeChildId || children.length) {
      return undefined;
    }
    dispatch(fetchParentHome());
  }, [children.length, dispatch, homeChildId, isParent]);

  const handleSelectChild = useCallback(
    nextId => {
      if (String(nextId) === String(homeChildId)) {
        return;
      }
      dispatch(fetchChildDashboard(nextId))
        .unwrap()
        .catch(error => {
          if (error?.stale) {
            return;
          }
          showToast({
            type: 'error',
            text1: error?.message || 'Unable to load dashboard.',
          });
        });
    },
    [dispatch, homeChildId],
  );

  const handlePress = item => {
    const target = isParent && item.parentScreen ? item.parentScreen : item.screen;
    if (!target) {
      return;
    }

    if (!isParent && item.tab) {
      navigation.navigate(target);
      return;
    }

    navigation.navigate(target);
  };

  return (
    <ScreenEnterProvider motion={ACADEMICS_ENTER_MOTION}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <MainHeaderComponent
          title={Strings.academics}
          notificationCount={1}
          onBackPress={() => navigation.navigate('Home')}
        />

        {isParent ? (
          <View style={styles.parentChildWrap}>
            <AnimatedCard
              index={1}
              entering={ACADEMICS_PROFILE_ENTERING}
              style={styles.childCard}>
              <ParentChildCard
                child={parentChild}
                chevron={parentCanSwitch ? 'chevron-down' : undefined}
                accented
                solid
                prominent
                showWave
                waveVariant={SCREEN_WAVES.academics}
                onPress={parentCanSwitch ? () => setSwitchVisible(true) : undefined}
              />
            </AnimatedCard>
          </View>
        ) : (
          <View style={styles.dropdownWrap}>
            <AnimatedCard
              index={1}
              entering={ACADEMICS_PROFILE_ENTERING}
              style={styles.childCard}>
              <AttendanceStudentDropdown
                student={bannerStudent}
                premium
                embedded
                readOnly
                label={studentLabel}
              />
            </AnimatedCard>
          </View>
        )}

        <ScrollEnterScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="handled">
          {MENU_LIST.filter(
            item => isParent || (item.value !== 'fee' && !item.parentOnly),
          ).map((item, index) => {
            const meta = FEATURE_ICON_META[item.value] || FEATURE_ICON_META.subjects;
            const disabled = !item.screen && !item.parentScreen;
            return (
              <AcademicMenuCard
                key={item.value}
                icon={meta.icon}
                color={meta.color}
                title={item.label}
                disabled={disabled}
                animationIndex={index + 2}
                waveKey={item.value}
                onPress={() => handlePress(item)}
              />
            );
          })}
        </ScrollEnterScrollView>

        {isParent && parentCanSwitch ? (
          <ChildSwitchModal
            visible={switchVisible}
            childrenList={children}
            selectedId={String(homeChildId || '')}
            onSelect={handleSelectChild}
            onClose={() => setSwitchVisible(false)}
          />
        ) : null}
      </SafeAreaView>
    </ScreenEnterProvider>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scrollArea: {
    flex: 1,
  },
  parentChildWrap: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    zIndex: 20,
    elevation: 20,
  },
  dropdownWrap: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(0.4),
    zIndex: 30,
    elevation: 30,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(0.4),
    paddingBottom: hp(3),
  },
  childCard: {
    marginBottom: hp(1),
  },
});
