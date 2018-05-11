// Compt for copying as a DomainMaps
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'


class DomainMaps extends Component {

	render() {
		return (
			<div id='DomainMaps' style={comStyles().container}>
				DomainMaps
			</div>
		)
	}
}

// defines the types of variables in this.props
DomainMaps.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
DomainMaps.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(DomainMaps)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    node_env: redux.app.node_env,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {

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
