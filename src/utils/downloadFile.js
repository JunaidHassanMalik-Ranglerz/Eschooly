import {Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

const sanitizeFileName = name =>
  (name || 'file')
    .replace(/[^\w.-]+/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 80);

export const downloadFile = async ({url, fileName, title}) => {
  const safeName = sanitizeFileName(fileName);
  const finalName = safeName.endsWith('.pdf') ? safeName : `${safeName}.pdf`;

  if (Platform.OS === 'android') {
    await ReactNativeBlobUtil.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: title || finalName,
        description: 'Downloading file',
        mime: 'application/pdf',
        mediaScannable: true,
      },
    }).fetch('GET', url);

    return finalName;
  }

  const path = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${finalName}`;
  const res = await ReactNativeBlobUtil.config({fileCache: true, path}).fetch(
    'GET',
    url,
  );

  ReactNativeBlobUtil.ios.previewDocument(res.path());
  return res.path();
};
