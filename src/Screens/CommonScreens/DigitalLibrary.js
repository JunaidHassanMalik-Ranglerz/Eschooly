import React from 'react';

import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';

import {useNavigation} from '@react-navigation/native';

import {SafeAreaView} from 'react-native-safe-area-context';

import MainHeaderComponent from '../../Component/MainHeaderComponent';

import LibraryProfileCard from '../../Component/DigitalLibrary/LibraryProfileCard';

import LibrarySearchBar from '../../Component/DigitalLibrary/LibrarySearchBar';

import LibraryCategoryFilter from '../../Component/DigitalLibrary/LibraryCategoryFilter';

import LibraryResourceCard from '../../Component/DigitalLibrary/LibraryResourceCard';

import AnimatedCard from '../../Component/AnimatedCard';

import {useRoleData} from '../../hooks/useRoleData';

import {withScreenEnter} from '../../hooks/useScreenEnterGate';

import {

  LIBRARY_CATEGORIES,

  getFilteredResources,

} from '../../Constants/DigitalLibraryData';

import {Colors} from '../../Constants/Colors';

import {Fonts} from '../../Constants/Fonts';

import {Fontsize} from '../../Constants/Fontsize';

import {Strings} from '../../Constants/Strings';

import {wp, hp} from '../../Constants/Responsive';



const DigitalLibrary = () => {

  const navigation = useNavigation();

  const {activeStudent, libraryResources} = useRoleData();

  const [search, setSearch] = React.useState('');

  const [category, setCategory] = React.useState('all');



  const books = getFilteredResources(libraryResources, search, category);



  const handleOpen = item => {

    if (!item.pdfUrl) {

      return;

    }

    navigation.navigate('PdfViewer', {

      pdfUrl: item.pdfUrl,

      title: item.title,

    });

  };



  return (

      <SafeAreaView style={styles.container} edges={['top']}>

        <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />

        <MainHeaderComponent

          title={Strings.digitalLibrary}

          notificationCount={1}

          navyBack

        />



        <ScrollEnterScrollView

          style={styles.scroll}

          contentContainerStyle={styles.content}

          showsVerticalScrollIndicator={false}

          bounces={false}

          overScrollMode="never"

          removeClippedSubviews={false}>

          <LibraryProfileCard
            student={{...activeStudent, status: 'Active'}}
            animationIndex={1}
          />



          <LibrarySearchBar

            value={search}

            onChangeText={setSearch}

            placeholder={Strings.librarySearchPlaceholder}

            animationIndex={2}
          />



          <AnimatedCard index={3} style={styles.filterWrap}>

            <LibraryCategoryFilter

              categories={LIBRARY_CATEGORIES}

              selected={category}

              onSelect={setCategory}

            />

          </AnimatedCard>



          <AnimatedCard index={4} style={styles.sectionHeader}>

            <Text style={styles.sectionTitle}>{Strings.recentlyAdded}</Text>

            <TouchableOpacity activeOpacity={0.8}>

              <Text style={styles.seeAll}>{Strings.seeAll}</Text>

            </TouchableOpacity>

          </AnimatedCard>



          <View style={styles.grid}>

            {books.map((item, index) => (

              <LibraryResourceCard

                key={item.id}

                item={item}

                onPress={handleOpen}

                animationIndex={index + 5}
              />

            ))}

          </View>



          {books.length === 0 ? (

            <Text style={styles.emptyText}>{Strings.libraryNoResults}</Text>

          ) : null}

        </ScrollEnterScrollView>

      </SafeAreaView>

  );

};

export default withScreenEnter(DigitalLibrary, 'library');



const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: Colors.parentBg,

  },

  scroll: {

    flex: 1,

  },

  content: {

    paddingHorizontal: wp(4),

    paddingTop: hp(1),

    paddingBottom: hp(3),

  },

  filterWrap: {
    marginBottom: hp(1),
    borderRadius: wp(5),
    overflow: 'hidden',
  },

  sectionHeader: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginBottom: hp(1.5),

  },

  sectionTitle: {

    color: Colors.black,

    fontFamily: Fonts.bold,

    fontSize: Fontsize.sm,

  },

  seeAll: {

    color: Colors.linkBlue,

    fontFamily: Fonts.medium,

    fontSize: Fontsize.xs1,

  },

  grid: {

    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',

    marginBottom: hp(2),

  },

  emptyText: {

    color: Colors.grayText,

    fontFamily: Fonts.regular,

    fontSize: Fontsize.xs1,

    textAlign: 'center',

    marginBottom: hp(2),

  },

});


