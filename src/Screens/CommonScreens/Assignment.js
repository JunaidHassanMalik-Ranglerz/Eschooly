import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AssignmentOverviewCard from '../../Component/Assignment/AssignmentOverviewCard';
import AssignmentSubjectCard from '../../Component/Assignment/AssignmentSubjectCard';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {
  ASSIGNMENT_OVERVIEW,
  ASSIGNMENT_SUBJECTS,
} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';

const Assignment = () => {
  const {isParent, activeStudent} = useRoleData();
  const [openSubjectId, setOpenSubjectId] = useState(null);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MainHeaderComponent
        title={isParent ? Strings.homeworkAssignments : Strings.assignment}
        notificationCount={1}
      />

      <FlatList
        data={ASSIGNMENT_SUBJECTS}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            {isParent ? <SelectedChildBanner child={activeStudent} /> : null}
            <AssignmentOverviewCard overview={ASSIGNMENT_OVERVIEW} />
          </>
        }
        renderItem={({item}) => (
          <AssignmentSubjectCard
            subject={item}
            open={openSubjectId === item.id}
            onToggle={() =>
              setOpenSubjectId(openSubjectId === item.id ? null : item.id)
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Assignment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(3),
  },
});
