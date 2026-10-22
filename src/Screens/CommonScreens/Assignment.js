import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, Text} from 'react-native';
import ScrollEnterFlatList from '../../Component/ScrollEnterFlatList';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AssignmentOverviewCard from '../../Component/Assignment/AssignmentOverviewCard';
import AssignmentSubjectCard from '../../Component/Assignment/AssignmentSubjectCard';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {useDispatch} from 'react-redux';
import {showToast} from '../../utils/toast';
import {fetchStudentAssignments} from '../../store/slices/studentHomeSlice';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';

const Assignment = () => {
  const dispatch = useDispatch();
  const {
    isParent,
    activeStudent,
    assignmentSubjects,
    assignmentOverview,
    canSwitchChild,
  } = useRoleData();
  const [openSubjectId, setOpenSubjectId] = useState(null);
  const [studentOverview, setStudentOverview] = useState(null);
  const [studentSubjects, setStudentSubjects] = useState([]);
  const [loading, setLoading] = useState(!isParent);
  const overview = isParent ? assignmentOverview : studentOverview;
  const subjects = isParent ? assignmentSubjects : studentSubjects;

  useEffect(() => {
    if (isParent) {
      return undefined;
    }

    let active = true;
    setLoading(true);
    dispatch(fetchStudentAssignments())
      .unwrap()
      .then(result => {
        if (!active) {
          return;
        }
        setStudentOverview(result.overview);
        setStudentSubjects(result.subjects);
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setStudentOverview({total: 0, pending: 0, submitted: 0, overdue: 0});
        setStudentSubjects([]);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load assignments.',
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
  }, [dispatch, isParent]);

  return (
      <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={Strings.assignment}
        notificationCount={1}
        navyBack
      />

      <ScrollEnterFlatList
        data={loading && !isParent ? [] : subjects}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            {isParent ? (
              <SelectedChildBanner
                child={activeStudent}
                canSwitch={canSwitchChild}
                animationIndex={1}
              />
            ) : null}
            {!isParent && loading ? (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color={Colors.primary}
              />
            ) : (
              <AssignmentOverviewCard
                overview={overview}
                premium
                animationIndex={isParent ? 2 : 1}
              />
            )}
          </>
        }
        ListEmptyComponent={
          !isParent && !loading && subjects.length === 0 ? (
            <Text style={styles.emptyText}>{Strings.noHomework}</Text>
          ) : null
        }
        renderItem={({item, index}) => (
          <AssignmentSubjectCard
            subject={item}
            open={openSubjectId === item.id}
            premium
            animationIndex={index + (isParent ? 3 : 2)}
            onToggle={() =>
              setOpenSubjectId(openSubjectId === item.id ? null : item.id)
            }
          />
        )}
      />
      </SafeAreaView>
  );
};

export default withScreenEnter(Assignment, 'assignment');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(3),
  },
  loader: {
    marginTop: hp(4),
    marginBottom: hp(2),
  },
  emptyText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
    marginTop: hp(2),
  },
});
