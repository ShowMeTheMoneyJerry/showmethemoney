import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { createSetting, changeSetting, deleteSetting } from '../../store';

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textField: {
    flexBasis: 200,
    marginTop: 15,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 25,
  },
  sectionTitle: {
    marginTop: 10,
  },
});

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      priceHigh: '',
      priceLow: '',
      sentimentHigh: '',
      sentimentLow: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.settingThreshold) {
      const {
        priceHigh,
        priceLow,
        sentimentHigh,
        sentimentLow,
      } = this.props.settingThreshold;
      this.setState({ priceHigh, priceLow, sentimentHigh, sentimentLow });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log('this.state', this.state);
  }

  render() {
    const { classes, settingThreshold } = this.props;
    console.log('settingThreshold', settingThreshold);
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
                name="priceHigh"
                value={this.state.priceHigh}
                onChange={this.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <TextField
                id="outlined-adornment-amount"
                className={classes.textField}
                variant="outlined"
                label="Low"
                name="priceLow"
                value={this.state.priceLow}
                onChange={this.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
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
                name="sentimentHigh"
                value={this.state.sentimentHigh}
                onChange={this.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <TextField
                id="outlined-adornment-amount"
                className={classes.textField}
                variant="outlined"
                label="Low"
                name="sentimentLow"
                value={this.state.sentimentLow}
                onChange={this.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
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
                priceHigh: '',
                priceLow: '',
                sentimentHigh: '',
                sentimentLow: '',
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

const mapDispatch = dispatch => ({
  addSetting: (company, setting) =>
    storeThunker.dispatch(createSetting(company, setting)),
  updateSetting: (company, setting) =>
    storeThunker.dispatch(changeSetting(company, setting)),
  removeSetting: company => storeThunker.dispatch(deleteSetting(company)),
});

export default withStyles(styles)(
  connect(
    null,
    mapDispatch
  )(Settings)
);
