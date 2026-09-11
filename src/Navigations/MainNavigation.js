import React, {useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { applyStatusBarForRoute, getActiveRouteName } from '../Constants/MyStyling';
import SplashScreen from '../Screens/StartScreens/SplashScreen';
import Role from '../Screens/StartScreens/Role';
import AuthNavigation from './AuthNavigation';
import BottomNavigation from './EschoolBottomTab/BottomNavigation';
import Syllabus from '../Screens/CommonScreens/Syllabus';
import Setting from '../Screens/CommonScreens/Setting';
import MyProfile from '../Screens/CommonScreens/MyProfile';
import Dues from '../Screens/CommonScreens/Dues';
import DigitalLibrary from '../Screens/CommonScreens/DigitalLibrary';
import StudentIdCard from '../Screens/CommonScreens/StudentIdCard';
import PdfViewer from '../Screens/CommonScreens/PdfViewer';
import OnlineExam from '../Screens/CommonScreens/OnlineExam';
import OnlineClass from '../Screens/CommonScreens/OnlineClass';
import MidtermMathematics from '../Screens/CommonScreens/MidtermMathematics';
import Menu from '../Screens/CommonScreens/Menu';

const MAIN_STACK = createNativeStackNavigator();

const MainNavigation = () => {
  const navigationRef = useRef(null);

  const syncStatusBar = () => {
    const state = navigationRef.current?.getRootState();
    const routeName = getActiveRouteName(state);
    applyStatusBarForRoute(routeName);
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={syncStatusBar}
      onStateChange={syncStatusBar}>
      <MAIN_STACK.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <MAIN_STACK.Screen name="SplashScreen" component={SplashScreen} />
        <MAIN_STACK.Screen name="Role" component={Role} />
        <MAIN_STACK.Screen name="AuthNavigation" component={AuthNavigation} />
        <MAIN_STACK.Screen name="BottomTab" component={BottomNavigation} />
        <MAIN_STACK.Screen name="Syllabus" component={Syllabus} />
        <MAIN_STACK.Screen name="MyProfile" component={MyProfile} />
        <MAIN_STACK.Screen name="Setting" component={Setting} />
        <MAIN_STACK.Screen name="Dues" component={Dues} />
        <MAIN_STACK.Screen name="DigitalLibrary" component={DigitalLibrary} />
        <MAIN_STACK.Screen name="StudentIdCard" component={StudentIdCard} />
        <MAIN_STACK.Screen name="PdfViewer" component={PdfViewer} />
        <MAIN_STACK.Screen name="OnlineExam" component={OnlineExam} />
        <MAIN_STACK.Screen name="OnlineClass" component={OnlineClass} />
        <MAIN_STACK.Screen
          name="MidtermMathematics"
          component={MidtermMathematics}
        />
        <MAIN_STACK.Screen name="Menu" component={Menu} />
      </MAIN_STACK.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
