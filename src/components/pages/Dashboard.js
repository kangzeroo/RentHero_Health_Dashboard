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
import { changeNodeENV, changeChosenDomain } from '../../actions/app/app_actions'
import TypeformMappings from '../modules/TypeformMappings'
import DomainMappings from '../modules/DomainMappings'


class Dashboard extends Component {

  renderNodeENVS() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'blue', padding: '10px' }}>
        <Button onClick={() => this.props.changeNodeENV('development')}>DEVELOPMENT</Button>
        <Button onClick={() => this.props.changeNodeENV('staging')}>STAGING</Button>
        <Button onClick={() => this.props.changeNodeENV('production')}>PRODUCTION</Button>
      </div>
    )
  }

  renderDomainChoices() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'red', padding: '10px' }}>
        <Button onClick={() => this.props.changeChosenDomain('geo')}>GEO</Button>
        <Button onClick={() => this.props.changeChosenDomain('searching')}>SEARCHING</Button>
        <Button onClick={() => this.props.changeChosenDomain('meta')}>META</Button>
        <Button onClick={() => this.props.changeChosenDomain('general')}>GENERAL</Button>
        <Button onClick={() => this.props.changeChosenDomain('tours')}>TOURS</Button>
        <Button onClick={() => this.props.changeChosenDomain('spec_struc')}>SPEC_STRUC</Button>
        <Button onClick={() => this.props.changeChosenDomain('spec_unstruc')}>SPEC_UNSTRUC</Button>
      </div>
    )
  }

  renderUI() {
    if (this.props.chosen_domain === 'spec_unstruc') {
      return (<TypeformMappings />)
    } else {
      return null
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
          this.renderDomainChoices()
        }
        <DomainMappings />
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
  changeChosenDomain: PropTypes.func.isRequired,
  chosen_domain: PropTypes.string.isRequired,
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
    chosen_domain: redux.app.chosen_domain,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
    changeNodeENV,
    changeChosenDomain,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'yellow',
      padding: '10px',
		}
	}
}
