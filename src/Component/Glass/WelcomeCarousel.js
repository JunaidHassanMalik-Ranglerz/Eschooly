import React, {useCallback, useMemo, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import WelcomeBanner from './WelcomeBanner';
import {Colors} from '../../Constants/Colors';
import {spacing} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

const SCREEN_W = Dimensions.get('window').width;

const BannerSlide = ({slide}) => (
  <WelcomeBanner
    firstName={slide.firstName}
    title={slide.title}
    subtitle={slide.subtitle}
    art={slide.art}
  />
);

const PaginationDots = ({count, index}) => (
  <View style={styles.dots} pointerEvents="none">
    {Array.from({length: count}, (_, i) => (
      <View
        key={`welcome-dot-${i}`}
        style={[styles.dot, i === index && styles.dotActive]}
      />
    ))}
  </View>
);

const WelcomeCarousel = ({slides = [], style}) => {
  const [index, setIndex] = useState(0);
  const items = useMemo(
    () => (Array.isArray(slides) ? slides.filter(Boolean) : []),
    [slides],
  );

  const updateIndex = useCallback(
    x => {
      const last = Math.max(items.length - 1, 0);
      const next = Math.max(0, Math.min(Math.round(x / SCREEN_W), last));
      setIndex(prev => (prev === next ? prev : next));
    },
    [items.length],
  );

  if (!items.length) {
    return null;
  }

  return (
    <View style={[styles.wrap, style]}>
      <ScrollView
        horizontal
        pagingEnabled
        nestedScrollEnabled
        directionalLockEnabled
        decelerationRate="fast"
        snapToInterval={SCREEN_W}
        snapToAlignment="start"
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={event => updateIndex(event.nativeEvent.contentOffset.x)}
        onMomentumScrollEnd={event =>
          updateIndex(event.nativeEvent.contentOffset.x)
        }
        keyboardShouldPersistTaps="handled">
        {items.map(slide => (
          <View key={slide.key} style={styles.page}>
            <BannerSlide slide={slide} />
          </View>
        ))}
      </ScrollView>
      <PaginationDots count={items.length} index={index} />
    </View>
  );
};

export default WelcomeCarousel;

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: -spacing.md,
  },
  page: {
    marginBottom: hp(1.5),
    width: SCREEN_W,
    paddingHorizontal: spacing.md,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(0.35),
  },
  dot: {
    width: wp(1.85),
    height: wp(1.85),
    borderRadius: wp(0.95),
    backgroundColor: '#D5DEEA',
    marginHorizontal: wp(0.75),
  },
  dotActive: {
    backgroundColor: Colors.brandAccent,
    width: wp(2.15),
    height: wp(2.15),
    borderRadius: wp(1.08),
  },
});
