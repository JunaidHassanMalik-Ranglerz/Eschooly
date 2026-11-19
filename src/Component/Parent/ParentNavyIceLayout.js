import React from 'react';
import {StyleSheet, View} from 'react-native';
import EschoolyScreenShell from '../Glass/EschoolyScreenShell';
import StudentBrandedHeader from '../Student/StudentBrandedHeader';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import {
  StudentToneProvider,
  useStackBottomPad,
} from '../Glass/StudentTone';
import ScrollEnterScrollView from '../ScrollEnterScrollView';
import {Colors} from '../../Constants/Colors';
import {hp, wp} from '../../Constants/Responsive';

const ParentNavyIceLayout = ({
  title,
  unreadCount,
  children,
  footer,
  showBell = true,
  onBackPress,
  subtitle,
  contentContainerStyle,
}) => {
  const bottomPad = useStackBottomPad();

  return (
    <StudentToneProvider active>
      <EschoolyScreenShell variant="navy-ice">
        <ScrollEnterScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.studentScroll,
            {paddingBottom: bottomPad},
            contentContainerStyle,
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="handled">
          <EschoolyScreenShell.Header>
            <StudentBrandedHeader
              title={title}
              unreadCount={unreadCount}
              showBell={showBell}
              onBackPress={onBackPress}
              subtitle={subtitle}
            />
          </EschoolyScreenShell.Header>
          <EschoolyScreenShell.Body>
            <View style={styles.canvasStage}>
              <View pointerEvents="none" style={styles.canvasWave}>
                <CardWave
                  variant={SCREEN_WAVES.assignmentIce}
                  color="rgba(37, 99, 235, 0.12)"
                />
              </View>
              <View style={styles.canvasForeground}>{children}</View>
            </View>
          </EschoolyScreenShell.Body>
        </ScrollEnterScrollView>
        {footer}
      </EschoolyScreenShell>
    </StudentToneProvider>
  );
};

export default ParentNavyIceLayout;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  studentScroll: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  canvasStage: {
    position: 'relative',
    overflow: 'visible',
    minHeight: hp(40),
  },
  canvasWave: {
    position: 'absolute',
    top: hp(2),
    right: -wp(4),
    left: 0,
    height: hp(56),
    zIndex: 0,
  },
  canvasForeground: {
    zIndex: 1,
  },
});
