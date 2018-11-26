import React from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import ArticleList from './components/ArticleList';
import Chart from './components/Chart';
import Settings from './components/Settings';
import {fetchMostRecentPrice, fetchHistoricalPrices, fetchHistoricalArticles} from '../store';
import {storeThunker} from '../popup';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import {Switch} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import SnackbarContent from '@material-ui/core/SnackbarContent';

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

const styles = (theme) => ({
	root: {
		display: 'flex',
		//backgroundColor: "#333",
		flexDirection: 'column',
		width: '100%',
		maxWidth: '550px',
		backgroundColor: theme.palette.background.paper,
		height: '400px',
		alignItems: 'center'
	},
	header: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		maxWidth: '550px',
		alignItems: 'center',
		height: '30%',
		margin: theme.spacing.unit,
		color: 'red',
		alignContent: 'center'
	},
	list: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		maxWidth: '550px',
		backgroundColor: theme.palette.background.paper
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
	},
	snackbar: {
		display: 'flex',
		width: '100%',
		height: '30%',
		margin: theme.spacing.unit,
		alignItems: 'center',
		color: 'red',
		alignContent: 'center'
	}
});

class PopupHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCompany: '',
			view: 'home'
		};
		this.goHome = this.goHome.bind(this);
	}

	componentDidMount() {
		this.props.getMostRecentPrice('aapl');
		Object.keys(this.props.companies).map((company) => this.props.getMostRecentPrice(company));
		// this.props.getHistoricalPrices('aapl', '5d');
		// this.props.getHistoricalArticles('aapl', 600000);
	}

	goHome() {
		this.setState({
			selectedCompany: '',
			view: 'home'
		});
	}
	render() {
		if (!this.props.companies.aapl.recentPrice) {
			return <div />;
		}
		const historicalPrices = this.props.companies.aapl.historicalPrices;
		const recentPrice = this.props.companies.aapl.recentPrice;
		const historicalArticles = this.props.articles.historicalArticles;

		console.log(this.props.companies, ' --> companies');

		const companyArray = [
			{
				name: 'AAPL',
				price: `$ ${recentPrice}`,
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
						<SnackbarContent action={action} className={classes.header} />
						<h1 className={classes.header} style={{fontFamily: 'Impact', fontSize: 33, color: '#333'}}>
							makes¢ents
						</h1>
						<List className={classes.list}>
							{/* clever way to map through an Object:
							 let obj = { first: 'someVal' };
							obj[Object.keys(obj)[0]] //returns 'someVal' */}

							{Object.keys(this.props.companies).map((company, idx) => {
								return (
									<div key={company}>
										<ListItem key={company} className={classes.listItem}>
											<Button
												className={classes.listItemNameButton}
												color="inherit"
												onClick={() => {
													this.setState({
														selectedCompany: company,
														view: 'articleList'
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
														view: 'chart'
													});
												}}
											>
												<div>
													{`Price: ${this.props.companies[
														Object.keys(this.props.companies)[idx]
													].recentPrice}`}
												</div>
												<div>
													{`view: ${this.props.companies[
														Object.keys(this.props.companies)[idx]
													].view}`}
												</div>
											</Button>
											<Button
												className={classes.listItemInfoButton}
												onClick={() => {
													this.setState({
														selectedCompany: company,
														view: 'settings'
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
						<Settings name={this.state.selectedCompany.name} onBackButtonClick={this.goHome} />
					</div>
				);
			case 'chart':
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
			case 'articleList':
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
						{/* <h1>prices: {this.props.companies.aapl.recentPrice}</h1> */}
						{/* <h1>count: {this.props.articles.historicalArticles[0].title}</h1> */}
						<Button color="primary">Button 1</Button>
						<Button color="primary">Button 2</Button>
					</div>
				);
		}
	}
}

const mapState = (state) => ({
	articles: state.articles,
	// prices: state.prices,
	companies: state.companies
});

const mapDispatch = (dispatch) => ({
	getMostRecentPrice: (company) => storeThunker.dispatch(fetchMostRecentPrice(company)),
	getHistoricalPrices: (company, time) => storeThunker.dispatch(fetchHistoricalPrices(company, time)),
	getHistoricalArticles: (company, time) => storeThunker.dispatch(fetchHistoricalArticles(company, time))
});

export default withStyles(styles)(connect(mapState, mapDispatch)(hot(module)(PopupHome)));
