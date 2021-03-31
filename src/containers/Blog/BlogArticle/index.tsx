import React, {FC, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {A, Icon, IconType} from 'components';
import {useBooleanState} from 'hooks';
import {SocialMedia} from 'types/social-media';
import {getArticleByTitle} from 'utils/data';
import {slugify} from 'utils/urls';

import './BlogArticle.scss';

interface RouteParams {
  slug: string;
}

const BlogArticle: FC = () => {
  const {slug} = useParams<RouteParams>();

  const [socialVisible, toggleSocialVisible] = useBooleanState(false);

  const article = useMemo(() => getArticleByTitle(decodeURIComponent(slugify(slug, '-', ' '))), [slug]);

  const socials = [
    {icon: SocialMedia.linkedin, url: ''},
    {icon: SocialMedia.facebook, url: 'https://www.facebook.com/sharer/sharer.php?u='},
    {icon: SocialMedia.twitter, url: 'https://twitter.com/intent/tweet?url='},
    {icon: SocialMedia.instagram, url: ''},
  ];

  const renderSocialMediaLinks = () =>
    socials.map((media) => (
      <A key={media.icon} href={media.url + window.location.href}>
        <Icon icon={IconType[media.icon]} className="BlogArticle__SocialMediaLink" />
      </A>
    ));

  const renderSocialMediaLinksMobile = () =>
    socials.map((media) => (
      <div key={media.icon} className="BlogArticle__SocialMediaLinkWrapper">
        <A href={media.url + window.location.href}>
          <Icon icon={IconType[media.icon]} className="BlogArticle__SocialMediaLinkMobile" />
        </A>
      </div>
    ));

  return (
    <>
      <div className="BlogArticle">
        <div className="BlogArticle__wrapper">
          <div className="BlogArticle__content">
            <div className="BlogArticle__header">
              <h1 className="BlogArticle__title">{article?.title}</h1>
              <div className="BlogArticle__author-wrapper">
                <div>
                  <img className="BlogArticle__author-avatar" src={article?.author.avatar} alt={article?.author.name} />
                  <p className="BlogArticle__user">by {article?.author.name}</p>
                </div>
                {/* Share btn */}
                <div style={{position: 'relative'}}>
                  <Icon
                    size={25}
                    icon={IconType.shareCircle}
                    className="BlogArticle__SocialMediaShareBtn"
                    onClick={() => toggleSocialVisible()}
                  />
                  <div className={`BlogArticle__social-mobile ${socialVisible && 'visible'}`}>
                    {renderSocialMediaLinksMobile()}
                  </div>
                </div>
              </div>
              <p className="BlogArticle__date">
                {article?.datePosted}
                <span className="BlogArticle__time">{article?.readTime}</span>
              </p>
            </div>
            {!article?.banner ? (
              <div className="BlogArticle__banner" style={{background: '#697386'}} />
            ) : (
              <div className="BlogArticle__banner">
                <img src={article?.banner} alt={article.title} />
              </div>
            )}
            {/* eslint-disable-next-line react/no-danger */}
            <div className="BlogArticle__body" dangerouslySetInnerHTML={{__html: article?.content as string}} />
          </div>
        </div>
      </div>
      <div className="BlogArticle__Socials__wrapper">
        <div className="BlogArticle__Socials">
          <h3>Share to support thenewboston community</h3>
          <div className="BlogArticle__social-icons">{renderSocialMediaLinks()}</div>
        </div>
        <div className="BlogArticle__likes">
          <Icon size={25} icon={IconType.thumbsUp} className="BlogArticle__likes__thumbsUp" />
          <p>1232</p>
        </div>
      </div>
    </>
  );
};

export default BlogArticle;