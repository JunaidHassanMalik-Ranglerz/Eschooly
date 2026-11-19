import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ParentNavyIceLayout from '../../Component/Parent/ParentNavyIceLayout';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import PersonAvatar from '../../Component/Profile/PersonAvatar';
import ProfileGradientCard from '../../Component/Profile/ProfileGradientCard';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';
import {PARENT_DIARY, getChildRecords} from '../../Constants/parentData';
import {fetchChildDashboard} from '../../store/slices/parentHomeSlice';

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
  const dispatch = useDispatch();
  const {
    activeStudent,
    diaryEntries,
    childList,
    selectedChildId: roleChildId,
    setSelectedChildId,
    canSwitchChild: roleCanSwitch,
    isParent,
  } = useRoleData();
  const {selectedChildId: homeChildId, children} = useSelector(
    state => state.parentHome,
  );
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);
  const activeChildId = homeChildId || children[0]?.value || roleChildId || null;
  const parentChild =
    children.find(item => item.value === String(activeChildId)) ||
    childList.find(item => item.value === String(activeChildId)) ||
    children[0] ||
    childList[0] ||
    null;
  const shownChild = isParent ? parentChild || activeStudent : activeStudent;
  const canSwitchChild = isParent
    ? children.length > 1 || childList.length > 1
    : roleCanSwitch;
  const switchList = children.length ? children : childList;
  const entries =
    isParent && shownChild?.value
      ? getChildRecords(PARENT_DIARY, shownChild.value) || diaryEntries || []
      : diaryEntries || [];

  const openSwitch = useCallback(() => {
    setSwitchVisible(true);
    setModalReplay(value => value + 1);
  }, []);

  const handleSelectChild = useCallback(
    nextId => {
      if (!nextId || String(nextId) === String(activeChildId)) {
        return;
      }
      if (isParent) {
        dispatch(fetchChildDashboard(nextId));
      }
      setSelectedChildId(String(nextId));
    },
    [activeChildId, dispatch, isParent, setSelectedChildId],
  );

  return (
    <ScreenEnterProvider motion="diary">
      <ParentNavyIceLayout
        title={Strings.diary}
        subtitle={Strings.diarySubtitleParent}
        unreadCount={1}
        footer={
          canSwitchChild ? (
            <ChildSwitchModal
              visible={switchVisible}
              childrenList={switchList}
              selectedId={String(activeChildId || shownChild?.value || '')}
              onSelect={handleSelectChild}
              onClose={() => setSwitchVisible(false)}
              replayToken={modalReplay}
            />
          ) : null
        }>
        <SelectedChildBanner
          child={shownChild}
          variant="large"
          icy
          disableEnterAnimation
          compactMargin
          canSwitch={canSwitchChild}
          onSwitchPress={canSwitchChild ? openSwitch : undefined}
        />
        {entries.map((item, index) => (
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