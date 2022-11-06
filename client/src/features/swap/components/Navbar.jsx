import React, {Component} from 'react';
import Identicon from 'identicon.js';

class Navbar extends Component {
  render() {
    let {account} = this.props;
    return (
      <nav>
        <ul>
          <li>
            {account ? (
              <img
                width="30"
                height="30"
                src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
                alt=""
              />
            ) : (
              <span></span>
            )}
            <small>
              <span>{account}</span>
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
