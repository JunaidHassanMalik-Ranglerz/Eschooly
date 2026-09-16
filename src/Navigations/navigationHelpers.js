export const navigateToNotification = navigation => {
  navigation.navigate('Notification');
};

export const navigateToChat = (navigation, params) => {
  const state = navigation.getState?.();
  const routeNames = state?.routeNames || [];

  if (routeNames.includes('Chat')) {
    navigation.navigate('Chat', params);
    return;
  }

  if (routeNames.includes('BottomTab')) {
    navigation.navigate('BottomTab', {
      screen: 'Chat',
      params,
    });
    return;
  }

  const parent = navigation.getParent();
  if (parent) {
    navigateToChat(parent, params);
    return;
  }

  navigation.navigate('Chat', params);
};

