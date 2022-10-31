import React from 'react';

function AboutUs() {
  return (
    <div className="columns m-t-10">
      <div className="column">
        <nav className="has-text-grey-light">
          <a href="#" className="has-text-primary">
            About us
          </a>
          {' • '}
          <a href="#" className="has-text-primary">
            Our story
          </a>
          {' • '}

          <a href="#" className="has-text-primary">
            Post a listing
          </a>
          {' • '}
          <a href="#" className="has-text-primary">
            Contact us
          </a>
          {' • '}
        </nav>
      </div>
    </div>
  );
}

export default AboutUs;
