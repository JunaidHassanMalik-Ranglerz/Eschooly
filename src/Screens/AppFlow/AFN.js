import React, {useCallback, useState} from 'react';
import {BackHandler, StatusBar, StyleSheet, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeHeader from '../../Component/HomeHeader';
import PendingDuesCard from '../../Component/PendingDuesCard';
import FeedList from '../../Component/FeedList';
import FilterTabs from '../../Component/FilterTabs';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {useRoleData} from '../../hooks/useRoleData';

const AFN = () => {
  const navigation = useNavigation();
  const {isParent} = useRoleData();
  const [activeTab, setActiveTab] = useState(Strings.tabAll);

  const feedType =
    activeTab === Strings.tabDiary
      ? 'diary'
      : activeTab === Strings.tabAnnouncement
        ? 'announcement'
        : null;

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.getParent()?.reset({
          index: 0,
          routes: [{name: 'AuthNavigation'}],
        });
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [navigation]),
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <HomeHeader />
      {isParent ? <PendingDuesCard /> : null}
      <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <View style={styles.feedWrap}>
        <FeedList type={feedType} />
      </View>
    </SafeAreaView>
  );
};

export default AFN;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBg,
  },
  feedWrap: {
    flex: 1,
  },
});
