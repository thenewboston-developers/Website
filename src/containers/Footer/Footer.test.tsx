import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import {SocialMedia} from 'types/social-media';
import Footer from '.';

interface Props {
  className?: string;
}

const WrappedComponent = ({className}: Props) => {
  return (
    <Router>
      <Footer className={className} />
    </Router>
  );
};

describe('Footer component', () => {
  test('renders Footer component', () => {
    render(<WrappedComponent />);
    const el = screen.getByTestId('Footer');
    expect(el.className).toContain('Footer');
  });

  test('renders Footer component with custom className CustomFooter', () => {
    render(<WrappedComponent className="CustomFooter" />);
    const el = screen.getByTestId('Footer');
    expect(el.className).toContain('CustomFooter');
  });

  test('renders the tnb logo as link', () => {
    render(<WrappedComponent />);
    const logo = screen.getByAltText('thenewboston logo');
    expect(logo).toBeTruthy();
    expect(logo.parentElement?.getAttribute('href')).toEqual('/');
  });

  test('renders social media links', () => {
    render(<WrappedComponent />);

    const footer = screen.getByTestId('Footer');
    const SocialMediaLinks = footer.querySelectorAll('.Footer__social-media-links > .Footer__SocialMediaLink');
    const SocialMediaValues = Object.keys(SocialMedia);
    expect(SocialMediaLinks.length).toEqual(SocialMediaValues.length);
  });

  test('renders FooterNavLists', () => {
    render(<WrappedComponent />);

    expect(screen.getByText('Get Started')).toBeTruthy();
    expect(screen.getByText('Community')).toBeTruthy();
    expect(screen.getByText('Resources')).toBeTruthy();
    expect(screen.getByText('About')).toBeTruthy();
  });
});
