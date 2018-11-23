import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => {
  return {
    drawer: {
      width: 240,
      backgroundColor: "pink"
    }
  };
};

class Sidebar extends React.Component {
  render() {
    return (
      <Drawer
        variant="persistent"
        anchor="left"
        className={this.props.classes.drawer}
        open={this.props.open}
      >
        <List>
          {["Apple"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(Sidebar);
