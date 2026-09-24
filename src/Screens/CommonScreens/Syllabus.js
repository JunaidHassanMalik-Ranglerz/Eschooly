import React, {useEffect, useMemo, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import ScrollEnterFlatList from '../../Component/ScrollEnterFlatList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import SyllabusFilter from '../../Component/SyllabusFilter';
import OverallProgressCard from '../../Component/OverallProgressCard';
import ChapterCard from '../../Component/ChapterCard';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {getSyllabusListForClass} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';

const Syllabus = () => {
  const navigation = useNavigation();
  const {classLabel, activeStudent} = useRoleData();
  const subjects = useMemo(
    () => getSyllabusListForClass(activeStudent?.className),
    [activeStudent?.className],
  );
  const [syllabus, setSyllabus] = useState(subjects[0]);
  const [openChapterId, setOpenChapterId] = useState(null);

  useEffect(() => {
    setSyllabus(subjects[0]);
    setOpenChapterId(null);
  }, [subjects]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={Strings.syllabus}
        showBack
        navyBack
        onBackPress={() => navigation.goBack()}
        notificationCount={1}
      />

      <ScrollEnterFlatList
        data={syllabus?.chapters}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <ChapterCard
            chapter={item}
            subjectLabel={syllabus?.label}
            open={openChapterId === item.id}
            animationIndex={index + 3}
            onToggle={() =>
              setOpenChapterId(openChapterId === item.id ? null : item.id)
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <SyllabusFilter
              subjects={subjects}
              value={syllabus?.value}
              label={syllabus?.label}
              animationIndex={1}
              onChange={item => {
                setSyllabus(item);
                setOpenChapterId(null);
              }}
              className={classLabel}
            />

            <OverallProgressCard
              overview={syllabus}
              subjectLabel={syllabus?.label}
              animationIndex={2}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default withScreenEnter(Syllabus, 'syllabus');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(0.5),
    paddingBottom: hp(3),
  },
});
