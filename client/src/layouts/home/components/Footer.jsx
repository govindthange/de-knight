import React from 'react';
import AboutUs from './AboutUs';
import TermsAndConditions from './TermsAndConditions';

function Footer() {
  return (
    <footer className="hero is-small is-light">
      <div className="hero-body">
        <div className="container has-text-centered">
          <a href="">
            <img
              src={require('../assets/made-with-dechess.png')}
              alt="Made with De-Chess"
              width="171"
              height="32"
            />
          </a>
          <AboutUs />
          <TermsAndConditions />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
