import React, {useState} from 'react';
import CampaignList from './components/CampaignList';
import Dashboard from './components/Dashboard';
import Electorates from './components/Electorates';
import NewCampaign from './components/NewCampaign';
import Referendums from './components/Referendums';
import Treasury from './components/Treasury';

function Governance() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isNewCampaignVisible, setNewCampaignVisibility] = useState(false);

  let tabContent;
  switch (currentTab) {
    case 'dashboard':
      tabContent = <Dashboard />;
      break;
    case 'referendum':
      tabContent = <Referendums />;
      break;
    case 'crowdfunding':
      tabContent = <CampaignList />;
      break;
    case 'crowdsale':
      tabContent = <div>Crowdsale / ICO</div>;
      break;
    case 'treasury':
      tabContent = <Treasury />;
      break;
    case 'electorates':
      tabContent = <Electorates />;
      break;
    default:
      tabContent = <div>This screen is not supported!</div>;
  }

  const onNewCampaign = () => {
    setNewCampaignVisibility(true);
  };

  const onCloseNewCampaign = () => {
    setNewCampaignVisibility(false);
  };

  return (
    <>
      <NewCampaign shouldShow={isNewCampaignVisible} onClose={onCloseNewCampaign} />
      <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="../">
            <img
              src={require('../../assets/images/dechess-logo.png')}
              alt="De-CHESS, a decentralized play-to-earn game"
              width="112"
              height="28"
            />
          </a>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-chessboard-menu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      </nav>
      <div className="tabs is-centered is-boxed">
        <ul>
          <li
            class={currentTab === 'dashboard' ? 'is-active' : ''}
            onClick={event => {
              setCurrentTab('dashboard');
            }}>
            <a>
              <span className="icon is-small">
                <i className="fas fa-chart-pie" aria-hidden="true"></i>
              </span>
              <span>Summary</span>
            </a>
          </li>
          <li
            class={currentTab === 'referendum' ? 'is-active' : ''}
            onClick={event => {
              setCurrentTab('referendum');
            }}>
            <a>
              <span className="icon is-small">
                <i className="fas fa-landmark" aria-hidden="true"></i>
              </span>
              <span>Referendums</span>
            </a>
          </li>
          <li
            class={currentTab === 'crowdfunding' ? 'is-active' : ''}
            onClick={event => {
              setCurrentTab('crowdfunding');
            }}>
            <a>
              <span className="icon is-small">
                <i className="fas fa-comments-dollar" aria-hidden="true"></i>
              </span>
              <span>Crowdfunding</span>
            </a>
          </li>
          <li
            class={currentTab === 'crowdsale' ? 'is-active' : ''}
            onClick={event => {
              setCurrentTab('crowdsale');
            }}>
            <a>
              <span className="icon is-small">
                <i className="fas fa-coins" aria-hidden="true"></i>
              </span>
              <span>Crowdsale</span>
            </a>
          </li>
          <li
            class={currentTab === 'treasury' ? 'is-active' : ''}
            onClick={event => {
              setCurrentTab('treasury');
            }}>
            <a>
              <span className="icon is-small">
                <i className="fas fa-cash-register" aria-hidden="true"></i>
              </span>
              <span>Treasury</span>
            </a>
          </li>
          <li
            class={currentTab === 'electorates' ? 'is-active' : ''}
            onClick={event => {
              setCurrentTab('electorates');
            }}>
            <a>
              <span className="icon is-small">
                <i className="fas fa-hand-point-up" aria-hidden="true"></i>
              </span>
              <span>Electorates</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="container is-fluid">{tabContent}</div>
    </>
  );
}

export default Governance;
