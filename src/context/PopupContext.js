import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import AppPopup from '../Component/AppPopup';

const PopupContext = createContext(null);

export const PopupProvider = ({children}) => {
  const [popup, setPopup] = useState({
    visible: false,
    title: '',
    message: '',
  });

  const hidePopup = useCallback(() => {
    setPopup(prev => ({...prev, visible: false}));
  }, []);

  const showPopup = useCallback((title, message = '') => {
    setPopup({
      visible: true,
      title: title || '',
      message: message || '',
    });
  }, []);

  const value = useMemo(
    () => ({showPopup, hidePopup}),
    [showPopup, hidePopup],
  );

  return (
    <PopupContext.Provider value={value}>
      {children}
      <AppPopup
        visible={popup.visible}
        title={popup.title}
        message={popup.message}
        onClose={hidePopup}
      />
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within PopupProvider');
  }
  return context;
};
