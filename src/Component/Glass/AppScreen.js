import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../Constants/Colors';

const AppScreen = ({
  children,
  header,
  navy = false,
  edges = ['top'],
  style,
  contentStyle,
}) => (
  <SafeAreaView
    edges={edges}
    style={[styles.screen, navy && styles.navy, style]}>
    <StatusBar
      barStyle={navy ? 'light-content' : 'dark-content'}
      backgroundColor={navy ? Colors.brandNavy : Colors.canvas}
    />
    {header}
    <View style={[styles.body, contentStyle]}>{children}</View>
  </SafeAreaView>
);

export default AppScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  navy: {
    backgroundColor: Colors.brandNavy,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
});
