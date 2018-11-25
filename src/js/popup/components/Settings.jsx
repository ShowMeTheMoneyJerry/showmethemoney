import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textField: {
    flexBasis: 200,
    marginTop: 15
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  title: {
    fontSize: 25
  },
  sectionTitle: {
    marginTop: 10
  }
});

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      stockAmountHigh: "",
      stockAmountLow: "",
      sentimentHigh: "",
      sentimentLow: ""
    };

    this.handleHighStockChange = this.handleHighStockChange.bind(this);
    this.handleLowStockChange = this.handleLowStockChange.bind(this);
    this.handleHighSentimentChange = this.handleHighSentimentChange.bind(this);
    this.handleLowSentimentChange = this.handleLowSentimentChange.bind(this);
  }

  handleHighStockChange(event) {
    this.setState({ stockAmountHigh: event.target.value });
  }

  handleLowStockChange(event) {
    this.setState({ stockAmountLow: event.target.value });
  }
  handleHighSentimentChange(event) {
    const onlyNums = event.target.value.replace(/[^0-9]/g, "");
    this.setState({ sentimentHigh: onlyNums });
  }
  handleLowSentimentChange(event) {
    const onlyNums = event.target.value.replace(/[^0-9]/g, "");
    this.setState({ sentimentLow: onlyNums });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.title}>{this.props.name} Settings</div>
        <div>
          <div className={classes.sectionTitle}>Stock Threshold</div>
          <div>
            <div>
              <TextField
                id="outlined-adornment-amount"
                className={classes.textField}
                variant="outlined"
                label="High"
                value={this.state.stockAmountHigh}
                onChange={this.handleHighStockChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <TextField
                id="outlined-adornment-amount"
                className={classes.textField}
                variant="outlined"
                label="Low"
                value={this.state.stockAmountLow}
                onChange={this.handleLowStockChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <div className={classes.sectionTitle}> Sentiment Threshold </div>
          <div>
            <div>
              <TextField
                id="outlined-adornment-amount"
                className={classes.textField}
                variant="outlined"
                label="High"
                value={this.state.sentimentHigh}
                onChange={this.handleHighSentimentChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">#</InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <TextField
                id="outlined-adornment-amount"
                className={classes.textField}
                variant="outlined"
                label="Low"
                value={this.state.sentimentLow}
                onChange={this.handleLowSentimentChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">#</InputAdornment>
                  )
                }}
              />
            </div>
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <Button
            onClick={() => {
              this.props.onBackButtonClick();
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              this.setState({
                stockAmountHigh: "",
                stockAmountLow: "",
                sentimentHigh: "",
                sentimentLow: ""
              });
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
