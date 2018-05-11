// Compt for copying as a HomePage
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
	WhiteSpace,
	Button,
} from 'antd-mobile'
import { changeNodeENV } from '../../actions/app/app_actions'
import DomainMaps from '../modules/DomainMaps'
import TypeformMaps from '../modules/TypeformMaps'
import IntentTypeformMaps from '../modules/IntentTypeformMaps'


class HomePage extends Component {

	render() {
		return (
			<div id='HomePage' style={comStyles().container}>
				Status Page - {this.props.node_env}
				<WhiteSpace />
				<Button onClick={() => this.props.changeNodeENV('DEVELOPMENT')} type='primary'>DEVELOPMENT</Button><WhiteSpace />
				<Button onClick={() => this.props.changeNodeENV('STAGING')} type='primary'>STAGING</Button><WhiteSpace />
				<Button onClick={() => this.props.changeNodeENV('PRODUCTION')} type='warning'>PRODUCTION</Button><WhiteSpace />

				<WhiteSpace /><WhiteSpace /><WhiteSpace /><WhiteSpace />
				<DomainMaps />

				<WhiteSpace /><WhiteSpace /><WhiteSpace /><WhiteSpace />
				<TypeformMaps />

				<WhiteSpace /><WhiteSpace /><WhiteSpace /><WhiteSpace />
				<IntentTypeformMaps />
			</div>
		)
	}
}

// defines the types of variables in this.props
HomePage.propTypes = {
	history: PropTypes.object.isRequired,
	node_env: PropTypes.string.isRequired,
}

// for all optional props, define a default value
HomePage.defaultProps = {
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(HomePage)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
		node_env: redux.app.node_env
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
		changeNodeENV,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'column',
		}
	}
}
