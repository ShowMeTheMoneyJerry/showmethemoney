import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

class ArticleList extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: [
        {
          title: "test1"
        },
        {
          title: "test2"
        },
        {
          title: "test"
        },
        {
          title: "test"
        },
        {
          title: "test"
        },
        {
          title: "test"
        }
      ]
    };
  }

  render() {
    return (
      <List>
        Articles
        {this.state.articles.map(article => {
          return <div>{article.title} </div>;
        })}
      </List>
    );
  }
}

export default ArticleList;
