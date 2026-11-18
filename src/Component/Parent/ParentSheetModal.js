import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {elevation, radius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {EnterView} from '../AnimatedCard';
import {enterFromBottom} from '../../utils/cardAnimation';
import CardWave, {SCREEN_WAVES} from '../CardWave';

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
  variant = 'navy',
}) => {
  const ice = variant === 'ice';
  const insets = useSafeAreaInsets();
  const handleBack = dismissOnBackPress ? onClose : undefined;

  const header = (
    <View style={[styles.header, ice && styles.headerIce]}>
      <View style={styles.headerText}>
        <Text style={[styles.title, ice && styles.titleIce]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[styles.subtitle, ice && styles.subtitleIce]}
            numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {showClose ? (
        <Pressable
          style={[styles.closeBtn, ice && styles.closeBtnIce]}
          onPress={onClose}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Close"
          android_ripple={{
            color: ice ? Colors.tabActivePill : Colors.whiteOverlay18,
          }}>
          <Icon
            name="close"
            size={wp(5)}
            color={ice ? Colors.brandNavy : Colors.whiteMuted85}
          />
        </Pressable>
      ) : null}
    </View>
  );

  const body = (
    <View style={[styles.body, tall && !compact && styles.bodyTall]}>
      {children}
    </View>
  );

  const overlayContent = (
    <View style={styles.sheetOuter} pointerEvents="box-none">
      <EnterView
        motion={visible ? enterFromBottom(0) : null}
        style={[
          styles.sheet,
          ice && styles.sheetIce,
          tall && !compact && styles.sheetTall,
          compact && styles.sheetCompact,
        ]}>
        {ice ? (
          <LinearGradient
            colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
            start={{x: 0, y: 0.08}}
            end={{x: 1, y: 1}}
            style={styles.sheetFillIce}>
            <CardWave
              variant={SCREEN_WAVES.assignmentIce}
              color="rgba(19, 69, 163, 0.14)"
            />
            {header}
            {body}
          </LinearGradient>
        ) : (
          <>
            {header}
            {body}
          </>
        )}
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
      <View
        style={[
          styles.overlay,
          ice && {
            paddingTop: Math.max(insets.top, hp(1.2)) + hp(0.8),
            paddingBottom: Math.max(insets.bottom, hp(1.2)) + hp(0.8),
          },
        ]}>
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
    zIndex: 1,
  },
  bodyTall: {
    flex: 1,
    minHeight: 0,
    maxHeight: hp(72),
  },
  sheetIce: {
    backgroundColor: Colors.bannerIceStart,
    borderRadius: radius.banner,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    borderWidth: StyleSheet.hairlineWidth * 2,
    paddingTop: hp(1.6),
    paddingBottom: hp(1.6),
    paddingHorizontal: wp(2.2),
    ...elevation.banner,
  },
  sheetFillIce: {
    width: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    borderRadius: radius.banner,
  },
  headerIce: {
    alignItems: 'center',
    paddingBottom: hp(1.35),
  },
  titleIce: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  subtitleIce: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginTop: hp(0.3),
  },
  closeBtnIce: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.hubCard,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderSubtle,
  },
});
