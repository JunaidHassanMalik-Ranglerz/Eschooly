import React, {useCallback} from 'react';
import {BackHandler} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ParentHome from './ParentHome';
import StudentHome from './StudentHome';
import {useRoleData} from '../../hooks/useRoleData';

const AFN = () => {
  const navigation = useNavigation();
  const {isParent} = useRoleData();

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

  if (isParent) {
    return <ParentHome />;
  }

  return <StudentHome />;
};

export default AFN;
