import React from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import {Switch} from '@material-ui/core';
import ArticleList from './components/ArticleList';
import Chart from './components/Chart';
import {fetchMostRecentPrice, fetchHistoricalPrices, fetchHistoricalArticles} from '../store';
import {storeThunker} from '../popup';

const styles = (theme) => ({
	root: {
		display: 'flex',
		// backgroundColor: '#333',
		flexDirection: 'column',
		width: '800px',
		height: '500px',
		alignItems: 'center'
	},
	list: {
		display: 'flex',
		flexDirection: 'column'
	},
	listItemNameButton: {
		margin: theme.spacing.unit,
		display: 'flex',
		flex: 1,
		color: theme.palette.getContrastText('#BDBDBD'),
		backgroundColor: '#BDBDBD',
		'&:hover': {
			backgroundColor: '#BDBDBD'
		}
	},
	listItemDataButton: {
		margin: theme.spacing.unit,
		display: 'flex',
		flex: 4,
		justifyContent: 'space-between',
		flexDirection: 'row',
		textTransform: 'none',
		color: theme.palette.getContrastText('#AED581'),

		backgroundColor: '#AED581',
		'&:hover': {
			backgroundColor: '#AED581'
		}
	},
	listItemInfoButton: {
		color: 'white'
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
		borderStyle: 'solid'
	}
});

class PopupHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 'chart'
		};
	}

	componentDidMount() {
		this.props.getMostRecentPrice('aapl');
		this.props.getHistoricalPrices('aapl', '5d');
		this.props.getHistoricalArticles('aapl', 600000);
	}
	render() {
		const historicalPrices = this.props.prices.historicalPrices;
		const recentPrice = this.props.prices.recentPrice;
		const historicalArticles = this.props.articles.historicalArticles;

		const companyArray = [
			{
				name: 'AAPL',
				price: this.props.prices.recentPrice,
				view: 'thumbs-up'
			},
			{
				name: 'SPCX',
				price: '$ 24.56',
				view: 'thumbs-down'
			},
			{
				name: 'TSLA',
				price: '$ 80.00',
				view: 'thumbs-middle'
			}
		];
		const {classes} = this.props;

		switch (this.state.view) {
			case 'home':
				return (
					<div className={classes.root}>
						<h1 style={{fontFamily: 'Impact', fontSize: 33, color: 'white'}}>MakesCent$</h1>
						<List className={classes.list}>
							{companyArray.map((company, idx) => {
								return (
									<ListItem key={idx} className={classes.listItem}>
										<Button className={classes.listItemNameButton} color="inherit">
											{this.props.companies.allCompanies[idx]}
										</Button>
										<Button className={classes.listItemDataButton}>
											<div>{`Price: ${company.price}`}</div>
											<div>{`view: ${company.view}`}</div>
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
			case 'settings':
				return (
					<div>
						<Setting name={companyArray[0].name} />)
					</div>
				);
			case 'chart':
				// layout
				return (
					<div className={classes.root}>
						<Chart
							className={classes.root}
							historicalPricesArr={historicalPrices}
							historicalArticlesArr={historicalArticles}
							recentPrice={recentPrice}
						/>
					</div>
				);
			case 'articleList':
				return (
					<div className={classes.root}>
						<ArticleList articles={this.props.articles.historicalArticles} />
					</div>
				);
			default:
				return (
					<div>
						<h1>prices: {this.props.prices.recentPrice}</h1>
						<Button color="primary">Button 1</Button>
						<Button color="primary">Button 2</Button>
					</div>
				);
		}
	}
}

const mapState = (state) => ({
	articles: state.articles,
	prices: state.prices,
	companies: state.companies
});

const mapDispatch = (dispatch) => ({
	getMostRecentPrice: (company) => storeThunker.dispatch(fetchMostRecentPrice(company)),
	getHistoricalPrices: (company, time) => storeThunker.dispatch(fetchHistoricalPrices(company, time)),
	getHistoricalArticles: (company, time) => storeThunker.dispatch(fetchHistoricalArticles(company, time))
});

export default withStyles(styles)(connect(mapState, mapDispatch)(hot(module)(PopupHome)));
