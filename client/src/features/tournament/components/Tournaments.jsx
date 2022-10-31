import React from 'react';
import Groups from './Groups';

function Tournaments() {
  return (
    <>
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-7">
                <div className="columns">
                  <div className="column">
                    <h1 className="title m-t-60">All marketplaces</h1>
                    <h2 className="subtitle">
                      De-CHESS provides you insights into all marketplaces.
                    </h2>
                  </div>
                  <div className="column has-text-centered">
                    <img
                      className="m-t-50"
                      src={require('../assets/play-standalone.png')}
                      alt="De-CHESS marketplaces"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="hero is-medium">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-10">
                <div className="sub-section">
                  <h3 className="title is-size-4">
                    Find tournament organized by our De-CHESS community.
                  </h3>
                  <h4 className="subtitle is-size-6">
                    Whether you want to earn NFTs, mint them yourself or trade them in an open
                    market our decentralized platform supports that.
                  </h4>
                  <div className="columns">
                    <div className="column">
                      <div className="card rb-card">
                        <div className="card-image">
                          <figure className="image is-16by9">
                            <img
                              src={require('../assets/placeholder-640x360.png')}
                              alt="De-CHESS Regular Battle"
                            />
                          </figure>
                        </div>
                        <div className="card-content">
                          <h2 className="title is-size-6">
                            <a href="#">
                              De-CHESS Regular Battle
                              <br /> Oct 28, 2022 19:00 CET Prize fund 200 EVER
                            </a>
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="card rb-card">
                        <div className="card-image">
                          <figure className="image is-16by9">
                            <img
                              src={require('../assets/placeholder-640x360.png')}
                              alt="The Third Open De-CHESS Tournament!"
                            />
                          </figure>
                        </div>
                        <div className="card-content">
                          <h2 className="title is-size-6">
                            <a href="#">
                              The Third Open De-CHESS Tournament!
                              <br /> Jul 31, 2022 18:00 CET Prize fund 5,000 EVER
                            </a>
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="card rb-card">
                        <div className="card-image">
                          <figure className="image is-16by9">
                            <img
                              src={require('../assets/placeholder-640x360.png')}
                              alt="The Second Open De-CHESS Tournament!"
                            />
                          </figure>
                        </div>
                        <div className="card-content">
                          <h2 className="title is-size-6">
                            <a href="#">
                              The Second Open De-CHESS Tournament!
                              <br /> Jul 2, 2022 18:00 CET Prize fund 5,000 EVER
                            </a>
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="card rb-card">
                        <div className="card-image">
                          <figure className="image is-16by9">
                            <img
                              src={require('../assets/placeholder-640x360.png')}
                              alt="The First De-CHESS Collectors Club Tournament"
                            />
                          </figure>
                        </div>
                        <div className="card-content">
                          <h2 className="title is-size-6">
                            <a href="#">
                              The First De-CHESS Collectors Club Tournament
                              <br /> May 21, 2022 16:00 CET Prize fund 5,000 EVER
                            </a>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 
                <div className="sub-section">
                  <div className="columns">
                    <div className="column">
                      <h4 className="title is-size-6 is-uppercase">From the West</h4>
                      <ul>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Seattle</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Las Vegas</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Portland</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in San Jose</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Mesa</a>
                        </li>
                      </ul>
                    </div>
                    <div className="column">
                      <h4 className="title is-size-6 is-uppercase">From the Midwest</h4>
                      <ul>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Indianapolis</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Kansas City</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Minneapolis</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Albuquerque</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Columbus</a>
                        </li>
                      </ul>
                    </div>
                    <div className="column">
                      <h4 className="title is-size-6 is-uppercase">From the South</h4>
                      <ul>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Charlotte</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Atlanta</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Nashville</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Jacksonville</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Raleigh</a>
                        </li>
                      </ul>
                    </div>
                    <div className="column">
                      <h4 className="title is-size-6 is-uppercase">From the East</h4>
                      <ul>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Washington</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in New York</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Baltimore</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Brooklyn</a>
                        </li>
                        <li style={{fontSize: '0.9rem'}}>
                          <a href="#">Tournament venue in Boston</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> 
                */}
                <Groups />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Tournaments;
