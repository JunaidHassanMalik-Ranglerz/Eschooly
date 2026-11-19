import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Platform, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import {WebView} from 'react-native-webview';
import ReactNativeBlobUtil from 'react-native-blob-util';
import RNPrint from 'react-native-print';
import {showToast} from '../../utils/toast';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';
import {API_BASE_URL, getAuthToken} from '../../api/axiosInstance';
import {storage, storageKeys} from '../../utils/storage';
import {
  classifyFetchedDocument,
  jsonDocumentMessage,
} from '../../utils/documentResponse';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {MyStyling} from '../../Constants/MyStyling';
import {wp, hp} from '../../Constants/Responsive';

const WEB_BASE_URL = `${API_BASE_URL.replace(/\/api\/?$/, '')}/`;

const HTML_VIEWPORT =
  '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">';

const withViewport = html => {
  const extra = [
    /name=["']viewport["']/i.test(html) ? '' : HTML_VIEWPORT,
    /<base\s/i.test(html) ? '' : `<base href="${WEB_BASE_URL}">`,
  ].join('');
  if (!extra) {
    return html;
  }
  return /<head[^>]*>/i.test(html)
    ? html.replace(/<head[^>]*>/i, match => `${match}${extra}`)
    : `${extra}${html}`;
};

const localFilePath = uri => {
  const value = String(uri || '');
  if (!value) {
    return '';
  }
  return value.startsWith('file://') ? value.replace(/^file:\/\//, '') : value;
};

const readToken = async () => {
  let token = getAuthToken();
  if (!token) {
    try {
      token = await storage.getItem(storageKeys.token);
    } catch (error) {
      token = null;
    }
  }
  return token;
};

const PdfViewer = () => {
  const route = useRoute();
  const {pdfUrl, title} = route.params || {};
  const [source, setSource] = useState(null);
  const [html, setHtml] = useState('');
  const [pdfPath, setPdfPath] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    const prepareSource = async () => {
      setHtml('');
      setSource(null);
      setPdfPath('');
      setErrorMessage('');
      setLoading(true);

      if (!pdfUrl) {
        setErrorMessage('Unable to open this file.');
        setLoading(false);
        return;
      }

      const openClassified = ({kind, body, path, status = 200}) => {
        if (status >= 400) {
          throw new Error(
            kind === 'json'
              ? jsonDocumentMessage(body) || 'Unable to open this file.'
              : 'Unable to open this file.',
          );
        }
        if (kind === 'pdf') {
          setPdfPath(path);
          setSource({uri: `file://${path}`, cache: false});
          return;
        }
        if (kind === 'json') {
          throw new Error(jsonDocumentMessage(body) || 'Unable to open this file.');
        }
        if (kind !== 'html') {
          throw new Error('Unable to open this file.');
        }
        setHtml(withViewport(body));
      };

      try {
        if (!/^https?:\/\//i.test(pdfUrl)) {
          const path = localFilePath(pdfUrl);
          const body = await ReactNativeBlobUtil.fs.readFile(path, 'utf8');
          if (cancelled) {
            return;
          }
          openClassified({
            kind: classifyFetchedDocument({bodyPreview: body}).kind,
            body,
            path,
          });
          return;
        }

        const token = await readToken();
        const response = await ReactNativeBlobUtil.config({
          fileCache: true,
        }).fetch('GET', pdfUrl, {
          Accept: 'application/pdf, text/html, application/json',
          ...(token ? {Authorization: `Bearer ${token}`} : {}),
        });
        const cachedPath = response.path();
        const info = response.info();
        const type = String(
          info.headers?.['Content-Type'] || info.headers?.['content-type'] || '',
        ).toLowerCase();

        const body = await ReactNativeBlobUtil.fs.readFile(cachedPath, 'utf8');
        if (cancelled) {
          return;
        }
        openClassified({
          kind: classifyFetchedDocument({
            contentType: type,
            bodyPreview: body,
          }).kind,
          body,
          path: cachedPath,
          status: info.status,
        });
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error?.message || 'Unable to open this file.');
          setLoading(false);
        }
      }
    };

    prepareSource();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  const failed = Boolean(errorMessage);
  const canSave = Boolean(html || pdfPath) && !failed;
  const fileBase = String(title || 'document').replace(/[^\w.-]+/g, '_') || 'document';

  const savePdfFile = async () => {
    const fileName = `${fileBase}-${Date.now()}.pdf`;
    if (Platform.OS === 'android') {
      try {
        await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
          {name: fileName, parentFolder: '', mimeType: 'application/pdf'},
          'Download',
          pdfPath,
        );
      } catch (error) {
        const downloadDir = ReactNativeBlobUtil.fs.dirs.DownloadDir;
        if (!downloadDir) {
          throw error;
        }
        await ReactNativeBlobUtil.fs.cp(pdfPath, `${downloadDir}/${fileName}`);
      }
      showToast({type: 'success', text1: 'Saved to Downloads.'});
      return;
    }
    const target = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;
    await ReactNativeBlobUtil.fs.cp(pdfPath, target);
    await ReactNativeBlobUtil.ios.presentOptionsMenu(target);
  };

  const saveHtmlFile = async () => {
    const fileName = `${fileBase}-${Date.now()}.html`;
    if (Platform.OS === 'android') {
      const tempPath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${fileName}`;
      await ReactNativeBlobUtil.fs.writeFile(tempPath, html, 'utf8');
      try {
        await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
          {name: fileName, parentFolder: '', mimeType: 'text/html'},
          'Download',
          tempPath,
        );
      } catch (error) {
        const downloadDir = ReactNativeBlobUtil.fs.dirs.DownloadDir;
        if (!downloadDir) {
          throw error;
        }
        await ReactNativeBlobUtil.fs.cp(tempPath, `${downloadDir}/${fileName}`);
      }
      showToast({type: 'success', text1: 'Saved to Downloads.'});
      return;
    }
    const target = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;
    await ReactNativeBlobUtil.fs.writeFile(target, html, 'utf8');
    await ReactNativeBlobUtil.ios.presentOptionsMenu(target);
  };

  const handleSave = async () => {
    if (!canSave || saving) {
      return;
    }
    setSaving(true);
    try {
      if (pdfPath && !html) {
        await savePdfFile();
        return;
      }
      try {
        await saveHtmlFile();
      } catch (error) {
        await RNPrint.print({html, jobName: fileBase});
      }
    } catch (error) {
      showToast({
        type: 'error',
        text1: error?.message || 'Unable to save this file.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScreenEnterProvider motion="generic">
      <SafeAreaView style={MyStyling.container2} edges={['top']}>
        <MainHeaderComponent
          title={title}
          hideNotification
          rightIcon={canSave ? 'download-outline' : undefined}
          onRightPress={canSave ? handleSave : undefined}
        />

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
          ) : html ? (
            <WebView
              style={styles.pdf}
              originWhitelist={['*']}
              source={{html, baseUrl: WEB_BASE_URL}}
              scalesPageToFit
              setBuiltInZoomControls
              setDisplayZoomControls={false}
              onLoadEnd={() => setLoading(false)}
              onError={() => {
                setErrorMessage('Unable to open this file.');
                setLoading(false);
              }}
            />
          ) : source ? (
            <Pdf
              source={source}
              style={styles.pdf}
              trustAllCerts={false}
              fitPolicy={0}
              onLoadComplete={() => setLoading(false)}
              onError={error => {
                setErrorMessage(
                  (error && error.message) || 'Unable to open this file.',
                );
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
