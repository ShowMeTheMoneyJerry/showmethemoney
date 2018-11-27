import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import { Switch } from '@material-ui/core';
import ArticleList from './components/ArticleList';
import Chart from './components/Chart';
import Settings from './components/Settings';
import Divider from '@material-ui/core/Divider';
import {
  fetchMostRecentPrice,
  fetchHistoricalPrices,
  fetchHistoricalArticles,
  fetchSetting,
} from '../store';
import { storeThunker } from '../popup';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CircularProgress from '@material-ui/core/CircularProgress';

//--------------
// for snackbar
const action = (
  <div>
    <h1>makes¢ents</h1>
    <Button color="secondary" size="small">
      lorem ipsum dolorem
    </Button>
    <Button color="secondary" size="small">
      <InfoIcon />
    </Button>
  </div>
);

//--------------

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#575757',
    flexDirection: 'column',
    width: '600px',
    height: '100%',
    alignItems: 'center',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  listItemNameButton: {
    margin: theme.spacing.unit,
    display: 'flex',
    flex: 1,
    color: theme.palette.getContrastText('#c7d1d1'),
    backgroundColor: '#c7d1d1',
    '&:hover': {
      backgroundColor: '#c7d1d1',
    },
  },
  listItemDataButton: {
    margin: theme.spacing.unit,
    display: 'flex',
    flex: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    textTransform: 'none',
    color: theme.palette.getContrastText('#AED590'),

    backgroundColor: '#d4f2ec',
    '&:hover': {
      backgroundColor: '#d4f2ec',
    },
  },
  listItemInfoButton: {
    color: '#daf1e9',
  },
  listItem: {
    display: 'flex',
    width: 600,
    alignItems: 'stretch',
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: 'white',
    borderStyle: 'solid',
  },
  sentimentContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});

class PopupHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCompany: '',
      view: 'home',
    };
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    Object.keys(this.props.companies).map(company =>
      this.props.getMostRecentPrice(company)
    );
    this.props.getHistoricalPrices('aapl', '5d');
    this.props.getHistoricalArticles('aapl');
    this.props.getSetting('aapl');
  }

  goHome() {
    this.setState({
      selectedCompany: '',
      view: 'home',
    });
  }
  render() {
    if (!this.props.companies.aapl.recentPrice) {
      return <div />;
    }
    const historicalPrices = this.props.companies.aapl.historicalPrices;
    const recentPrice = this.props.companies.aapl.recentPrice;
    const historicalArticles = this.props.companies.aapl.historicalArticles;
    const settingThreshold = this.props.companies.aapl.setting;
    const { classes } = this.props;

    switch (this.state.view) {
      case 'home':
        return (
          <div className={classes.root}>
            <SnackbarContent action={action} className={classes.header} />
            <h1
              className={classes.header}
              style={{ fontFamily: 'Impact', fontSize: 33, color: '#333' }}
            >
              makes¢ents
            </h1>
            <List className={classes.list}>
              {/* clever way to map through an Object:
							 let obj = { first: 'someVal' };
							obj[Object.keys(obj)[0]] //returns 'someVal' */}

              {Object.keys(this.props.companies).map((company, idx) => {
                let thumb = null;
                if (company.sentiment > 0) {
                  thumb = (
                    <img
                      src={require('../../img/thumbsUp.png')}
                      style={{ width: 30, height: 30, marginLeft: 10 }}
                    />
                  );
                } else if (company.sentiment < -1) {
                  thumb = (
                    <img
                      src={require('../../img/thumbsDown.png')}
                      style={{ width: 30, height: 30, marginLeft: 10 }}
                    />
                  );
                } else {
                  thumb = (
                    <img
                      src={require('../../img/thumbsNeutral.png')}
                      style={{ width: 30, height: 30, marginLeft: 10 }}
                    />
                  );
                }
                return (
                  <div key={company}>
                    <ListItem key={company} className={classes.listItem}>
                      <Button
                        className={classes.listItemNameButton}
                        color="inherit"
                        onClick={() => {
                          this.setState({
                            selectedCompany: company,
                            view: 'articleList',
                          });
                        }}
                      >
                        {Object.keys(this.props.companies)[idx]}
                      </Button>
                      <Button
                        className={classes.listItemDataButton}
                        onClick={() => {
                          this.setState({
                            selectedCompany: company,
                            view: 'chart',
                          });
                        }}
                      >
                        <div>
                          {`Price: ${
                            this.props.companies[
                              Object.keys(this.props.companies)[idx]
                            ].recentPrice
                          }`}
                        </div>
                        <div className={classes.sentimentContainer}>
                          {/* {`view: ${this.props.companies[
														Object.keys(this.props.companies)[idx]].view}`} */}
                          view: {thumb}
                        </div>
                      </Button>
                      <Button
                        className={classes.listItemInfoButton}
                        onClick={() => {
                          this.setState({
                            selectedCompany: company,
                            view: 'settings',
                          });
                        }}
                      >
                        <InfoIcon />
                      </Button>
                    </ListItem>
                    <Divider />
                  </div>
                );
              })}
            </List>
          </div>
        );
      case 'settings':
        return (
          <div className={classes.root}>
            <Settings
              name={this.state.selectedCompany.name}
              onBackButtonClick={this.goHome}
              settingThreshold={settingThreshold}
            />
          </div>
        );
      case 'chart':
        // layout
        if (!this.props.companies.aapl.historicalPrices) {
          return (
            <CircularProgress className={classes.progress} color="secondary" />
          );
        }
        return (
          <div className={classes.root}>
            <Chart
              historicalPricesArr={historicalPrices}
              historicalArticlesArr={historicalArticles}
              recentPrice={recentPrice}
              onBackButtonClick={this.goHome}
            />
          </div>
        );
      case 'articleList':
        if (!this.props.companies.aapl.historicalArticles) {
          return (
            <CircularProgress className={classes.progress} color="secondary" />
          );
        }
        return (
          <div className={classes.root}>
            <ArticleList
              articles={this.props.companies.aapl.historicalArticles}
              onBackButtonClick={this.goHome}
            />
          </div>
        );
      default:
        return (
          <div>
            {/* <h1>prices: {this.props.companies.aapl.recentPrice}</h1> */}
            {/* <h1>count: {this.props.articles.historicalArticles[0].title}</h1> */}
            <Button color="primary">Button 1</Button>
            <Button color="primary">Button 2</Button>
          </div>
        );
    }
  }
}

const mapState = state => ({
  articles: state.articles,
  // prices: state.prices,
  companies: state.companies,
});

const mapDispatch = dispatch => ({
  getMostRecentPrice: company =>
    storeThunker.dispatch(fetchMostRecentPrice(company)),
  getHistoricalPrices: (company, time) =>
    storeThunker.dispatch(fetchHistoricalPrices(company, time)),
  getHistoricalArticles: company =>
    storeThunker.dispatch(fetchHistoricalArticles(company)),
  getSetting: company => storeThunker.dispatch(fetchSetting(company)),
});

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(hot(module)(PopupHome))
);
