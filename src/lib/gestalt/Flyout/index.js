/**
 * WIP - Gestalt like Flyout
 * https://github.com/pinterest/gestalt/tree/master/src/Flyout
 * @flow
 */

import * as React from 'react';
// eslint-disable-next-line import/no-duplicates
import { View } from 'react-native';
import FlyoutContent from './FlyoutContent';

import type { Rect } from './Utility';
import { gestaltColorToColor } from '../../styles/picolor';

type Props = {|
  visible: boolean, // The visible prop determines whether your Flyout is visible
  anchor: ?React.ElementRef<typeof React.Component>, // Ref for the element that the Flyout will attach to
  fromRect: ?Rect, // Rect that the FlyoutContent will attach to. This is supposed to go away eventually though
  bgColor: 'darkGray' | 'white' | 'orange', // Background color of Flyout
  children?: any, // Children rendered in the Flyout
  idealDirection: 'top' | 'right' | 'bottom' | 'left' | 'auto', // Preferred direction for the Flyout to open
  // onDismiss: () => void, // Not available on React Native. Use your own TouchableWithoutFeedback
  // positionRelativeToAnchor?: boolean, // Not available on RN

  // TODO: Add support for different sizes
  // size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl', // Widths for the flyout
|};

// const SIZE_WIDTH_MAP = {
//   xs: 185,
//   sm: 230,
//   md: 284,
//   lg: 320,
//   xl: 375,
// };

type State = {};

export default class Flyout extends React.Component<Props, State> {
  static defaultProps = {
    anchor: null,
    fromRect: null,
    bgColor: 'white',
    idealDirection: 'auto',
    // size: 'sm',
  };

  _renderComponent = () => {
    // Calculate the style for the Flyout
    const { bgColor } = this.props;
    const containerStyle = {
      backgroundColor: gestaltColorToColor[bgColor],
      padding: 8,
      borderRadius: 5,
    };
    return <View style={containerStyle}>{this.props.children}</View>;
  };

  render() {
    const { anchor, fromRect, bgColor, idealDirection, visible } = this.props;
    return visible ? (
      <FlyoutContent
        fromView={anchor}
        fromRect={fromRect}
        padding={10}
        placement={idealDirection}
        arrowColor={gestaltColorToColor[bgColor]}
        arrowWidth={16}
        arrowHeight={8}
        component={this._renderComponent}
      />
    ) : null;
  }
}

// Playground support
/* eslint-disable import/first, import/no-duplicates, no-return-assign, react/no-unescaped-entities */
import { Text } from 'react-native';
import Button from './../Button';

// eslint-disable-next-line import/first
import { type PlaygroundDefineType } from '../../../screens/Playground/Playground';

let ref = null;

module.exports.__cards__ = (define: PlaygroundDefineType) => {
  define(
    'Flyover Default',
    (state = { visible: false }, update: mixed => void) => (
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          paddingBottom: 50,
        }}
      >
        <Button
          text="Show Flyover"
          color={'red'}
          ref={view => (ref = view)}
          onPress={() => {
            update({ visible: !state.visible });
          }}
        />
        <Flyout visible={state.visible} anchor={ref} bgColor={'orange'}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            I'm the content of this popover!
          </Text>
        </Flyout>
      </View>
    )
  );
};
