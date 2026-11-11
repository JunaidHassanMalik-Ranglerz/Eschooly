import React, {useEffect, useRef, useState} from 'react';
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
      unstable_pressDelay={0}
      android_ripple={{color: 'transparent', foreground: false}}
      style={styles.tabItem}>
      <View style={[styles.tabPill, isFocused && styles.tabPillActive]}>
        <View style={styles.iconSlot}>
          <Image
            source={icon}
            style={[
              styles.tabIcon,
              { tintColor: isFocused ? Colors.tabActive : Colors.tabInactive },
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
      </View>
    </Pressable>
  );
};

const EschoolTabBar = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();
  const bottomPad = insets.bottom > hp(0.3) ? insets.bottom : hp(0.3);
  const routeName = state.routes[state.index]?.name;
  const [optimistic, setOptimistic] = useState(null);
  const pendingRef = useRef(null);
  const activeName = optimistic || routeName;

  useEffect(() => {
    pendingRef.current = null;
    setOptimistic(null);
  }, [routeName]);

  const handlePress = nextName => {
    const route = state.routes.find(item => item.name === nextName);
    if (!route) {
      return;
    }

    if (activeName === nextName) {
      navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      return;
    }

    if (pendingRef.current === nextName) {
      return;
    }

    pendingRef.current = nextName;
    setOptimistic(nextName);

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(nextName);
    }

    setTimeout(() => {
      if (pendingRef.current === nextName) {
        pendingRef.current = null;
      }
    }, 450);
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
    backgroundColor: Colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderSubtle,
    paddingTop: hp(0.8),
    minHeight: hp(6.4),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: hp(0.2),
  },
  tabPill: {
    minWidth: wp(14),
    alignItems: 'center',
    paddingHorizontal: wp(2.4),
    paddingTop: hp(0.35),
    paddingBottom: hp(0.25),
    borderRadius: wp(5),
  },
  tabPillActive: {
    backgroundColor: Colors.tabActivePill,
  },
  iconSlot: {
    width: wp(8),
    height: wp(7),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.1),
  },
  tabIcon: {
    width: wp(5.8),
    height: wp(5.8),
  },
  label: {
    fontSize: Fontsize.tab,
    fontFamily: Fonts.medium,
    color: Colors.tabInactive,
    textAlign: 'center',
    includeFontPadding: false,
  },
  labelActive: {
    fontFamily: Fonts.bold,
    color: Colors.tabActive,
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
    detachInactiveScreens={false}
    screenOptions={{
      headerShown: false,
      lazy: true,
      animation: 'none',
      freezeOnBlur: false,
    }}
    backBehavior="history"
  >
    <BOTTOM_STACK.Screen name="Home" component={AFN} options={{lazy: false}} />
    <BOTTOM_STACK.Screen
      name="Attends"
      component={Attendance}
      options={{lazy: false}}
    />
    <BOTTOM_STACK.Screen name="Exam" component={Exam} />
    <BOTTOM_STACK.Screen name="Teachers" component={Teacher} />
    <BOTTOM_STACK.Screen name="Profile" component={Profile} />
    <BOTTOM_STACK.Screen name="Menu" component={Menu} options={{lazy: false}} />
    <BOTTOM_STACK.Screen name="Chat" component={Chat} />
  </BOTTOM_STACK.Navigator>
);

export default BottomNavigation;
