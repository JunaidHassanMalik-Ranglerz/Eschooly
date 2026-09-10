import {Platform} from 'react-native';
import RNPrint from 'react-native-print';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {buildIdCardHtml} from './idCardHtml';

export const printIdCard = async data => {
  await RNPrint.print({html: buildIdCardHtml(data)});
};

export const downloadIdCardPdf = async data => {
  const result = await RNPrint.printToFile({html: buildIdCardHtml(data)});
  const fileName = `${data.studentId}.pdf`;

  if (Platform.OS === 'android') {
    const dest = `${ReactNativeBlobUtil.fs.dirs.DownloadDir}/${fileName}`;
    await ReactNativeBlobUtil.fs.cp(result.filePath, dest);
    return dest;
  }

  ReactNativeBlobUtil.ios.previewDocument(result.filePath);
  return result.filePath;
};
