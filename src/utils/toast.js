import Toast from 'react-native-toast-message';

export const showToast = ({type = 'info', text1, text2} = {}) => {
  Toast.show({
    type,
    text1,
    text2,
  });
};

export const hideToast = () => {
  Toast.hide();
};
