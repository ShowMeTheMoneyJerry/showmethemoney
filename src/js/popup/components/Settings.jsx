import React from 'react';
import Button from '@material-ui/core/Button';
import { hot } from 'react-hot-loader';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { changeSetting, fetchSetting } from '../../store';
import { storeThunker } from '../../popup';

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
    backgroundColor: '#d4f2ec',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontFamily: 'Impact',
    fontSize: 33,
    marginRight: 64,
    color: '#333',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  sectionTitle: {
    display: 'flex',
    marginTop: 20,
    fontSize: 16,
    alignItems: 'center',
    fontWeight: 'bold',
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
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // this.props.getSetting('aapl');
    if (this.props.companies.aapl.setting) {
      const {
        priceHigh,
        priceLow,
        sentimentHigh,
        sentimentLow,
      } = this.props.companies.aapl.setting;
      this.setState({ priceHigh, priceLow, sentimentHigh, sentimentLow });
    }
  }

  // componentDidUpdate(prevProps) {
  // 	if (this.props.settingThreshold !== prevProps.settingThreshold) {
  // 		this.props.getSetting('aapl');
  // 	}
  // }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: Number(event.target.value),
    });
    this.props.updateSetting('aapl', this.state);
  }

  async handleClick() {
    await this.setState({
      priceHigh: 0,
      priceLow: 0,
      sentimentHigh: 0,
      sentimentLow: 0,
    });
    this.props.updateSetting('aapl', this.state);
  }

  render() {
    // if (!this.props.companies.aapl.setting) {
    //   return <div />;
    // }
    const { classes } = this.props;
    console.log(
      'here is this.props.companies.aapl.setting',
      this.props.companies.aapl.setting
    );
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
            <ArrowBackIcon />
          </Button>
          <Button onClick={this.handleClick}>Reset</Button>
        </div>
      </div>
    );
  }
}
const mapState = state => ({
  companies: state.companies,
});

const mapDispatch = dispatch => ({
  updateSetting: (company, setting) =>
    storeThunker.dispatch(changeSetting(company, setting)),
  getSetting: company => storeThunker.dispatch(fetchSetting(company)),
});

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(hot(module)(Settings))
);
