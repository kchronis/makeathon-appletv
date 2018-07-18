/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Text from '../Text';

test('Text matching snapshot', () => {
  const component = renderer.create(<Text>Some default text</Text>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text matching snapshot md and red', () => {
  const component = renderer.create(
    <Text size={'md'} color={'red'}>
      Some default text
    </Text>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
