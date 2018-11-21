import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { hot } from "react-hot-loader";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: "#333",
    flexDirection: "column",
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
    color: theme.palette.getContrastText("#BDBDBD"),
    backgroundColor: "#BDBDBD",
    "&:hover": {
      backgroundColor: "#BDBDBD"
    }
  },
  listItemDataButton: {
    margin: theme.spacing.unit,
    display: "flex",
    flex: 4,
    justifyContent: "space-between",
    flexDirection: "row",
    textTransform: "none",
    color: theme.palette.getContrastText("#AED581"),
    backgroundColor: "#AED581",
    "&:hover": {
      backgroundColor: "#AED581"
    }
  },
  listItemInfoButton: {
    color: "white"
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
  }
});

class popUpHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const companyArray = [
      {
        name: "AAPL",
        price: "$ 200.12",
        sentiment: "30%"
      },
      {
        name: "SPCX",
        price: "$ 20.56",
        sentiment: "100%"
      },
      {
        name: "TSLA",
        price: "$ 80.00",
        sentiment: "90%"
      }
    ];
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1 style={{ fontFamily: "Impact", fontSize: 33, color: "white" }}>
          MakeCent$
        </h1>
        <List className={classes.list}>
          {companyArray.map(company => {
            return (
              <ListItem key={company.name} className={classes.listItem}>
                <Button className={classes.listItemNameButton} color="inherit">
                  {company.name}
                </Button>
                <Button className={classes.listItemDataButton}>
                  <div>{`Price: ${company.price}`}</div>
                  <div>{`Sentim: ${company.sentiment}`}</div>
                </Button>
                <Button className={classes.listItemInfoButton}>
                  <InfoIcon />
                </Button>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(hot(module)(popUpHome));
