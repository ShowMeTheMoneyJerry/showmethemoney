import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';

const styles = (theme) => ({
	appFrame: {
		width: 360,
		height: 360,
		backgroundColor: 'white'
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	button: {
		margin: theme.spacing.unit
		// backgroundColor: '#faf9f9'
	},
	textField: {
		width: 200,
		fullwidth: 'true',
		transformOrigin: 'left'
	},
	snackbar: {
		position: 'relative',
		backgroundColor: '#faf9f9'
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	}
});

class Search extends React.Component {
	constructor() {
		super();
		this.state = {
			open: false,
			name: ''
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClick() {
		this.setState({open: !this.state.open});
	}
	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		});
	};

	render() {
		const {classes} = this.props;
		const {open} = this.state;
		return (
			<div>
				<TextField
					id="standard-name"
					label="Add Company"
					className={classes.textField}
					value={this.state.name}
					onChange={this.handleChange('name')}
					onSubmit={() => this.props.addCompany(this.state.name)}
					margin="normal"
				/>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={() => this.props.addCompany(this.state.name)}
				>
					{/* <Icon className={classes.rightIcon} size="small">
						add
					</Icon> */}
					<AddIcon className={classes.rightIcon} />
				</Button>
			</div>
		);
	}
}

export default withStyles(styles)(Search);
