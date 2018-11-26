import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import green from "@material-ui/core/colors/green";
import { Switch } from "@material-ui/core";
import ArticleList from "./components/ArticleList";
import Chart from "./components/Chart";
import Settings from "./components/Settings";

import {
  fetchMostRecentPrice,
  fetchHistoricalPrices,
  fetchHistoricalArticles
} from "../store";
import { storeThunker } from "../popup";

const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: "#575757",
    flexDirection: "column",
    width: "600px",
    height: "400px",
    alignItems: "center"
  },
  list: {
    display: "flex",
    flexDirection: "column"
  },
  listItemNameButton: {
    margin: theme.spacing.unit,
    display: "flex",
    flex: 1,
    color: theme.palette.getContrastText("#c7d1d1"),
    backgroundColor: "#c7d1d1",
    "&:hover": {
      backgroundColor: "#c7d1d1"
    }
  },
  listItemDataButton: {
    margin: theme.spacing.unit,
    display: "flex",
    flex: 4,
    justifyContent: "space-between",
    flexDirection: "row",
    textTransform: "none",
    color: theme.palette.getContrastText("#AED590"),

    backgroundColor: "#d4f2ec",
    "&:hover": {
      backgroundColor: "#d4f2ec"
    }
  },
  listItemInfoButton: {
    color: "#daf1e9"
  },
  listItem: {
    display: "flex",
    width: 600,
    alignItems: "stretch",
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "white",
    borderStyle: "solid"
  },
  sentimentContainer: {
    display: "flex",
    alignItems: "center"
  }
});

class PopupHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCompany: {},
      view: "home"
    };
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    this.props.getMostRecentPrice("aapl");
    this.props.getHistoricalPrices("aapl", "5d");
    this.props.getHistoricalArticles("aapl", 6000000);
  }

  goHome() {
    this.setState({
      selectedCompany: {},
      view: "home"
    });
  }
  render() {
    const historicalPrices = this.props.prices.historicalPrices;
    const recentPrice = this.props.prices.recentPrice;
    const historicalArticles = this.props.articles.historicalArticles;

    const companyArray = [
      {
        name: "AAPL",
        price: `$ ${this.props.prices.recentPrice}`,
        view: "thumbs-up",
        companySentiment: 100
      },
      {
        name: "SPCX",
        price: "$ 24.56",
        view: "thumbs-down",
        companySentiment: -20
      },
      {
        name: "TSLA",
        price: "$ 80.00",
        view: "thumbs-middle",
        companySentiment: 24
      }
    ];

    const lowSentiment = 0;
    const highSentiment = 50;
    const { classes } = this.props;

    switch (this.state.view) {
      case "home":
        return (
          <div className={classes.root}>
            <h1 style={{ fontFamily: "Impact", fontSize: 33, color: "#333" }}>
              MakesCent$
            </h1>
            <List className={classes.list}>
              {companyArray.map((company, idx) => {
                let thumb = null;
                if (company.companySentiment > highSentiment) {
                  thumb = (
                    <img
                      src={require("../../img/thumbsUp.png")}
                      style={{ width: 30, height: 30, marginLeft: 10 }}
                    />
                  );
                } else if (company.companySentiment < lowSentiment) {
                  thumb = (
                    <img
                      src={require("../../img/thumbsDown.png")}
                      style={{ width: 30, height: 30, marginLeft: 10 }}
                    />
                  );
                } else {
                  thumb = (
                    <img
                      src={require("../../img/thumbsNeutral.png")}
                      style={{ width: 30, height: 30, marginLeft: 10 }}
                    />
                  );
                }
                return (
                  <ListItem key={company.name} className={classes.listItem}>
                    <Button
                      className={classes.listItemNameButton}
                      color="inherit"
                      onClick={() => {
                        this.setState({
                          selectedCompany: company,
                          view: "articleList"
                        });
                      }}
                    >
                      {this.props.companies.allCompanies[idx]}
                    </Button>
                    <Button
                      className={classes.listItemDataButton}
                      onClick={() => {
                        this.setState({
                          selectedCompany: company,
                          view: "chart"
                        });
                      }}
                    >
                      <div>{`Price: ${company.price}`}</div>
                      <div className={classes.sentimentContainer}>
                        view:
                        {thumb}
                      </div>
                    </Button>
                    <Button
                      className={classes.listItemInfoButton}
                      onClick={() => {
                        this.setState({
                          selectedCompany: company,
                          view: "settings"
                        });
                      }}
                    >
                      <InfoIcon />
                    </Button>
                  </ListItem>
                );
              })}
            </List>
          </div>
        );
      case "settings":
        return (
          <div className={classes.root}>
            <Settings
              name={this.state.selectedCompany.name}
              onBackButtonClick={this.goHome}
            />
          </div>
        );
      case "chart":
        // layout
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
      case "articleList":
        return (
          <div className={classes.root}>
            <ArticleList
              articles={this.props.articles.historicalArticles}
              onBackButtonClick={this.goHome}
            />
          </div>
        );
      default:
        return (
          <div>
            <h1>prices: {this.props.prices.recentPrice}</h1>
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
  prices: state.prices,
  companies: state.companies
});

const mapDispatch = dispatch => ({
  getMostRecentPrice: company =>
    storeThunker.dispatch(fetchMostRecentPrice(company)),
  getHistoricalPrices: (company, time) =>
    storeThunker.dispatch(fetchHistoricalPrices(company, time)),
  getHistoricalArticles: (company, time) =>
    storeThunker.dispatch(fetchHistoricalArticles(company, time))
});

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(hot(module)(PopupHome))
);
