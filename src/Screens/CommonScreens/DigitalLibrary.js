import React, {useEffect, useMemo, useState} from 'react';

import {ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../utils/toast';
import {fetchChildLibrary, fetchParentHome} from '../../store/slices/parentHomeSlice';

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
  const dispatch = useDispatch();

  const {activeStudent, libraryResources, isParent} = useRoleData();
  const {selectedChildId: homeChildId, children} = useSelector(state => state.parentHome);
  const [parentLibrary, setParentLibrary] = useState(null);
  const [loading, setLoading] = useState(isParent);

  const [search, setSearch] = useState('');

  const [category, setCategory] = useState('all');

  const activeChildId = homeChildId || children[0]?.value || null;
  const parentChild =
    parentLibrary?.child?.label
      ? parentLibrary.child
      : children.find(item => item.value === String(activeChildId)) || null;
  const resources = isParent ? parentLibrary?.items || [] : libraryResources;
  const profileStudent = isParent
    ? {...parentChild, status: parentChild?.status || 'Active'}
    : {...activeStudent, status: 'Active'};

  useEffect(() => {
    if (!isParent || homeChildId || children.length) {
      return undefined;
    }
    dispatch(fetchParentHome());
  }, [children.length, dispatch, homeChildId, isParent]);

  useEffect(() => {
    if (!isParent || !activeChildId) {
      return undefined;
    }
    let active = true;
    setLoading(true);
    dispatch(fetchChildLibrary(activeChildId))
      .unwrap()
      .then(payload => {
        if (active) {
          setParentLibrary(payload);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setParentLibrary(null);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load library.',
        });
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [activeChildId, dispatch, isParent]);

  const categories = useMemo(() => {
    const known = new Set(LIBRARY_CATEGORIES.map(item => item.id));
    const extra = resources
      .map(item => item.category)
      .filter(id => id && id !== 'all' && !known.has(id))
      .filter((id, index, list) => list.indexOf(id) === index)
      .map(id => ({
        id,
        label: id.charAt(0).toUpperCase() + id.slice(1),
      }));
    return [...LIBRARY_CATEGORIES, ...extra];
  }, [resources]);

  const books = getFilteredResources(resources, search, category);



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
            student={profileStudent}
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

              categories={categories}

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



          {isParent && loading ? (
            <ActivityIndicator style={styles.loader} size="large" color={Colors.primary} />
          ) : null}

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



          {!loading && books.length === 0 ? (

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

  loader: {
    marginVertical: hp(3),
  },

  emptyText: {

    color: Colors.grayText,

    fontFamily: Fonts.regular,

    fontSize: Fontsize.xs1,

    textAlign: 'center',

    marginBottom: hp(2),

  },

});


