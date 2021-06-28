import React, {FC, lazy} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import {Layout} from 'components';
import withSuspense from 'hoc/withSuspense';
import {AnalyticsType} from 'types/analytics';

import Analytics from './Analytics';
import Assets from './Assets';
import BankApi from './BankApi';
import ConfirmationValidatorApi from './ConfirmationValidatorApi';
import CreateAccount from './CreateAccount';
import DeploymentGuide from './DeploymentGuide';
import Donate from './Donate';
import Download from './Download';
import Faq, {faqFilters, FaqFilterType} from './Faq';
import Governance from './Governance';
import Guide from './Guide';
import Guidelines from './Guidelines';
import Home from './Home';
import Openings from './Openings';
import PrimaryValidatorApi from './PrimaryValidatorApi';
import Profile from './Profile';
import Progress from './Progress';
import ProjectRulesAndGuide from './Projects/ProjectRulesAndGuide';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Social from './Social';
import StyleGuide from './StyleGuide';
import Tasks from './Tasks';
import Teams from './Teams';
import Wallet from './Wallet';

/**
 * Lazy load pages that may contribute a lot to the bundle size
 */
const Projects = lazy(() => import('./Projects'));
const Tutorials = lazy(() => import('./Tutorials'));

interface GoogleAnalyticsWindow extends Window {
  ga: any;
  gtag: any;
}

declare const window: GoogleAnalyticsWindow;

const App: FC = () => {
  const renderGoogleAnalytics = () => {
    if (process.env.NODE_ENV === 'development') return null;
    return (
      <Route
        path="/"
        render={({location}) => {
          if (typeof window.ga === 'function') {
            window.gtag('config', 'UA-56989641-1', {
              page_location: window.location.href,
              page_path: location.pathname,
              page_title: document.title,
            });
          }
          return null;
        }}
      />
    );
  };

  return (
    <Router>
      {renderGoogleAnalytics()}
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect exact from="/analytics" to={`/analytics/${AnalyticsType.community}`} />
          <Route exact path="/analytics/:type" component={Analytics} />
          <Route exact path="/assets" component={Assets} />
          <Route path="/bank-api/:chapter?" component={BankApi} />
          <Route path="/confirmation-validator-api/:chapter?" component={ConfirmationValidatorApi} />
          <Route exact path="/create-account" render={() => <CreateAccount disabled />} />
          <Route path="/deployment-guide/:chapter?" component={DeploymentGuide} />
          <Route exact path="/donate" component={Donate} />
          <Route path="/download" component={Download} />
          <Redirect exact from="/faq" to={`/faq/${faqFilters[FaqFilterType.all]}`} />
          <Route exact path="/faq/:filter" component={Faq} />
          <Route path="/governance/:chapter?" component={Governance} />
          <Route path="/guide/:chapter?" component={Guide} />
          <Route exact path="/guidelines" component={Guidelines} />
          <Redirect exact from="/openings" to="/openings/All" />
          <Route exact path="/openings/:category/:openingId?" render={() => <Openings />} />
          <Route path="/primary-validator-api/:chapter?" component={PrimaryValidatorApi} />
          <Route path="/progress" component={Progress} />
          <Route path="/projects/:projectId?" component={withSuspense(Projects)} />
          <Route path="/project-rules/:chapter" component={ProjectRulesAndGuide} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-out" component={SignOut} />
          <Route exact path="/social" component={Social} />
          <Route path="/style-guide/:chapter?" component={StyleGuide} />
          <Redirect exact from="/tasks" to="/tasks/All" />
          <Route exact path="/tasks/:repository" component={Tasks} />
          <Redirect exact path="/teams" to="/teams/All/Members" />
          <Route exact path="/teams/:team/:tab?/:resource?" component={Teams} />
          <Redirect exact path="/tutorials" to="/tutorials/All" />
          <Route exact path="/tutorials/:category/:playlistId?" component={withSuspense(Tutorials)} />
          <Route path="/users/:userId" component={Profile} />
          <Route path="/wallet/:chapter?" component={Wallet} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
