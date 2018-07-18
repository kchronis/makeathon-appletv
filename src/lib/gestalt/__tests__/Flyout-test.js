/* eslint-env jest */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import renderer from 'react-test-renderer';

import Flyout from '../Flyout';
import Text from '../Text';

test('Renders Flyout', () => {
  const component = renderer.create(
    <Flyout visible anchor={<Text>test</Text>} bgColor={'orange'}>
      <Text
        style={{
          color: '#fff',
          fontWeight: 'bold',
        }}
      >
        I'm the content of this popover!
      </Text>
    </Flyout>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
