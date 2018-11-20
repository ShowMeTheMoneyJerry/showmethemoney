import React from "react";
import icon from "../../img/icon-128.png";
import { hot } from "react-hot-loader";
// import {Button} from 'react-toolbox/lib/button';
import Button from "@material-ui/core/Button";
import { toggleDrawer } from "../store/ui";
import { connect } from "react-redux";

class GreetingComponent extends React.Component {
  render() {
    return (
      <div>
        <p>this is a p tag</p>
        <img src={icon} />
        <Button color="primary">Hello</Button>
        <Button
          color="primary"
          onClick={() => {
            this.props.toggleDrawer();
          }}
        >
          Toggle Sidebar
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDrawer: () => dispatch(toggleDrawer())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(hot(module)(GreetingComponent));
