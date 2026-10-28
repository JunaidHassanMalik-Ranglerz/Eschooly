import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';
import {getAuthToken} from '../../api/axiosInstance';
import {storage, storageKeys} from '../../utils/storage';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {MyStyling} from '../../Constants/MyStyling';
import {wp, hp} from '../../Constants/Responsive';

const PdfViewer = () => {
  const route = useRoute();
  const {pdfUrl, title} = route.params || {};
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    const prepareSource = async () => {
      if (!pdfUrl) {
        setErrorMessage('Unable to open this file.');
        setLoading(false);
        return;
      }

      const isRemote = /^https?:\/\//i.test(pdfUrl);
      if (!isRemote) {
        if (!cancelled) {
          setSource({uri: pdfUrl, cache: false});
        }
        return;
      }

      let token = getAuthToken();
      if (!token) {
        try {
          token = await storage.getItem(storageKeys.token);
        } catch (error) {
          token = null;
        }
      }

      if (cancelled) {
        return;
      }

      setSource({
        uri: pdfUrl,
        cache: true,
        headers: {
          Accept: 'application/pdf',
          ...(token ? {Authorization: `Bearer ${token}`} : {}),
        },
      });
    };

    prepareSource();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  const failed = Boolean(errorMessage);

  return (
    <ScreenEnterProvider motion="generic">
      <SafeAreaView style={MyStyling.container2} edges={['top']}>
        <MainHeaderComponent title={title} hideNotification />

        <View style={styles.viewer}>
          {loading && !failed ? (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color={Colors.primary}
            />
          ) : null}

          {failed ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : source ? (
            <Pdf
              source={source}
              style={styles.pdf}
              trustAllCerts={false}
              fitPolicy={0}
              spacing={0}
              onLoadComplete={() => setLoading(false)}
              onError={error => {
                const raw = (error && error.message) || '';
                const message = /not in PDF format|corrupted/i.test(raw)
                  ? 'This result card is not a PDF. The server returned a web page instead of a PDF file.'
                  : raw || 'Unable to open this file.';
                setErrorMessage(message);
                setLoading(false);
              }}
            />
          ) : null}
        </View>
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
    backgroundColor: Colors.lightGray,
  },
  loader: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    zIndex: 2,
  },
  error: {
    marginTop: hp(8),
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    paddingHorizontal: wp(8),
  },
});
