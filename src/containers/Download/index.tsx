import React, {FC, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';

import {A, Button, CodeSnippet, Loader, PageTitle} from 'components';
import {Release} from 'types/github';
import {fetchGithubReleases} from 'utils/github';
import {displayErrorToast} from 'utils/toast';

import ReleaseNotes from './ReleaseNotes';
import {LinuxIcon, MacOsIcon, WindowsIcon} from './icons';
import './Download.scss';

enum Os {
  'Windows' = 'Windows',
  'Mac' = 'Mac',
  'Linux' = 'Linux',
}

const Download: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [releases, setReleases] = useState<Release[]>([]);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const response = await fetchGithubReleases({
          page: 1,
          per_page: 1,
        });
        setReleases(response);
      } catch (error) {
        displayErrorToast('Network Error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const latestReleaseNumber = useMemo<number | null>(() => {
    if (!releases.length) return null;

    const releaseNumbers = releases.map(({alphaVersion}) => alphaVersion);
    return Math.max(...releaseNumbers);
  }, [releases]);

  const getOsExtension = useCallback((os: Os): string => {
    if (os === Os.Windows) return 'win.exe';
    if (os === Os.Mac) return 'mac.dmg';
    if (os === Os.Linux) return 'linux.AppImage';
    return '';
  }, []);

  const renderOsIcon = useCallback((os: Os) => {
    if (os === Os.Windows) return <WindowsIcon />;
    if (os === Os.Mac) return <MacOsIcon />;
    if (os === Os.Linux) return <LinuxIcon />;
  }, []);

  const getDownloadLink = useCallback(
    (os: Os): string =>
      latestReleaseNumber
        ? `https://github.com/thenewboston-developers/Account-Manager/releases/download/v1.0.0-alpha.${latestReleaseNumber}/TNB-Account-Manager-1.0.0-alpha.${latestReleaseNumber}-${getOsExtension(
            os,
          )}`
        : '',
    [getOsExtension, latestReleaseNumber],
  );

  const windowsInstructions = useMemo(
    () => (
      <ol type="1" className="instruction-container__ol">
        <li className="instruction-container__li">
          <span className="instruction-container__instruction">Click the "Download" button</span>
        </li>
        <li className="instruction-container__li">
          <span className="instruction-container__instruction">Click on the downloaded file</span>
        </li>
        <li className="instruction-container__li">
          <span className="instruction-container__instruction">
            You will get a modal that says 'Windows protected your PC'. Click More info
          </span>
        </li>
        <li className="instruction-container__li">
          <span className="instruction-container__instruction">Then click Run anyway</span>
        </li>
      </ol>
    ),
    [],
  );

  const macInstructions = useMemo(
    () => (
      <ol type="1" className="instruction-container__ol">
        <li className="instruction-container__li">
          <span className="instruction-container__instruction">Click the "Download" button</span>
        </li>
        <li className="instruction-container__li">
          <span className="instruction-container__instruction">Click on the downloaded file</span>
        </li>
        <li className="instruction-container__li">
          <span className="instruction-container__instruction">Drag and drop the app to the Applications folder</span>
        </li>
        <li className="instruction-container__li">
          <span className="instruction-container__instruction">
            Open the app. If you see an error because the Account Manager app is not from the App Store check out{' '}
            <A href="https://support.apple.com/en-us/HT202491">these instructions</A> to allow the install.
          </span>
        </li>
      </ol>
    ),
    [],
  );

  const linuxInstructions = useMemo(
    () => (
      <ol type="1" className="instruction-container__ol">
        <li className="instruction-container__li">
          <span className="instruction-container__instruction">Click the "Download" button</span>
        </li>
        <li className="instruction-container__li">
          <span className="instruction-container__instruction">To run thenewboston, make it executable</span>
        </li>
        <CodeSnippet code="$ chmod a+x TNB-Account-Manager-*.AppImage" />
        <li className="instruction-container__li">
          <span className="instruction-container__instruction">Run!</span>
        </li>
        <CodeSnippet code="$ ./TNB-Account-Manager-*.AppImage" />
      </ol>
    ),
    [],
  );

  const renderInstructions = useCallback(
    (os: Os): ReactNode => {
      if (os === Os.Windows) {
        return windowsInstructions;
      }
      if (os === Os.Mac) {
        return macInstructions;
      }
      if (os === Os.Linux) {
        return linuxInstructions;
      }

      return null;
    },
    [linuxInstructions, macInstructions, windowsInstructions],
  );

  const renderDownloadCard = useCallback(
    (os: Os) => (
      <div className="Download__card">
        {renderOsIcon(os)}
        <div className="Download__card-title">{os}</div>
        <a className="Download__download-link" href={getDownloadLink(os)} tabIndex={-1}>
          <Button className="Download__download-button" disabled={!latestReleaseNumber}>
            <span>Download</span>
          </Button>
        </a>
        <div className="instruction-container">
          <h2 className="instruction-container__title">Installation Instruction</h2>
          {renderInstructions(os)}
        </div>
      </div>
    ),
    [getDownloadLink, latestReleaseNumber, renderInstructions, renderOsIcon],
  );

  const scrollToReleaseNotes = () => {
    const element = document.getElementById('release-notes');
    window.scrollTo({behavior: 'smooth', top: element?.offsetTop || 0});
  };

  return (
    <>
      <PageTitle title="Download" />
      <div className="Download">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="Download__main-background">
              <div className="Download__main-content">
                <div className="Download__title">Download Wallet</div>
                <div className="Download__subtitle">Send and receive coins with our free and secure wallet</div>
                <div className="Download__latest-release">LATEST RELEASE 1.0.0-alpha.{latestReleaseNumber}</div>
                <div className="Download__buttons-container">
                  <div
                    className="Download__buttons--release"
                    tabIndex={-1}
                    role="button"
                    onClick={scrollToReleaseNotes}
                  >
                    Release notes
                  </div>
                  <Link to="/account-manager/get-started">How to use</Link>
                </div>
                <div className="Download__cards-container">
                  {renderDownloadCard(Os.Windows)}
                  {renderDownloadCard(Os.Mac)}
                  {renderDownloadCard(Os.Linux)}
                </div>
              </div>
            </div>
            <div className="Download__release-notes">
              <div className="Download__release-notes-anchor" id="release-notes" />
              <ReleaseNotes />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Download;
