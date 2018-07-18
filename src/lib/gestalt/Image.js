/**
 * WIP - Gestalt like Image
 * https://github.com/pinterest/gestalt/tree/master/src/Image
 * @flow
 */

import * as React from 'react';
import { View, Image as ReactImage } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Text from './Text';
import RemoteImageView from '../../lib/react-native-remote-image-view';

import PIColor from '../styles/picolor';

const resolveAssetSource = require('resolveAssetSource');

type Props = {|
  // alt: string,
  children?: React.Node,
  color: string,
  // fit: 'contain' | 'cover' | 'none', // Not supported in React Native
  // naturalHeight: number,             // Not supported in React Native
  // naturalWidth: number,              // Not supported in React Native
  local: boolean, // Only available in React Native
  onError?: () => void,
  onLoad?: () => void,
  // sizes?: string,                    // Not supported in React Native
  src: string,
  // srcSet?: string,                   // Not supported in React Native

  style?: StyleObj, // React Native only: Should go away eventually
|};

export default class Image extends React.PureComponent<Props> {
  static defaultProps = {
    color: 'transparent',
    local: false,
  };
  render() {
    const { color, children, local, onLoad, onError, src, style } = this.props;
    const imageStyle = [
      {
        // Let the container component define the width and height by default
        width: '100%',
        height: '100%',
      },
      style,
    ];
    const childContent = children ? (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          overflow: 'hidden',
        }}
      >
        {children}
      </View>
    ) : null;
    return (
      <View
        style={[
          {
            position: 'relative',
            backgroundColor: color,
          },
        ]}
      >
        {local ? (
          <ReactImage
            style={imageStyle}
            source={src}
            onLoad={onLoad}
            onError={onError}
          />
        ) : (
          <RemoteImageView
            style={imageStyle}
            imageURL={src}
            onLoad={onLoad}
            onError={onError}
          />
        )}

        {childContent}
      </View>
    );
  }
}

// Playground support

// eslint-disable-next-line import/first
import { type PlaygroundDefineType } from '../../screens/Playground/Playground';

module.exports.__cards__ = (define: PlaygroundDefineType) => {
  define('Load Remote Image', () => (
    <View
      style={{
        backgroundColor: PIColor.primaryBackgroundColor,
        flex: 1,
        justifyContent: 'center',
        padding: 10,
      }}
    >
      <Text style={{ paddingBottom: 5 }}>Remote Image:</Text>
      <Image
        src={
          'https://i.pinimg.com/736x/92/fd/59/92fd59efefc446c7e858ebd16c53feba--pinterest-logo-png-pinterest-board.jpg'
        }
        // A size needs to be given or the container needs to provide one
        style={{ width: 100, height: 100, alignSelf: 'center' }}
      />
    </View>
  ));

  define('Local Image', () => {
    // Example to resolve the size of a local image
    // eslint-disable-next-line global-require
    const localImage = require('../../screens/Playground/images/pinterest_logo.jpg');
    const localImageSource = resolveAssetSource(localImage);
    return (
      <View
        style={{
          backgroundColor: PIColor.primaryBackgroundColor,
          flex: 1,
          justifyContent: 'center',
          padding: 10,
        }}
      >
        <Text style={{ paddingBottom: 5 }}>Local Image:</Text>
        {/* $FlowFixMe: Until flow 0.53 exact prop types in same
    file is not supported */}
        <Image
          local
          src={localImage}
          style={{
            width: localImageSource ? localImageSource.width : 100,
            height: localImageSource ? localImageSource.height : 100,
            alignSelf: 'center',
          }}
        />
      </View>
    );
  });
};
