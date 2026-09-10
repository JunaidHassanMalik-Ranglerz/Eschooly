import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import SyllabusFilter from '../../Component/SyllabusFilter';
import OverallProgressCard from '../../Component/OverallProgressCard';
import ChapterCard from '../../Component/ChapterCard';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {SYLLABUS_DATA, SYLLABUS_LIST, SYLLABUS_CLASS_NAME} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import MainHeaderComponent from '../../Component/MainHeaderComponent';

const Syllabus = () => {
  const navigation = useNavigation();
  const [syllabus, setSyllabus] = useState(SYLLABUS_DATA);
  const [openChapterId, setOpenChapterId] = useState('1');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MainHeaderComponent
        title={Strings.syllabus}
        showBack
        onBackPress={() => navigation.goBack()}
        notificationCount={1}
      />

      <FlatList
        data={syllabus?.chapters}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ChapterCard
            chapter={item}
            open={openChapterId === item.id}
            onToggle={() =>
              setOpenChapterId(openChapterId === item.id ? '' : item.id)
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <SyllabusFilter
              subjects={SYLLABUS_LIST}
              value={syllabus?.value}
              label={syllabus?.label}
              onChange={item => {
                setSyllabus(item);
                setOpenChapterId('1');
              }}
              className={SYLLABUS_CLASS_NAME}
            />

            <OverallProgressCard overview={syllabus} />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Syllabus;

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
