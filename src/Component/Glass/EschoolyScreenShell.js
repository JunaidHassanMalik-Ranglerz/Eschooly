import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import NavyHeaderBand from './NavyHeaderBand';
import {Colors} from '../../Constants/Colors';
import {spacing} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';
import {useStackBottomPad} from './StudentTone';
import ScrollEnterScrollView from '../ScrollEnterScrollView';

export const NAVY_ICE_TUCK = hp(2.6);
export const NAVY_ICE_SEARCH_GAP = hp(1.25);
export const NAVY_ICE_CURVE = wp(12);

/** Approved Home / Digital Library floating-card overlap. Opt-in; defaults unchanged. */
export const FLOAT_CARD_GAP = hp(1.9);
export const FLOAT_CARD_TUCK = hp(2.2);
export const FLOAT_CARD_RADIUS = wp(7);

/**
 * Opt-in navy-to-ice screen chrome.
 * Existing screens stay unchanged until they wrap with this component.
 */
const Header = ({children, style, contentStyle}) => (
  <NavyHeaderBand
    style={[styles.curveBand, style]}
    contentStyle={[styles.headerContent, contentStyle]}>
    {children}
  </NavyHeaderBand>
);

const Body = ({children, style, tuck = true}) => (
  <View style={[styles.body, tuck && styles.bodyTuck, style]}>{children}</View>
);

const EschoolyScreenShell = ({
  variant = 'navy-ice',
  headerContent,
  hero,
  children,
  scrollable = false,
  bottomInsetMode = 'none',
  bottomPad,
  contentContainerStyle,
  style,
  edges = ['top'],
}) => {
  const stackPad = useStackBottomPad();
  const insets = useSafeAreaInsets();
  const navyIce = variant === 'navy-ice';
  const pad =
    bottomPad != null
      ? bottomPad
      : bottomInsetMode === 'stack'
        ? stackPad
        : bottomInsetMode === 'tab'
          ? hp(3)
          : hp(2) + (insets.bottom || 0);

  const header = headerContent ? <Header>{headerContent}</Header> : null;
  const stacked = (
    <>
      {hero ? <View style={styles.heroSlot}>{hero}</View> : null}
      {children}
    </>
  );

  return (
    <SafeAreaView
      style={[
        styles.screen,
        navyIce ? styles.screenNavy : styles.screenCanvas,
        style,
      ]}
      edges={edges}>
      <StatusBar
        translucent={false}
        backgroundColor={navyIce ? Colors.brandNavy : Colors.canvas}
        barStyle={navyIce ? 'light-content' : 'dark-content'}
      />
      {scrollable ? (
        <ScrollEnterScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingBottom: pad},
            contentContainerStyle,
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          keyboardShouldPersistTaps="handled">
          {header}
          <Body>{stacked}</Body>
        </ScrollEnterScrollView>
      ) : (
        <View style={styles.fill}>{children}</View>
      )}
    </SafeAreaView>
  );
};

EschoolyScreenShell.Header = Header;
EschoolyScreenShell.Body = Body;

export default EschoolyScreenShell;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenNavy: {
    backgroundColor: Colors.brandNavy,
  },
  screenCanvas: {
    backgroundColor: Colors.canvas,
  },
  fill: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  curveBand: {
    borderBottomLeftRadius: NAVY_ICE_CURVE,
    borderBottomRightRadius: 0,
    paddingBottom: NAVY_ICE_SEARCH_GAP + NAVY_ICE_TUCK,
  },
  headerContent: {
    paddingHorizontal: spacing.lg,
  },
  body: {
    paddingHorizontal: spacing.md,
    overflow: 'visible',
  },
  bodyTuck: {
    marginTop: -NAVY_ICE_TUCK,
  },
  heroSlot: {
    overflow: 'visible',
  },
});
