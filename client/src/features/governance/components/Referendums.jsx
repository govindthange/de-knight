import React from 'react';

function Referendums() {
  return (
    <>
      <div>
        <div className="is-pulled-left mt-2 ml-5">
          <p>
            As an electorate you can post a new referenda or directly <strong>vote</strong> on an
            initiated proposal, rule, or RFE. To become an electorate click on the{' '}
            <strong>Electorates</strong> tab.
          </p>
        </div>
        <div className="field">
          <button className="button is-info  is-pulled-right">
            <i className="fas fa-plus mr-2"></i>New Referenda
          </button>
        </div>
      </div>
      <table className="table mt-3 mx-3  is-fullwidth">
        <thead>
          <tr>
            <th>
              <abbr title="Position">#</abbr>
            </th>
            <th>Name</th>
            <th>Type</th>
            <th>Proposal</th>
            <th>
              <abbr title="Start">Start</abbr>
            </th>
            <th>
              <abbr title="End Date">End</abbr>
            </th>
            <th>
              <abbr title="Goal">Goal</abbr>
            </th>
            <th>
              <abbr title="Votes">Votes</abbr>
            </th>
            <th>
              <abbr title="Give Vote">🖓 {'  |  '} 🖒</abbr>
            </th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>
              <abbr title="Position"></abbr>
            </th>
            <th></th>
            <th></th>
            <th>
              <abbr title="Start"></abbr>
            </th>
            <th>
              <abbr title="End Date"></abbr>
            </th>
            <th>
              <abbr title="Goal"></abbr>
            </th>
            <th>
              <abbr title="Votes">156 🗳️</abbr>
            </th>
            <th>
              <abbr title="Give Vote"></abbr>
            </th>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <th>1</th>
            <td>
              First White Queen Tournament <strong>(De-Chess Launch)</strong>
            </td>
            <td>Campaign</td>
            <td>The debut chess tournament launch campaign.</td>
            <td>38</td>
            <td>23</td>
            <td>♞ 12</td>
            <td>68</td>
            <td>
              <div className="buttons has-addons">
                <button className="button is-small is-primary is-selected">
                  <i className="fas fa-thumbs-up" />
                </button>
                <button className="button is-small">
                  {' '}
                  <i className="fas fa-thumbs-down" />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th>2</th>
            <td>Grand White Queen Tournament</td>
            <td>Campaign</td>
            <td>Run a campaign for launching a chess tournament.</td>
            <td>38</td>
            <td>20</td>
            <td>♞ 11</td>
            <td>65</td>
            <td>
              <div className="buttons has-addons">
                <button className="button is-small ">
                  <i className="fas fa-thumbs-up" />
                </button>
                <button className="button is-small is-danger is-selected">
                  {' '}
                  <i className="fas fa-thumbs-down" />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th>3</th>
            <td>
              <a href="https://www.savethechildren.in/" title="Save The Children">
                Save The Children
              </a>{' '}
              Chess Tournament
            </td>
            <td>Campaign</td>
            <td>Run a chess tournament campaign for charity.</td>
            <td>1 Dec 2022</td>
            <td>15 Jan 2023</td>
            <td>♞ 13</td>
            <td>69</td>
            <td>
              <div className="buttons has-addons">
                <button className="button is-small is-primary is-selected">
                  <i className="fas fa-thumbs-up" />
                </button>
                <button className="button is-small">
                  {' '}
                  <i className="fas fa-thumbs-down" />
                </button>
              </div>
            </td>
          </tr>
          <tr className="is-selected">
            <th>4</th>
            <td>YouTube - Digital Marketing</td>
            <td>Marketing</td>
            <td>Pay youtubers to review De-Chess.</td>
            <td>15 Nov 2022</td>
            <td>31 Dec 2022</td>
            <td>♞ 9</td>
            <td>71</td>
            <td>
              <div className="buttons has-addons">
                <button className="button is-small">
                  <i className="fas fa-thumbs-up" />
                </button>
                <button className="button is-small is-danger is-selected">
                  {' '}
                  <i className="fas fa-thumbs-down" />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th>5</th>
            <td>De-Chess Mobile Version</td>
            <td>RFE</td>
            <td>Build a mobile application.</td>
            <td>38</td>
            <td>19</td>
            <td>♞ 9</td>
            <td>49</td>
            <td>
              <div className="buttons has-addons">
                <button className="button is-small">
                  <i className="fas fa-thumbs-up" />
                </button>
                <button className="button is-small is-danger is-selected">
                  <i className="fas fa-thumbs-down" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Referendums;
