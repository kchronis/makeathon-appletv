/**
 * WIP - Gestalt like Mask
 * https://github.com/pinterest/gestalt/tree/master/src/Mask
 * @flow
 *
 * Component that clips it's content based on the props passed in
 *
 * Please note: This only works on iOS for React Native version < 0.50. Starting
 * with React Native version 0.50 they fixed borderRadius and overflow: 'hidden'
 * on Android. Before there are other ways to archive the same effect. Therefore
 * look into the documentation page: documentation/clipping-content.md
 */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import type { LayoutEvent } from './CoreEventTypes';

type Props = {|
  children?: React.Node,
  height?: number,
  width?: number,
  shape?: 'circle' | 'rounded' | 'square',
  borderRadius?: number,
  wash?: boolean,
|};

type State = {
  width?: number,
  height?: number,
};

export default class Mask extends React.Component<Props, State> {
  static defaultProps = {
    shape: 'square',
    borderRadius: 8,
  };

  state = {};

  _onLayout = (event: LayoutEvent) => {
    // Only need for re-render if circle
    if (this.props.shape !== 'circle') {
      return;
    }

    // If the new layout was fetched set the width and height what will
    // trigger a re-render and we can adjust the border radius
    const { width, height } = event.nativeEvent.layout;
    this.setState({ width, height });
  };

  render() {
    const { children, width, height, shape, borderRadius, wash } = this.props;

    // Per default let's assume width and height is given
    const additionalStyles: Array<Object> = [{ width, height }];

    switch (shape) {
      case 'circle': {
        // - For 'circle' if no width or height is given we have to wait for the
        // layout callback to set the width and height state to be able to
        // calculcate the final size as well as border radius dynamically
        const stateWidth = this.state.width;
        const stateHeight = this.state.height;
        if (stateWidth && stateHeight) {
          // If the state width and height is availabe  use this to calculate
          // the border radius for a circle
          additionalStyles.push({
            borderRadius: Math.max(stateWidth, stateHeight) / 2.0,
          });

          // If state width and height is available also use this as width and
          // height
          additionalStyles.push({ width: stateWidth, height: stateHeight });
        } else {
          // If no state width and height is calculated yet or width and height
          // is already given use that for calculating the border radius
          additionalStyles.push({
            borderRadius: Math.max(width || 0, height || 0) / 2.0,
          });
        }
        break;
      }
      case 'rounded': {
        // For 'rounded' the default border radius is: 8
        additionalStyles.push({ borderRadius });
        break;
      }
      case 'square': {
        // We don't have to do anything in here as the borderRadius by default
        // is already 0
        break;
      }
      default: {
        throw new Error('Mask: Passed in sharep prop is not supported.');
      }
    }

    return (
      <View
        onLayout={this._onLayout}
        style={[styles.mask, ...additionalStyles]}
      >
        {children}
        {wash ? <View style={styles.wash} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mask: {
    borderRadius: 0,
    overflow: 'hidden',
  },
  wash: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
});
