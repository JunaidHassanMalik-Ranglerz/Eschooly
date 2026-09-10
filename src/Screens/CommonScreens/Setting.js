import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../Component/ScreenHeader';
import SwitchStudentCard from '../../Component/SwitchStudentCard';
import Btn from '../../Component/btn';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {useRole} from '../../context/RoleContext';

const Setting = () => {
  const navigation = useNavigation();
  const {clearRole} = useRole();
  const {isParent, childList, selectedChildId, setSelectedChildId} =
    useRoleData();

  const handleLogout = () => {
    clearRole();
    navigation.reset({
      index: 0,
      routes: [{name: 'Role'}],
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title={Strings.settings}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.content}>
        {isParent ? (
          <SwitchStudentCard
            students={childList}
            selectedId={selectedChildId}
            onSelect={setSelectedChildId}
          />
        ) : null}
      </View>

      <View style={styles.footer}>
        <Btn
          variant="outline"
          icon="log-out-outline"
          title={Strings.logout}
          style={styles.logoutBtn}
          onPress={handleLogout}
        />
        <Text style={styles.version}>{Strings.appVersion}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },
  logoutBtn: {
    marginTop: 0,
  },
  version: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
    textAlign: 'center',
    marginTop: hp(2),
  },
});
