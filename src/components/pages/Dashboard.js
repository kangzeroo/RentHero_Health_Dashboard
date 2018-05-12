// Compt for copying as a Dashboard
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  Button,
} from 'antd-mobile'
import { changeNodeENV, changeChosenMapping } from '../../actions/app/app_actions'
import TypeformMappings from '../modules/TypeformMappings'
import DomainMappings from '../modules/DomainMappings'


class Dashboard extends Component {

  renderNodeENVS() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Button onClick={() => this.props.changeNodeENV('development')}>DEVELOPMENT</Button>
        <Button onClick={() => this.props.changeNodeENV('staging')}>STAGING</Button>
        <Button onClick={() => this.props.changeNodeENV('production')}>PRODUCTION</Button>
      </div>
    )
  }

  renderAppropriateDropdown() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Button onClick={() => this.props.changeChosenMapping('domain')}>DOMAIN MAPPINGS</Button>
        <Button onClick={() => this.props.changeChosenMapping('basic')}>BASIC TYPEFORM</Button>
        <Button onClick={() => this.props.changeChosenMapping('advanced')}>ADVANCED TYPEFORM</Button>
        <Button onClick={() => this.props.changeChosenMapping('seeking')}>SEEKING TYPEFORM</Button>
      </div>
    )
  }

  renderUI() {
    if (this.props.chosen_map === 'domain') {
      return (<DomainMappings />)
    } else if (this.props.chosen_map === 'basic' || this.props.chosen_map === 'advanced' || this.props.chosen_map === 'seeking') {
      return (<TypeformMappings />)
    } else {
      return (
        <div>Nothing Selected</div>
      )
    }
  }

	render() {
		return (
			<div id='Dashboard' style={comStyles().container}>
				<h1>RentHero Health Dashboard</h1>
        {
          this.renderNodeENVS()
        }
        {
          this.renderAppropriateDropdown()
        }
        {
          this.renderUI()
        }
			</div>
		)
	}
}

// defines the types of variables in this.props
Dashboard.propTypes = {
	history: PropTypes.object.isRequired,
  changeNodeENV: PropTypes.func.isRequired,
  node_env: PropTypes.string.isRequired,
  changeChosenMapping: PropTypes.func.isRequired,
  chosen_map: PropTypes.string.isRequired,
}

// for all optional props, define a default value
Dashboard.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(Dashboard)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    node_env: redux.app.node_env,
    chosen_map: redux.app.chosen_map,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
    changeNodeENV,
    changeChosenMapping,
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
