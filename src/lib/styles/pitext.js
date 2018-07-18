/**
 * PIText
 * Text attributes defined by Pinterest
 *
 * http://design.pinadmin.com/pds/#measurement
 *
 * @flow
 */
import { Platform } from 'react-native';

// We have to differentiate between ios and android as the custom font file
// has a different name. Unfortunately Android does not support an uppercase name.
const PITextFont = (Platform.select({
  ios: 'HelveticaNeue',
  android: 'helvetica_neue',
}): string);
const PITextBoldFont = (Platform.select({
  ios: 'HelveticaNeue-Bold',
  android: 'helvetica_neue_bold',
}): string);

// For now we don't support italic font as there is no italic font on android
// available yet
// const PITextItalicFont = 'HelveticaNeueItalic';

// Small phone font sizes
const PITextSmallPhoneExtraSmallFontSize = 10.0;
const PITextSmallPhoneSmallFontSize = 11.0;
const PITextSmallPhoneMediumFontSize = 12.0;
const PITextSmallPhoneLargeFontSize = 14.0;
const PITextSmallPhoneExtraLargeFontSize = 16.0;

const PIDisplaySmallPhoneExtraSmallFontSize = 18;
const PIDisplaySmallPhoneSmallFontSize = 21;
const PIDisplaySmallPhoneMediumFontSize = 24;
const PIDisplaySmallPhoneLargeFontSize = 36;
const PIDisplaySmallPhoneExtraLargeFontSize = 48;

const PITextExtraSmallFontSize = 11.0;
const PITextSmallFontSize = 12.0;
const PITextMediumFontSize = 14.0;
const PITextLargeFontSize = 16.0;
const PITextExtraLargeFontSize = 18.0;

const PIDisplayExtraSmallFontSize = 21;
const PIDisplaySmallFontSize = 24;
const PIDisplayMediumFontSize = 36;
const PIDisplayLargeFontSize = 48;
const PIDisplayExtraLargeFontSize = 64;

const PITextNormalFontWeight = 'normal';
const PITextItalicFontWeight = 'italic';
const PITextBoldFontWeight = 'bold';

const PIText = {
  defaultFont: PITextFont,
  boldFont: PITextBoldFont,
  // For now we don't support italic font see comment above
  // italicFont: PITextItalicFont,

  // Font sizes for small phones
  textSmallPhoneExtraSmallFontSize: PITextSmallPhoneExtraSmallFontSize,
  textSmallPhoneSmallFontSize: PITextSmallPhoneSmallFontSize,
  textSmallPhoneMediumFontSize: PITextSmallPhoneMediumFontSize,
  textSmallPhoneLargeFontSize: PITextSmallPhoneLargeFontSize,
  textSmallPhoneExtraLargeFontSize: PITextSmallPhoneExtraLargeFontSize,

  displaySmallPhoneExtraSmallFontSize: PIDisplaySmallPhoneExtraSmallFontSize,
  displaySmallPhoneSmallFontSize: PIDisplaySmallPhoneSmallFontSize,
  displaySmallPhoneMediumFontSize: PIDisplaySmallPhoneMediumFontSize,
  displaySmallPhoneLargeFontSize: PIDisplaySmallPhoneLargeFontSize,
  displaySmallPhoneExtraLargeFontSize: PIDisplaySmallPhoneExtraLargeFontSize,

  textExtraSmallFontSize: PITextExtraSmallFontSize,
  textSmallFontSize: PITextSmallFontSize,
  textMediumFontSize: PITextMediumFontSize,
  textLargeFontSize: PITextLargeFontSize,
  textExtraLargeFontSize: PITextExtraLargeFontSize,

  displayExtraSmallFontSize: PIDisplayExtraSmallFontSize,
  displaySmallFontSize: PIDisplaySmallFontSize,
  displayMediumFontSize: PIDisplayMediumFontSize,
  displayLargeFontSize: PIDisplayLargeFontSize,
  displayExtraLargeFontSize: PIDisplayExtraLargeFontSize,

  defaultFontWeight: PITextNormalFontWeight,
  italicFontWeight: PITextItalicFontWeight,
  boldFontWeight: PITextBoldFontWeight,
};

export default PIText;
