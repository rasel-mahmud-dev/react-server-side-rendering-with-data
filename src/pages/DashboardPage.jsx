import React from "react";
import { connect } from "react-redux";

const DashboardPage = props => {
  return (
    <div>
      <h2>Dummy User Dashboard</h2>
      {props.auth.isAuthenticated && (
        <h1>Wellcome to Mr. {props.auth.username}</h1>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default {
  component: connect(mapStateToProps)(DashboardPage)
};
