/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import Mask from '../Mask';

test('Mask matching snapshot', () => {
  const component = renderer.create(
    <Mask>
      <View style={{ height: 100, width: 100 }} />
    </Mask>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
