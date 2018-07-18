/**
 * Utilities
 * @flow
 */
/* eslint-disable import/prefer-default-export */

import { Dimensions } from 'react-native';

/* eslint no-bitwise: 0 */
export const hashCode = (str: string) => {
  let hash = 15;
  for (let ii = str.length - 1; ii >= 0; ii -= 1) {
    hash = (hash << 5) - hash + str.charCodeAt(ii);
  }
  return hash;
};

export const equalSets = <A>(a: Set<A>, b: Set<A>): boolean => {
  if (a.size !== b.size) return false;
  return Array.from(a).every(el => b.has(el));
};

export const isValidEmail = (str: string) => {
  const EMAIL_REGEX = new RegExp(
    [
      "(^[-!#$%&'*+/=?^_`{}|~0-9A-Z]+(\\.[-!#$%&'*+/=?^_`{}|~0-9A-Z]+)*",
      '|^"([\\001-\\010\\013\\014\\016-\\037!#-\\[\\]-\\177]|\\\\[\\001-\\011\\013\\014\\016-\\177])*"',
      ')@((?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\\.)+[A-Z]{2,20}$)',
      '|\\[(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)(\\.(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)){3}\\]$',
    ].join(''),
    'i'
  );
  if (!str || !str.match(EMAIL_REGEX)) {
    return false;
  }
  return true;
};

export const isValidURL = (str: string) => {
  const URL_REGEX = new RegExp(
    [
      '^(https?:\\/\\/)?', // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|', // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))', // OR ip (v4) address
      '(\\:\\d+)?', // port
      '(\\/[-a-z\\d%@_.~+&:]*)*', // path
      '(\\?[;&a-z\\d%@_.,~+&:=-]*)?', // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    ].join(''),
    'i'
  );
  if (!str || !str.match(URL_REGEX)) {
    return false;
  }
  return true;
};

// Based on PDS specs, we have smaller font sizes for "small phones" (iPhone 4 and 5)
// and similarly sized Android devices.
export const isExtraSmallPhoneDevice = () =>
  Dimensions.get('window').height <= 480;
export const isSmallPhoneDevice = () => Dimensions.get('window').height <= 568;
