import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ParentSheetModal from './Parent/ParentSheetModal';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {elevation, radius} from '../Constants/Theme';
import {wp, hp} from '../Constants/Responsive';

const VISIBLE_ROWS = 6;

const OptionPickerSheetModal = ({
  visible,
  onClose,
  title,
  subtitle,
  data = [],
  selectedValue,
  valueField = 'value',
  labelField = 'label',
  onSelect,
  renderItem,
  keyExtractor,
  variant = 'navy',
}) => {
  const ice = variant === 'ice';
  const defaultKeyExtractor = useCallback(
    item => String(item?.[valueField] ?? item?.key ?? item?.label),
    [valueField],
  );

  const defaultRenderRow = useCallback(
    ({item}) => {
      const value = item?.[valueField];
      const selected = value === selectedValue;
      return (
        <TouchableOpacity
          style={[
            styles.row,
            ice && styles.rowIce,
            selected && (ice ? styles.rowSelectedIce : styles.rowSelected),
          ]}
          activeOpacity={0.85}
          onPress={() => {
            onSelect?.(item);
            onClose?.();
          }}>
          <Text
            style={[
              styles.rowLabel,
              ice && styles.rowLabelIce,
              selected && ice && styles.rowLabelSelectedIce,
            ]}
            numberOfLines={2}
            textBreakStrategy="simple">
            {item?.[labelField]}
          </Text>
          <View
            style={[
              styles.radio,
              ice && styles.radioIce,
              selected && (ice ? styles.radioSelectedIce : styles.radioSelected),
            ]}>
            {selected ? (
              <Icon name="checkmark" size={wp(3.5)} color={Colors.white} />
            ) : null}
          </View>
        </TouchableOpacity>
      );
    },
    [ice, labelField, onClose, onSelect, selectedValue, valueField],
  );

  const useTallList = data.length > VISIBLE_ROWS;

  return (
    <ParentSheetModal
      visible={visible}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      variant={variant}
      dismissOnBackdropPress={false}
      compact={!useTallList}
      tall={useTallList}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor || defaultKeyExtractor}
        renderItem={renderItem || defaultRenderRow}
        style={useTallList ? styles.listScrollTall : styles.listScroll}
        contentContainerStyle={
          useTallList
            ? [styles.listContentTall, ice && styles.listContentIce]
            : [styles.listContent, ice && styles.listContentIce]
        }
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        scrollEnabled={useTallList}
        showsVerticalScrollIndicator={useTallList}
        bounces={useTallList}
      />
    </ParentSheetModal>
  );
};

export default OptionPickerSheetModal;

const ROW_HEIGHT = hp(8.2);

const styles = StyleSheet.create({
  listScroll: {
    flexGrow: 0,
  },
  listContent: {
    paddingHorizontal: wp(1),
    paddingTop: hp(0.4),
    paddingBottom: hp(1.2),
  },
  listScrollTall: {
    flexGrow: 1,
  },
  listContentTall: {
    paddingHorizontal: wp(1),
    paddingTop: hp(0.4),
    paddingBottom: hp(2.5),
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.6),
    minHeight: ROW_HEIGHT,
    borderRadius: wp(3),
    marginBottom: hp(0.35),
  },
  rowSelected: {
    backgroundColor: Colors.whiteOverlay18,
  },
  rowLabel: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs5,
    paddingRight: wp(2),
  },
  radio: {
    width: wp(5.5),
    height: wp(5.5),
    borderRadius: wp(2.75),
    borderWidth: 1.5,
    borderColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  listContentIce: {
    paddingHorizontal: wp(1.4),
    paddingTop: hp(0.2),
    paddingBottom: hp(1.6),
  },
  rowIce: {
    backgroundColor: Colors.surface,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderSubtle,
    borderRadius: radius.card,
    minHeight: hp(6.4),
    paddingVertical: hp(1.45),
    paddingHorizontal: wp(3.4),
    marginBottom: hp(0.85),
  },
  rowSelectedIce: {
    backgroundColor: Colors.hubCard,
    borderColor: Colors.brandRoyal,
    borderWidth: 1.5,
    ...elevation.card,
  },
  rowLabelIce: {
    color: Colors.brandNavy,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs4,
  },
  rowLabelSelectedIce: {
    fontFamily: Fonts.bold,
    color: Colors.brandNavy,
  },
  radioIce: {
    borderColor: 'rgba(19, 69, 163, 0.28)',
    backgroundColor: Colors.bannerIceStart,
    flexShrink: 0,
    marginLeft: wp(1.2),
  },
  radioSelectedIce: {
    backgroundColor: Colors.brandRoyal,
    borderColor: Colors.brandRoyal,
  },
});
