import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ParentNavyIceLayout from '../../Component/Parent/ParentNavyIceLayout';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import PersonAvatar from '../../Component/Profile/PersonAvatar';
import ProfileGradientCard from '../../Component/Profile/ProfileGradientCard';
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
      <ParentNavyIceLayout
        title={Strings.diary}
        subtitle={Strings.diarySubtitleParent}
        unreadCount={1}>
        <SelectedChildBanner
          child={activeStudent}
          icy
          canSwitch={false}
          compactMargin
        />
        {diaryEntries.map((item, index) => (
          <DiaryCard key={item.id} item={item} animationIndex={index + 1} />
        ))}
      </ParentNavyIceLayout>
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