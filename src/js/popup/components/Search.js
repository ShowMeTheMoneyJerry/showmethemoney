import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";
import { storeThunker } from "../../popup";

import { fetchMostRecentPrice } from "../../store";

const styles = theme => ({
  button: {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 10,
    backgroundColor: "#a3dcac",
    "&:hover": {
      backgroundColor: "#128fa6",
      color: "#FFFFFF"
    }
  },
  textField: {
    width: "100%",
    transformOrigin: "left"
  },
  rightIcon: {
    width: 30,
    height: 20
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "flex-end"
  }
});

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      name: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.setState({ open: !this.state.open });
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.container}>
        {open && (
          <TextField
            id="standard-name"
            label="Add Company"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange("name")}
            onSubmit={() => this.props.addCompany(this.state.name)}
            margin="normal"
          />
        )}
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => {
            if (this.state.open) {
              if (this.state.name) {
                this.props.addCompany(this.state.name);
                this.props.getMostRecentPrice(this.state.name);
              }

              this.setState({ open: false, name: "" });
            } else {
              this.setState({ open: true });
            }
          }}
        >
          <AddIcon className={classes.rightIcon} />
        </Button>
      </div>
    );
  }
}

const mapState = state => ({
  companies: state.companies
});

const mapDispatch = dispatch => ({
  getMostRecentPrice: company => dispatch(fetchMostRecentPrice(company))
});

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(Search)
);
