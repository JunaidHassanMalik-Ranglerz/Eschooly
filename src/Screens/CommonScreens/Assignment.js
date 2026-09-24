import React, {useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
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

const Assignment = () => {
  const {
    isParent,
    activeStudent,
    assignmentSubjects,
    assignmentOverview,
    canSwitchChild,
  } = useRoleData();
  const [openSubjectId, setOpenSubjectId] = useState(null);

  return (
      <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={Strings.assignment}
        notificationCount={1}
        navyBack
      />

      <ScrollEnterFlatList
        data={assignmentSubjects}
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
            <AssignmentOverviewCard
              overview={assignmentOverview}
              premium
              animationIndex={isParent ? 2 : 1}
            />
          </>
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
});
