import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const styles = theme => ({
  root: {
    backgroundColor: "#faf9f9"
  },
  sectionTitle: {
    fontSize: 14,
    marginLeft: 22
  },
  articleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "white",
    borderStyle: "solid"
  },
  titleContainer: {
    display: "flex",
    marginTop: 10,
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    fontFamily: "Impact",
    fontSize: 33,
    marginRight: 64,
    color: "#333",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold"
  },
  articleTitleContainer: {
    marginLeft: 20,
    display: "flex",
    padding: 5,
    flexDirection: "column"
  },
  articleTitle: {
    fontSize: 20,
    flex: 1,
    fontWeight: "bold"
  },
  sentiment: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    borderRadius: 4,
    padding: 10,
    width: 15,
    height: 15,
    backgroundColor: "#AED590"
  },
  date: {
    fontSize: 15,
    marginBottom: 3,
    fontWeight: "bold",
    color: "#717171"
  },
  link: {
    "&:link": {
      color: "black"
    },
    "&:hover": {
      color: "#128fa6"
    }
  }
});
class ArticleList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.titleContainer}>
          <Button
            onClick={() => {
              this.props.onBackButtonClick();
            }}
          >
            <ArrowBackIcon />
          </Button>
          <div className={classes.title}>Articles</div>
        </div>
        <div className={classes.sectionTitle}>Score</div>
        <List>
          {this.props.articles.map((article, idx) => {
            const date = new Date(article.date);
            return (
              <ListItem className={classes.articleContainer} key={idx}>
                <div className={classes.sentiment}>{article.sentiment}</div>
                <div className={classes.articleTitleContainer}>
                  <div className={classes.date}>{date.toLocaleString()}</div>
                  <div className={classes.articleTitle}>
                    <a
                      href={article.link}
                      target="_blank"
                      className={classes.link}
                    >
                      {article.title}
                    </a>
                  </div>
                </div>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(ArticleList);
