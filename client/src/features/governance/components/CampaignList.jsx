import React from 'react';

function CampaignList() {
  return (
    <>
      <table className="table mt-3 mx-3  is-fullwidth">
        <thead>
          <tr>
            <th>
              <abbr title="Position">#</abbr>
            </th>
            <th>Campaign</th>
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
              <abbr title="Pledged">Pledged</abbr>
            </th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>
              <abbr title="Position"></abbr>
            </th>
            <th>Total:</th>
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
              <abbr title="Pledged">♞ 1827 💰</abbr>
            </th>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <th>1</th>
            <td>
              First White Queen Tournament <strong>(De-Chess Launch)</strong>
            </td>
            <td>38</td>
            <td>23</td>
            <td>♞ 12</td>
            <td>♞ 3</td>
          </tr>
          <tr>
            <th>2</th>
            <td>Grand White Queen Tournament</td>
            <td>38</td>
            <td>20</td>
            <td>♞ 11</td>
            <td>♞ 7</td>
          </tr>
          <tr>
            <th>3</th>
            <td>
              <a href="https://www.savethechildren.in/" title="Save The Children">
                Save The Children
              </a>{' '}
              Chess Tournament
            </td>
            <td>1 Dec 2022</td>
            <td>15 Jan 2023</td>
            <td>♞ 13</td>
            <td>♞ 6</td>
          </tr>
          <tr className="is-selected">
            <th>4</th>
            <td>Pune Shatranj Challenge</td>
            <td>15 Nov 2022</td>
            <td>31 Dec 2022</td>
            <td>♞ 9</td>
            <td>♞ 10</td>
          </tr>
          <tr>
            <th>5</th>
            <td>Mumbai Chessboard Club Match</td>
            <td>38</td>
            <td>19</td>
            <td>♞ 9</td>
            <td>♞ 10</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default CampaignList;
