import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import LibraryProfileCard from '../../Component/DigitalLibrary/LibraryProfileCard';
import LibrarySearchBar from '../../Component/DigitalLibrary/LibrarySearchBar';
import LibraryCategoryFilter from '../../Component/DigitalLibrary/LibraryCategoryFilter';
import LibraryResourceCard from '../../Component/DigitalLibrary/LibraryResourceCard';
import ClassCategoryCard from '../../Component/DigitalLibrary/ClassCategoryCard';
import {useProfileStudent} from '../../hooks/useProfileStudent';
import {
  LIBRARY_CATEGORIES,
  LIBRARY_CLASS_CATEGORIES,
  LIBRARY_RESOURCES,
  getFilteredResources,
} from '../../Constants/DigitalLibraryData';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {MyStyling} from '../../Constants/MyStyling';
import {wp, hp} from '../../Constants/Responsive';
import {downloadFile} from '../../utils/downloadFile';

const DigitalLibrary = () => {
  const navigation = useNavigation();
  const {student} = useProfileStudent();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const books = getFilteredResources(LIBRARY_RESOURCES, search, category);

  const handleOpen = item => {
    if (!item.pdfUrl) {
      return;
    }
    navigation.navigate('PdfViewer', {
      pdfUrl: item.pdfUrl,
      title: item.title,
    });
  };

  const handleDownload = async item => {
    if (!item.pdfUrl) {
      return;
    }

    try {
      await downloadFile({
        url: item.pdfUrl,
        fileName: item.title,
        title: item.title,
      });
    } catch (error) {}
  };

  return (
    <SafeAreaView style={MyStyling.container2} edges={['top']}>
      <MainHeaderComponent
        title={Strings.digitalLibrary}
        notificationCount={1}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <LibraryProfileCard student={{...student, status: 'Active'}} />

        <LibrarySearchBar
          value={search}
          onChangeText={setSearch}
          placeholder={Strings.librarySearchPlaceholder}
        />

        <LibraryCategoryFilter
          categories={LIBRARY_CATEGORIES}
          selected={category}
          onSelect={setCategory}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{Strings.recentlyAdded}</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.seeAll}>{Strings.seeAll}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {books.map(item => (
            <LibraryResourceCard
              key={item.id}
              item={item}
              onPress={handleOpen}
              onDownload={handleDownload}
            />
          ))}
        </View>

        {books.length === 0 ? (
          <Text style={styles.emptyText}>{Strings.libraryNoResults}</Text>
        ) : null}

        <Text style={[styles.sectionTitle, styles.classTitle]}>
          {Strings.classWiseCategories}
        </Text>

        {LIBRARY_CLASS_CATEGORIES.map(item => (
          <ClassCategoryCard
            key={item.id}
            item={item}
            onPress={() => {}}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DigitalLibrary;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(3),
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
  classTitle: {
    marginBottom: hp(1.5),
  },
  emptyText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
    marginBottom: hp(2),
  },
});
