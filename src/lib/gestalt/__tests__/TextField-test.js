/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
import TextField from '../TextField';

describe('TextField', () => {
  it('TextField normal', () => {
    const tree = create(
      <TextField onChange={jest.fn()} onFocus={jest.fn()} onBlur={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField placeholder', () => {
    const tree = create(
      <TextField
        placeholder={'Placeholder'}
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField value', () => {
    const tree = create(
      <TextField
        value={'Some Value'}
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
