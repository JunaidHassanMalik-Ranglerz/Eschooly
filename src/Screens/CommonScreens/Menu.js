import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {MENU_LIST} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';

const ITEM_META = {
  subjects: {icon: 'book-outline', bg: Colors.blueSoft, color: Colors.iconBlue},
  assignments: {
    icon: 'document-text-outline',
    bg: Colors.orangeSoft,
    color: Colors.iconOrange,
  },
  teachers: {icon: 'people-outline', bg: Colors.cyanSoft, color: Colors.iconCyan},
  attendance: {
    icon: 'calendar-outline',
    bg: Colors.greenSoft,
    color: Colors.iconGreen,
  },
  timetable: {icon: 'time-outline', bg: Colors.purpleSoft, color: Colors.iconPurple},
  holidays: {icon: 'sunny-outline', bg: Colors.orangeSoft, color: Colors.iconOrange},
  exams: {icon: 'clipboard-outline', bg: Colors.pinkSoft, color: Colors.iconPink},
  result: {icon: 'trophy-outline', bg: Colors.tealSoft, color: Colors.iconTeal},
  fee: {icon: 'card-outline', bg: Colors.blueSoft, color: Colors.primary},
};

const Menu = () => {
  const navigation = useNavigation();
  const {isParent, activeStudent} = useRoleData();

  const handlePress = item => {
    const target = isParent && item.parentScreen ? item.parentScreen : item.screen;
    if (!target) {
      return;
    }

    if (!isParent && item.tab) {
      navigation.navigate(target);
      return;
    }

    navigation.navigate(target);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <MainHeaderComponent
        title={Strings.academics}
        notificationCount={1}
        onBackPress={() => navigation.navigate('Home')}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {isParent ? <SelectedChildBanner child={activeStudent} /> : null}

        {MENU_LIST.filter(item => isParent || item.value !== 'fee').map(item => {
          const meta = ITEM_META[item.value] || ITEM_META.subjects;
          const disabled = !item.screen && !item.parentScreen;
          return (
            <TouchableOpacity
              key={item.value}
              style={[styles.row, disabled && styles.rowDisabled]}
              activeOpacity={0.85}
              onPress={() => handlePress(item)}>
              <View style={[styles.iconWrap, {backgroundColor: meta.bg}]}>
                <Icon name={meta.icon} size={wp(5)} color={meta.color} />
              </View>
              <Text style={styles.title} numberOfLines={1}>
                {item.label}
              </Text>
              <View style={styles.arrowBtn}>
                <Icon name="arrow-forward" size={wp(3.8)} color={Colors.white} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.6),
    marginBottom: hp(1.2),
  },
  rowDisabled: {
    opacity: 0.55,
  },
  iconWrap: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  title: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs5,
  },
  arrowBtn: {
    width: wp(7.5),
    height: wp(7.5),
    borderRadius: wp(3.75),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
