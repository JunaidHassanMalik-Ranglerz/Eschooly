import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const LibrarySearchBar = ({value, onChangeText, placeholder}) => {
  return (
    <View style={styles.wrap}>
      <Icon name="search-outline" size={wp(5)} color={Colors.grayText} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholderText}
        style={styles.input}
      />
    </View>
  );
};

export default LibrarySearchBar;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.2),
    marginBottom: hp(2),
  },
  input: {
    flex: 1,
    marginLeft: wp(2),
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
    padding: 0,
  },
});
