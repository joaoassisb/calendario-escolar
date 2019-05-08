import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import faSignOutAlt from "@fortawesome/fontawesome-free-solid/faSignOutAlt";
import AuthApi from "../auth/auth.api";

export class Header extends Component {
  logout(e) {
    e.preventDefault();

    AuthApi.logout().then(() => {
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <nav className="main-navbar navbar navbar-dark sticky-top flex-nowrap p-0 bg-primary">
        <ul className="navbar-nav px-3 ml-auto">
          <li className="nav-item text-nowrap">
            <Link className="nav-link" to="/">
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

Header.propTypes = {};
