/**
 * WIP - Gestalt like Divider
 * https://github.com/pinterest/gestalt/tree/master/src/Button
 * @flow
 */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import PIColor from '../styles/picolor';

type Props = {
  style?: StyleObj, // React Native only: Should go away eventually
};

export default function Divider(props: Props) {
  return <View style={[styles.divider, props.style]} />;
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: PIColor.pinterestSuperLightGrayColor,
    height: StyleSheet.hairlineWidth,
  },
});
