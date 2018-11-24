import React from "react";
import Button from "@material-ui/core/Button";

class Settings extends React.Component {
  render() {
    return (
      <div>
        {this.props.name}
        Settings
        <Button
          onClick={() => {
            this.props.onBackButtonClick();
          }}
        >
          Home
        </Button>
      </div>
    );
  }
}

export default Settings;
