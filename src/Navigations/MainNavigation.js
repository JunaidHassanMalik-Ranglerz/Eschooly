import React, {useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { applyStatusBarForRoute, getActiveRouteName } from '../Constants/MyStyling';
import SplashScreen from '../Screens/StartScreens/SplashScreen';
import Role from '../Screens/StartScreens/Role';
import AuthNavigation from './AuthNavigation';
import BottomNavigation from './EschoolBottomTab/BottomNavigation';
import Syllabus from '../Screens/CommonScreens/Syllabus';
import MyProfile from '../Screens/CommonScreens/MyProfile';
import Dues from '../Screens/CommonScreens/Dues';
import DigitalLibrary from '../Screens/CommonScreens/DigitalLibrary';
import StudentIdCard from '../Screens/CommonScreens/StudentIdCard';
import PdfViewer from '../Screens/CommonScreens/PdfViewer';
import OnlineExam from '../Screens/CommonScreens/OnlineExam';
import OnlineClass from '../Screens/CommonScreens/OnlineClass';
import MidtermMathematics from '../Screens/CommonScreens/MidtermMathematics';
import Menu from '../Screens/CommonScreens/Menu';
import Assignment from '../Screens/CommonScreens/Assignment';
import Notification from '../Screens/CommonScreens/Notification';
import ChildProfile from '../Screens/ParentScreens/ChildProfile';
import Announcements from '../Screens/ParentScreens/Announcements';
import ExamSchedule from '../Screens/ParentScreens/ExamSchedule';
import Timetable from '../Screens/ParentScreens/Timetable';
import ParentDiary from '../Screens/ParentScreens/ParentDiary';
import Attendance from '../Screens/CommonScreens/Attendance';
import Exam from '../Screens/CommonScreens/Exam';
import Teacher from '../Screens/CommonScreens/Teacher';
import Fee from '../Screens/ParentScreens/Fee';
import Transport from '../Screens/ParentScreens/Transport';
import Holidays from '../Screens/CommonScreens/Holidays';
import StudentResults from '../Screens/CommonScreens/StudentResults';

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
        screenOptions={{headerShown: false, headerShadowVisible: false}}
      >
        <MAIN_STACK.Screen name="SplashScreen" component={SplashScreen} />
        <MAIN_STACK.Screen name="Role" component={Role} />
        <MAIN_STACK.Screen name="AuthNavigation" component={AuthNavigation} />
        <MAIN_STACK.Screen
          name="BottomTab"
          component={BottomNavigation}
          options={{
            statusBarTranslucent: false,
            animation: 'fade',
          }}
        />
        <MAIN_STACK.Screen name="Syllabus" component={Syllabus} />
        <MAIN_STACK.Screen name="MyProfile" component={MyProfile} />
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
        <MAIN_STACK.Screen name="Assignment" component={Assignment} />
        <MAIN_STACK.Screen name="Notification" component={Notification} />
        <MAIN_STACK.Screen name="ChildProfile" component={ChildProfile} />
        <MAIN_STACK.Screen name="Announcements" component={Announcements} />
        <MAIN_STACK.Screen name="ExamSchedule" component={ExamSchedule} />
        <MAIN_STACK.Screen name="Timetable" component={Timetable} />
        <MAIN_STACK.Screen name="ParentDiary" component={ParentDiary} />
        <MAIN_STACK.Screen name="ParentAttendance" component={Attendance} />
        <MAIN_STACK.Screen name="ParentResults" component={Exam} />
        <MAIN_STACK.Screen name="StudentResults" component={StudentResults} />
        <MAIN_STACK.Screen name="ParentTeachers" component={Teacher} />
        <MAIN_STACK.Screen name="Fee" component={Fee} />
        <MAIN_STACK.Screen name="Transport" component={Transport} />
        <MAIN_STACK.Screen name="Holidays" component={Holidays} />
      </MAIN_STACK.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
