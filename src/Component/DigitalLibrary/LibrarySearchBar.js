import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {wp, hp} from '../../Constants/Responsive';

const LibrarySearchBar = ({
  value,
  onChangeText,
  placeholder,
  animationIndex = 1,
}) => (
  <ProfileGradientCard
    innerStyle={styles.inner}
    style={styles.wrap}
    animationIndex={animationIndex}
    colors={CARD_GRADIENTS.royal}>
      <View style={styles.row}>
        <Icon name="search-outline" size={wp(5)} color={Colors.whiteMuted85} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.whiteMuted75}
          style={styles.input}
        />
      </View>
    </ProfileGradientCard>
);

export default LibrarySearchBar;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(2),
  },
  inner: {
    paddingVertical: hp(0.4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    borderRadius: wp(3.5),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1),
    zIndex: 1,
  },
  input: {
    flex: 1,
    marginLeft: wp(2),
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    padding: 0,
  },
});
