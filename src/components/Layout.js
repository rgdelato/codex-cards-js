import React from "react";
import { Link } from "react-router-dom";
import { Menu, Search } from "semantic-ui-react";

var Layout = props => {
  return (
    <div>
      <Menu borderless={true}>
        <Menu.Item header as={Link} to="/">Codex Card Database</Menu.Item>
        <Menu.Item position="right">
          <Search placeholder="Search for a card..." />
        </Menu.Item>
      </Menu>

      <div
        className="content"
        style={{ maxWidth: "90%", margin: "0 auto", textAlign: "center" }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
