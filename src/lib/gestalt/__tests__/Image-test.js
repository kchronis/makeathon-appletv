/* eslint-env jest */

import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';

import Image from '../Image';

test('Image matches snapshot', () => {
  const component = renderer.create(<Image src="foo.png" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Image local matches snapshot', () => {
  /* eslint-disable global-require */
  const component = renderer.create(
    <View>
      <Image local src={require('./img/img1.png')} />
      <Image local src={require('./img/img2.png')} />
    </View>
  );
  /* eslint-enable global-require */
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
