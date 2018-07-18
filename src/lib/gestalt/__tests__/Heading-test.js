/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
import Heading from '../Heading';

test('Heading small', () => {
  const tree = create(<Heading size="sm" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading medium with text', () => {
  const tree = create(<Heading size="md">Heading</Heading>).toJSON();
  expect(tree).toMatchSnapshot();
});
