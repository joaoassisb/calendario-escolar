import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faSignOutAlt from "@fortawesome/fontawesome-free-solid/faSignOutAlt";

const Header = ({ logout }) => {
  const onClick = e => {
    e.preventDefault();

    logout();
  };

  return (
    <nav
      className={`main-navbar navbar navbar-dark sticky-top flex-nowrap p-0 bg-primary `}
    >
      <div className="col-8 col-lg-3 col-xl-2 mr-0">
        {/* <Link className="navbar-brand" to="/">
          Menu
        </Link> */}
      </div>

      <input
        className="form-control form-control-dark w-100 d-none d-lg-inline-block"
        type="text"
        placeholder="Busca rápida"
        aria-label="Search"
      />

      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="" onClick={onClick}>
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

Header.propTypes = {
  logout: PropTypes.func
};

export default Header;
