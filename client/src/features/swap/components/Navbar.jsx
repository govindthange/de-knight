import React, {Component} from 'react';
import Identicon from 'identicon.js';

class Navbar extends Component {
  render() {
    let {account} = this.props;
    return (
      <div className="is-vcentered">
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
        <small className="is-size-6">
          <span>{'  ' + account}</span>
        </small>
      </div>
    );
  }
}

export default Navbar;
