import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FlatNavLinks, {FlatNavLinksProps} from './index';

describe('FlatNavLinks component', () => {
  let handleOptionClick: jest.Mock;
  let props: FlatNavLinksProps;

  beforeEach(() => {
    handleOptionClick = jest.fn();
    props = {
      handleOptionClick,
      options: [
        {pathname: '/test1', title: 'Test 1'},
        {pathname: '/test2', title: 'Test 2'},
      ],
      selectedOption: '/test1',
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    render(<FlatNavLinks {...props} />);

    expect(screen.getByTestId('FlatNavLinks')).toBeTruthy();
  });

  it('renders all the options passed in', () => {
    render(<FlatNavLinks {...props} />);

    const elements = screen.getAllByRole('button');

    expect(elements.length).toBe(props.options.length);
  });

  it('renders with default className', () => {
    render(<FlatNavLinks {...props} />);

    const parent = screen.getByTestId('FlatNavLinks');
    const child = screen.getAllByRole('button')[0];

    expect(parent).toHaveClass('FlatNavLinks');
    expect(child).toHaveClass('FlatNavLinks__option');
  });

  it('renders with className passed in', () => {
    render(<FlatNavLinks {...props} className="test" />);

    const parent = screen.getByTestId('FlatNavLinks');
    const child = screen.getAllByRole('button')[0];

    expect(parent).toHaveClass('test');
    expect(child).toHaveClass('test__option');
  });

  it('renders with --active in default className when selectedOption passed in', () => {
    render(<FlatNavLinks {...props} />);

    const child = screen.getAllByRole('button')[0];

    expect(child).toHaveClass('FlatNavLinks__option--active');
  });

  it('renders with --active in className passed in when selectedOption passed in', () => {
    render(<FlatNavLinks {...props} className="test" />);

    const child = screen.getAllByRole('button')[0];

    expect(child).toHaveClass('test__option--active');
  });

  it('renders options with title passed in', () => {
    render(<FlatNavLinks {...props} />);

    const elements = screen.getAllByRole('button');

    expect(elements[0].textContent).toBe(props.options[0].title);
    expect(elements[1].textContent).toBe(props.options[1].title);
  });

  it('triggers handleOptionClick when an option is clicked', () => {
    render(<FlatNavLinks {...props} />);

    const child = screen.getAllByRole('button')[0];

    child.click();
    expect(handleOptionClick).toHaveBeenCalled();
  });
});
