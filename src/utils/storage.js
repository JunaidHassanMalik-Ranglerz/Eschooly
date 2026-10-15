import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
  token: '@eschooly/token',
  role: '@eschooly/role',
  user: '@eschooly/user',
};

const sessionKeys = [storageKeys.token, storageKeys.role, storageKeys.user];

export const storage = {
  getItem(key) {
    return AsyncStorage.getItem(key);
  },
  setItem(key, value) {
    return AsyncStorage.setItem(key, value);
  },
  removeItem(key) {
    return AsyncStorage.removeItem(key);
  },
  async getSession() {
    const entries = await AsyncStorage.multiGet(sessionKeys);
    return Object.fromEntries(entries);
  },
  async saveSession({token, role, user} = {}) {
    const pairs = [];
    const removals = [];

    if (token) {
      pairs.push([storageKeys.token, String(token)]);
    } else {
      removals.push(storageKeys.token);
    }

    if (role) {
      pairs.push([storageKeys.role, String(role)]);
    } else {
      removals.push(storageKeys.role);
    }

    if (user) {
      pairs.push([storageKeys.user, JSON.stringify(user)]);
    } else {
      removals.push(storageKeys.user);
    }

    if (pairs.length) {
      await AsyncStorage.multiSet(pairs);
    }
    if (removals.length) {
      await AsyncStorage.multiRemove(removals);
    }
  },
  clearSession() {
    return AsyncStorage.multiRemove(sessionKeys);
  },
};
