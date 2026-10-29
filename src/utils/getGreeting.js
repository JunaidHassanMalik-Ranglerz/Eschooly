import {useCallback, useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Strings} from '../Constants/Strings';

const greetingForHour = hour => {
  if (hour < 12) {
    return Strings.goodMorning;
  }
  if (hour < 17) {
    return Strings.goodAfternoon;
  }
  return Strings.goodEvening;
};

const deviceTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || undefined;
  } catch (error) {
    return undefined;
  }
};

/** Hour 0–23 in the phone's current timezone, not UTC. */
export const getDeviceLocalHour = (now = new Date()) => {
  const timeZone = deviceTimeZone();
  if (timeZone) {
    try {
      const hourText = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: 'numeric',
        hourCycle: 'h23',
      })
        .formatToParts(now)
        .find(part => part.type === 'hour')?.value;
      const hour = Number(hourText);
      if (Number.isFinite(hour)) {
        return hour === 24 ? 0 : hour;
      }
    } catch (error) {
      // Older runtimes without timezone data fall back to Date local hours.
    }
  }
  return now.getHours();
};

export const getGreeting = (now = new Date()) =>
  greetingForHour(getDeviceLocalHour(now));

export const useGreeting = () => {
  const [greeting, setGreeting] = useState(getGreeting);

  const refresh = useCallback(() => {
    setGreeting(getGreeting());
  }, []);

  useEffect(() => {
    refresh();
    const sub = AppState.addEventListener('change', state => {
      if (state === 'active') {
        refresh();
      }
    });
    const timer = setInterval(refresh, 60 * 1000);
    return () => {
      sub.remove();
      clearInterval(timer);
    };
  }, [refresh]);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  return greeting;
};
