import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';
import {EnterView} from '../AnimatedCard';
import {enterFromBottom} from '../../utils/cardAnimation';

const ParentSheetModal = ({
  visible,
  onClose,
  title,
  subtitle,
  children,
  showClose = true,
  dismissOnBackdropPress = true,
  dismissOnBackPress = true,
  tall = false,
  compact = false,
}) => {
  const handleBack = dismissOnBackPress ? onClose : undefined;

  const overlayContent = (
    <View style={styles.sheetOuter} pointerEvents="box-none">
      <EnterView
        motion={visible ? enterFromBottom(0) : null}
        style={[
          styles.sheet,
          tall && !compact && styles.sheetTall,
          compact && styles.sheetCompact,
        ]}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          {showClose ? (
            <Pressable
              style={styles.closeBtn}
              onPress={onClose}
              hitSlop={8}
              android_ripple={{color: Colors.whiteOverlay18}}>
              <Icon name="close" size={wp(5)} color={Colors.whiteMuted85} />
            </Pressable>
          ) : null}
        </View>
        <View style={[styles.body, tall && !compact && styles.bodyTall]}>
          {children}
        </View>
      </EnterView>
    </View>
  );

  return (
    <Modal
      visible={!!visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleBack}>
      <View style={styles.overlay}>
        {dismissOnBackdropPress ? (
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close modal"
          />
        ) : null}
        {overlayContent}
      </View>
    </Modal>
  );
};

export default ParentSheetModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlayDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.2),
  },
  sheetOuter: {
    width: '100%',
    maxHeight: '92%',
    zIndex: 1,
  },
  sheet: {
    backgroundColor: Colors.parentHeader,
    borderRadius: wp(4),
    paddingTop: hp(1.5),
    paddingBottom: hp(2),
    paddingHorizontal: wp(2),
    maxHeight: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.whiteOverlay18,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  sheetTall: {
    minHeight: hp(68),
    maxHeight: hp(86),
  },
  sheetCompact: {
    maxHeight: hp(86),
    alignSelf: 'stretch',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingBottom: hp(1.2),
    zIndex: 2,
  },
  headerText: {
    flex: 1,
    paddingRight: wp(2),
  },
  title: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  subtitle: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
    marginTop: hp(0.25),
  },
  closeBtn: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flexShrink: 1,
    minHeight: 0,
    maxHeight: hp(58),
  },
  bodyTall: {
    flex: 1,
    minHeight: 0,
    maxHeight: hp(72),
  },
});
