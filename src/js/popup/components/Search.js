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

const styles = (theme) => ({
	root: {
		position: 'relative',
		overflow: 'hidden',
		alignItems: 'center'
	},
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
		marginBottom: theme.spacing.unit,
		backgroundColor: '#faf9f9'
	},
	textField: {
		width: 200,
		fullwidth: 'true',
		transformOrigin: 'left'
	},
	snackbar: {
		position: 'absolute',
		backgroundColor: '#faf9f9'
	},
	snackbarContent: {
		width: 360,
		backgroundColor: '#faf9f9'
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
	// handleClose = () => {
	// 	this.setState({open: false});
	// };

	render() {
		const {classes} = this.props;
		const {open} = this.state;
		return (
			<div className={classes.root}>
				<Snackbar
					open={open}
					autoHideDuration={5000}
					onClose={this.handleClick}
					ContentProps={{
						'aria-describedby': 'snackbar-fab-message-id',
						className: classes.snackbarContent
					}}
					message={<span id="snackbar-fab-message-id">Archived</span>}
					action={
						<TextField
							id="standard-name"
							label="Name"
							className={classes.textField}
							value={this.state.name}
							onChange={this.handleChange('name')}
							onSubmit={this.handleClick}
							margin="normal"
						/>
					}
					className={classes.snackbar}
				/>
				<Button className={classes.button} onClick={this.handleClick}>
					Add Company
				</Button>
			</div>
		);
	}
}

export default withStyles(styles)(Search);
