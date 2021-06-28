import React, {FC} from 'react';

import {A} from 'components';
import {Link} from 'react-router-dom';

import './FooterNavList.scss';

interface NavLink {
  isExternal?: boolean;
  title: string;
  url: string;
}

export interface FooterNavListProps {
  header: string;
  links: NavLink[];
}

const FooterNavList: FC<FooterNavListProps> = ({header, links}) => {
  return (
    <ul className="FooterNavList" data-testid="FooterNavList">
      <li className="FooterNavList__header">{header}</li>
      {links.map((link) => (
        <li className="FooterNavList__item" key={link.title}>
          {link.isExternal ? (
            <A className="FooterNavList__item-link" href={link.url} newWindow={false}>
              {link.title}
            </A>
          ) : (
            <Link className="FooterNavList__item-link" to={link.url}>
              {link.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FooterNavList;
