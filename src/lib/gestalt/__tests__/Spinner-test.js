/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Spinner from '../Spinner';

test('Spinner visible', () => {
  const component = renderer.create(
    <Spinner accessibilityLabel={'Label Haha'} show />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
