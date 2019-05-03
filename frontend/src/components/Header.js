import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faSignOutAlt from "@fortawesome/fontawesome-free-solid/faSignOutAlt";

import { loadSession, logout } from "../auth/auth.redux";

class Header extends Component {
  componentDidMount() {}

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <nav
        className={`main-navbar navbar navbar-dark sticky-top flex-nowrap p-0 bg-primary `}
      >
        <div className="col-8 col-lg-3 col-xl-2 mr-0">
          {/* <Link className="navbar-brand" to="/">
            Menu
          </Link> */}
        </div>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="" onClick={e => this.logout(e)}>
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func,
  loadSession: PropTypes.func
};

export default connect(
  state => ({
    isAuthenticated: Boolean(state.session.email)
  }),
  {
    loadSession,
    logout
  }
)(Header);
