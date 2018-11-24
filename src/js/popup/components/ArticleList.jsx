import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class ArticleList extends React.Component {
	render() {
		return (
			<div>
				Articles
				<List>
					{this.props.articles.map((article, idx) => (
						<ListItem key={idx}>
							title:
							{article.title}
							date:
							{article.date}
							sentiment:
							{article.sentiment}
						</ListItem>
					))}
				</List>
			</div>
		);
	}
}

export default ArticleList;
