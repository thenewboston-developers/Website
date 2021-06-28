import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import FooterNavList, {FooterNavListProps} from './index';

const TestLinks = [
  {
    title: 'TestLink',
    url: '/testlink',
  },
  {
    isExternal: true,
    title: 'External TestLink',
    url: '/externalTestLink',
  },
];

const WrappedComponent = ({header, links}: FooterNavListProps) => {
  return (
    <Router>
      <FooterNavList header={header} links={links} />
    </Router>
  );
};

describe('FooterNavList component', () => {
  beforeEach(() => {
    render(<WrappedComponent header={'Test'} links={TestLinks} />);
  });

  test('renders FooterNavList component and query with className', () => {
    const footerNavList = screen.getByTestId('FooterNavList');
    expect(footerNavList.className).toContain('FooterNavList');
  });

  test('renders FooterNavList component with Header test', () => {
    const header = screen.getByText('Test');
    expect(header).toBeTruthy();
  });

  describe('check for FooterNavList', () => {
    test('internal link properties', () => {
      const link = screen.getByText(TestLinks[0].title);

      expect(link).toBeTruthy();
      expect(link.getAttribute('href')).toEqual(TestLinks[0].url);
    });

    test('external link properties', () => {
      const link = screen.getByText(TestLinks[1].title);

      expect(link).toBeTruthy();
      expect(link.getAttribute('href')).toEqual(TestLinks[1].url);
      expect(link.getAttribute('target')).toEqual('_self');
    });
  });
});
