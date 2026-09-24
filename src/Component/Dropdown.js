import React, {useMemo, useState} from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import OptionPickerSheetModal from './OptionPickerSheetModal';

import {Colors} from '../Constants/Colors';

import {Fonts} from '../Constants/Fonts';

import {Fontsize} from '../Constants/Fontsize';

import {Strings} from '../Constants/Strings';

import {STUDENT_LIST} from '../Constants/dummydata';

import {wp, hp} from '../Constants/Responsive';



const Dropdown = props => {

  const [visible, setVisible] = useState(false);



  const selectedItem = useMemo(() => {

    return (

      STUDENT_LIST.find(item => item.value === props?.value) || STUDENT_LIST[0]

    );

  }, [props?.value]);



  const handleSelect = item => {

    props?.onChange?.(item?.value);

    setVisible(false);

  };



  return (

    <>

      <TouchableOpacity

        style={styles.selector}

        activeOpacity={0.8}

        onPress={() => setVisible(true)}>

        <View style={styles.textWrap}>

          <Text style={styles.classText}>{selectedItem?.className}</Text>

          <Text style={styles.nameText}>{selectedItem?.label}</Text>

        </View>

        <Icon name="chevron-down" size={wp(5)} color={Colors.primary} />

      </TouchableOpacity>



      <OptionPickerSheetModal

        visible={visible}

        onClose={() => setVisible(false)}

        title={Strings.switchStudent}

        subtitle={selectedItem?.label}

        data={STUDENT_LIST}

        selectedValue={props?.value ?? selectedItem?.value}

        onSelect={handleSelect}

        renderItem={({item}) => {

          const selected = item.value === (props?.value ?? selectedItem?.value);

          return (

            <TouchableOpacity

              style={[styles.option, selected && styles.optionSelected]}

              activeOpacity={0.85}

              onPress={() => handleSelect(item)}>

              <View>

                <Text style={styles.optionClass}>{item?.className}</Text>

                <Text style={styles.optionName}>{item?.label}</Text>

              </View>

            </TouchableOpacity>

          );

        }}

      />

    </>

  );

};



export default Dropdown;



const styles = StyleSheet.create({

  selector: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    backgroundColor: Colors.cardBg,

    borderRadius: wp(2),

    borderWidth: 1,

    borderColor: Colors.inputBorder,

    paddingHorizontal: wp(4),

    paddingVertical: hp(1.5),

    marginHorizontal: wp(4),

    marginBottom: hp(2),

  },

  textWrap: {

    flex: 1,

  },

  classText: {

    color: Colors.grayText,

    fontFamily: Fonts.regular,

    fontSize: Fontsize.small,

  },

  nameText: {

    color: Colors.black,

    fontFamily: Fonts.semibold,

    fontSize: Fontsize.normal,

    marginTop: hp(0.3),

  },

  option: {

    paddingHorizontal: wp(3),

    paddingVertical: hp(1.6),

    borderRadius: wp(3),

    marginBottom: hp(0.35),

  },

  optionSelected: {

    backgroundColor: Colors.whiteOverlay18,

  },

  optionClass: {

    color: Colors.whiteMuted75,

    fontFamily: Fonts.regular,

    fontSize: Fontsize.small,

  },

  optionName: {

    color: Colors.white,

    fontFamily: Fonts.semibold,

    fontSize: Fontsize.normal,

    marginTop: hp(0.25),

  },

});


