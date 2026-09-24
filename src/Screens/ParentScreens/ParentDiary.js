import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterFlatList from '../../Component/ScrollEnterFlatList';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import PersonAvatar from '../../Component/Profile/PersonAvatar';
import ProfileGradientCard from '../../Component/Profile/ProfileGradientCard';
import {SCREEN_WAVES} from '../../Component/CardWave';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';

const DiaryCard = ({item, animationIndex = 0}) => (
  <ProfileGradientCard innerStyle={styles.cardInner} animationIndex={animationIndex}>
    <View style={styles.header}>
      <PersonAvatar
        person={{label: item.name, gender: item.gender, name: item.name}}
        size={wp(10)}
      />
      <View style={styles.headerText}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
    <Text style={styles.message}>{item.message}</Text>
  </ProfileGradientCard>
);

const ParentDiary = () => {
  const {activeStudent, diaryEntries} = useRoleData();

  return (
    <ScreenEnterProvider motion="diary">
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent title={Strings.diary} navyBack />

      <ScrollEnterFlatList
        data={diaryEntries}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <DiaryCard item={item} animationIndex={index + 1} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <SelectedChildBanner child={activeStudent} waveVariant={SCREEN_WAVES.diary} />
        }
      />
    </SafeAreaView>
    </ScreenEnterProvider>
  );
};

export default ParentDiary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  list: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },
  cardInner: {
    paddingVertical: hp(1.5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  headerText: {
    flex: 1,
    marginLeft: wp(3),
  },
  name: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  time: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  message: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
  },
});