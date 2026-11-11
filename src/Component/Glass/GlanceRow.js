import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedCard from '../AnimatedCard';
import DepthIcon from '../DepthIcon';
import FeatureArtImage from './FeatureArtImage';
import GlassCard from './GlassCard';
import {Colors} from '../../Constants/Colors';
import {Typography} from '../../Constants/Typography';
import {spacing} from '../../Constants/Theme';
import {wp} from '../../Constants/Responsive';

const GlanceRow = ({
  title,
  meta,
  art,
  icon,
  iconColor = Colors.brandRoyal,
  onPress,
  animationIndex = 0,
  style,
}) => (
  <AnimatedCard index={animationIndex} style={style}>
    <GlassCard onPress={onPress} style={styles.row} padded={false}>
      <View style={styles.inner}>
        <View style={styles.iconWrap}>
          {art ? (
            <FeatureArtImage source={art} size={wp(11)} />
          ) : (
            <DepthIcon name={icon} size={wp(6)} color={iconColor} />
          )}
        </View>
        <View style={styles.copy}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {meta ? (
            <Text style={styles.meta} numberOfLines={1}>
              {meta}
            </Text>
          ) : null}
        </View>
        <Icon name="chevron-forward" size={wp(4.5)} color={Colors.textSecondary} />
      </View>
    </GlassCard>
  </AnimatedCard>
);

export default GlanceRow;

const styles = StyleSheet.create({
  row: {
    marginBottom: spacing.sm,
    backgroundColor: Colors.surface,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  iconWrap: {
    width: wp(12),
    height: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  copy: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
  },
  meta: {
    ...Typography.cardMeta,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
