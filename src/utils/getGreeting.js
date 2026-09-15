import {Strings} from '../Constants/Strings';

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return Strings.goodMorning;
  }
  if (hour < 17) {
    return Strings.goodAfternoon;
  }
  return Strings.goodEvening;
};
