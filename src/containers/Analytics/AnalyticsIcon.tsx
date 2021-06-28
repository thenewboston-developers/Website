import React, {FC} from 'react';

const AnalyticsIcon: FC = () => {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <rect x="3" y="3" width="32" height="32" rx="6" fill="white" />
      </g>
      <path
        opacity="0.23"
        d="M13.5031 17.8979C14.7188 15.7737 17.9277 14.8614 20.4419 15.0169C21.1284 15.0594 22.5096 15.1449 23.5881 15.9073C25.6593 17.3715 25.3403 20.432 23.3576 22.2339C23.1023 22.4659 21.335 24.0206 18.5809 23.9998C16.5645 23.9846 15.1492 23.1331 14.9771 23.027C14.7597 22.893 14.2802 22.5745 13.8481 22.0693C12.8327 20.8823 12.7435 19.2252 13.5031 17.8979Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M12.25 11.125H11.125V25.75C11.125 26.0484 11.2435 26.3345 11.4545 26.5455C11.6655 26.7565 11.9516 26.875 12.25 26.875H26.875V25.75H12.25V11.125Z"
        fill="#FA8389"
      />
      <path
        d="M26.875 15.0625H22.9375V16.1875H24.9569L20.6875 20.4569L18.2744 18.0381C18.2221 17.9854 18.1599 17.9436 18.0913 17.915C18.0228 17.8864 17.9493 17.8717 17.875 17.8717C17.8007 17.8717 17.7272 17.8864 17.6587 17.915C17.5901 17.9436 17.5279 17.9854 17.4756 18.0381L13.375 22.1444L14.1681 22.9375L17.875 19.2306L20.2881 21.6494C20.3404 21.7021 20.4026 21.7439 20.4712 21.7725C20.5397 21.8011 20.6132 21.8158 20.6875 21.8158C20.7618 21.8158 20.8353 21.8011 20.9038 21.7725C20.9724 21.7439 21.0346 21.7021 21.0869 21.6494L25.75 16.9806V19H26.875V15.0625Z"
        fill="#FA8389"
      />
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="38"
          height="38"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.568627 0 0 0 0 0.701961 0 0 0 0 0.980392 0 0 0 0.19 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="12.2702"
          y1="13.8299"
          x2="18.4796"
          y2="22.7953"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DAE3FE" />
          <stop offset="1" stopColor="#E9EFFD" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AnalyticsIcon;
