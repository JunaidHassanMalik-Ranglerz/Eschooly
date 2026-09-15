import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AFN from '../../Screens/AppFlow/AFN';
import Profile from '../../Screens/CommonScreens/Profile';
import Attendance from '../../Screens/CommonScreens/Attendance';
import Exam from '../../Screens/CommonScreens/Exam';
import Teacher from '../../Screens/CommonScreens/Teacher';
import { Images } from '../../Assets';
import { hp, wp } from '../../Constants/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fonts } from '../../Constants/Fonts';
import { Fontsize } from '../../Constants/Fontsize';
import { Strings } from '../../Constants/Strings';
import Menu from '../../Screens/CommonScreens/Menu';
import Chat from '../../Screens/CommonScreens/Chat';

const BOTTOM_STACK = createBottomTabNavigator();

const CIRCLE_SIZE = wp(13);
const CIRCLE_RADIUS = wp(6.5);
const BORDER_WIDTH = wp(0.5);

const TAB_ICONS = {
  Home: Images.homeIcon,
  Attends: Images.attendsIcon,
  Exam: Images.examIcon,
  Teachers: Images.teacherIcon,
  Profile: Images.profileIcon,
  Menu: Images.menuIcon,
  Chat: Images.messageIcon,
};

const TAB_LABELS = {
  Home: Strings.home,
  Attends: Strings.attends,
  Exam: Strings.exam,
  Teachers: Strings.teachers,
  Profile: Strings.profile,
  Menu: Strings.academics,
  Chat: Strings.chat,
};

const TabBarItem = ({ name, isFocused, onPress }) => {
  const icon = TAB_ICONS[name];
  const label = TAB_LABELS[name];

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{color: 'transparent', foreground: false}}
      style={styles.tabItem}>
      <View
        style={[
          styles.iconSlot,
          isFocused ? styles.iconSlotActive : styles.iconSlotInactive,
        ]}>
        <Image
          source={icon}
          style={[
            styles.tabIcon,
            { tintColor: isFocused ? Colors.primary : Colors.grayText },
          ]}
          resizeMode="contain"
        />
      </View>
      <Text
        style={[styles.label, isFocused && styles.labelActive]}
        numberOfLines={1}
        allowFontScaling={false}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const EschoolTabBar = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();
  const bottomPad = insets.bottom > hp(0.3) ? insets.bottom : hp(0.3);
  const activeName = state.routes[state.index]?.name;

  const handlePress = routeName => {
    const isFocused = activeName === routeName;
    const route = state.routes.find(item => item.name === routeName);

    if (!route) {
      return;
    }

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={[styles.tabBar, { paddingBottom: bottomPad }]}>
      <TabBarItem
        name="Home"
        isFocused={activeName === 'Home'}
        onPress={() => handlePress('Home')}
      />
      {/* <TabBarItem
        name="Attends"
        isFocused={activeName === 'Attends'}
        onPress={() => handlePress('Attends')}
      />
      <TabBarItem
        name="Exam"
        isFocused={activeName === 'Exam'}
        onPress={() => handlePress('Exam')}
      />
      <TabBarItem
        name="Teachers"
        isFocused={activeName === 'Teachers'}
        onPress={() => handlePress('Teachers')}
      /> */}

      <TabBarItem
        name="Menu"
        isFocused={activeName === 'Menu'}
        onPress={() => handlePress('Menu')}
      />

      <TabBarItem
        name="Chat"
        isFocused={activeName === 'Chat'}
        onPress={() => handlePress('Chat')}
      />

      <TabBarItem
        name="Profile"
        isFocused={activeName === 'Profile'}
        onPress={() => handlePress('Profile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: wp(0.25),
    borderTopColor: Colors.border,
    paddingTop: hp(0.6),
    minHeight: hp(6.2),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: hp(0.2),
  },
  iconSlot: {
    width: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.2),
  },
  iconSlotInactive: {
    height: wp(7),
  },
  tabIcon: {
    width: wp(5.8),
    height: wp(5.8),
  },
  iconSlotActive: {
    height: CIRCLE_SIZE,
    borderWidth: BORDER_WIDTH,
    borderColor: Colors.primary,
    borderRadius: CIRCLE_RADIUS,
    backgroundColor: Colors.white,
    marginTop: -wp(2.2),
    marginBottom: hp(0.25),
  },
  label: {
    fontSize: Fontsize.tab,
    fontFamily: Fonts.regular,
    color: Colors.grayText,
    textAlign: 'center',
    includeFontPadding: false,
  },
  labelActive: {
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },
  scene: {
    backgroundColor: Colors.parentBg,
  },
});

const BottomNavigation = () => (
  <BOTTOM_STACK.Navigator
    initialRouteName="Home"
    tabBar={props => <EschoolTabBar {...props} />}
    sceneContainerStyle={styles.scene}
    screenOptions={{headerShown: false}}
  >
    <BOTTOM_STACK.Screen name="Home" component={AFN} />
    <BOTTOM_STACK.Screen name="Attends" component={Attendance} />
    <BOTTOM_STACK.Screen name="Exam" component={Exam} />
    <BOTTOM_STACK.Screen name="Teachers" component={Teacher} />
    <BOTTOM_STACK.Screen name="Profile" component={Profile} />
    <BOTTOM_STACK.Screen name="Menu" component={Menu} />
    <BOTTOM_STACK.Screen name="Chat" component={Chat} />
  </BOTTOM_STACK.Navigator>
);

export default BottomNavigation;
