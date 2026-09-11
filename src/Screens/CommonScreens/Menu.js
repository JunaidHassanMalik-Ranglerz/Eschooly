import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../Constants/Colors';
import { Fonts } from '../../Constants/Fonts';
import { wp } from '../../Constants/Responsive';
import { Strings } from '../../Constants/Strings';
import { MENU_LIST } from '../../Constants/dummydata';
import MenuBox from '../../Component/MenuBox';

const Menu = () => {
  const navigation = useNavigation();

  const handlePress = item => {
    if (!item.screen) {
      return;
    }

    if (item.tab) {
      navigation.navigate('BottomTab', { screen: item.screen });
      return;
    }

    navigation.navigate(item.screen);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
        translucent={false}
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="chevron-back" size={wp(6)} color={Colors.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {Strings.menu}
        </Text>
      </View>

      <ScrollView
        style={styles.menuList}
        contentContainerStyle={styles.menuContent}
        showsVerticalScrollIndicator={false}
      >
        {MENU_LIST.map(item => (
          <MenuBox
            key={item.value}
            title={item.label}
            icon={item.icon}
            iconColor={
              item.value === 'subjects' ||
              item.value === 'attendance' ||
              item.value === 'timetable' ||
              item.value === 'holidays'
                ? Colors.black
                : undefined
            }
            onPress={() => handlePress(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  header: {
    backgroundColor: Colors.menuHeaderBg,
    height: wp(25),
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: wp(5),
  },

  backBtn: {
    position: 'absolute',
    left: wp(4),
    top: wp(5),
    zIndex: 1,
  },

  headerTitle: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: wp(4.5),
    width: wp(13),
  },

  menuList: {
    flex: 1,
  },

  menuContent: {
    paddingBottom: wp(6),
  },
});
