import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AnimatedCard from '../../Component/AnimatedCard';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';
import {Colors} from '../../Constants/Colors';
import {MyStyling} from '../../Constants/MyStyling';
import {wp, hp} from '../../Constants/Responsive';

const PdfViewer = () => {
  const route = useRoute();
  const {pdfUrl, title} = route.params || {};
  const [loading, setLoading] = useState(true);

  return (
    <ScreenEnterProvider motion="generic">
      <SafeAreaView style={MyStyling.container2} edges={['top']}>
        <MainHeaderComponent title={title} hideNotification />

        <AnimatedCard index={0} style={styles.viewer}>
          {loading ? (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color={Colors.primary}
            />
          ) : null}

          <Pdf
            source={{uri: pdfUrl, cache: true}}
            style={styles.pdf}
            trustAllCerts={false}
            onLoadComplete={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </AnimatedCard>
      </SafeAreaView>
    </ScreenEnterProvider>
  );
};

export default PdfViewer;

const styles = StyleSheet.create({
  viewer: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  pdf: {
    flex: 1,
    width: wp(100),
    height: hp(100),
  },
  loader: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    zIndex: 2,
  },
});
