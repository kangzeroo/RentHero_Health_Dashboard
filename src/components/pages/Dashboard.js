// Compt for copying as a Dashboard
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
} from 'antd-mobile'
import { Button, Menu, Dropdown, Icon, message } from 'antd'
import { changeNodeENV, changeChosenDomain } from '../../actions/app/app_actions'
import TypeformMappings from '../modules/TypeformMappings'
import DomainMappings from '../modules/DomainMappings'


class Dashboard extends Component {

  renderNodeENVS() {
      const handleMenuClick = (e) => {
        if (e.key == ".$1"){
          message.info('Development')
          this.props.changeNodeENV('development')
        }
        else if (e.key == ".$2") {
          message.info('Staging')
          this.props.changeNodeENV('staging')
        }
        else if (e.key == ".$3") {
          message.info('Production')
          this.props.changeNodeENV('production')
        }
      }
      const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1">DEVELOPMENT</Menu.Item>
          <Menu.Item key="2">STAGING</Menu.Item>
          <Menu.Item key="3">PRODUCTION</Menu.Item>
        </Menu>
      )
    return (
      <div>
        <Dropdown overlay={menu}>
         <Button style={{ marginLeft: 8 }}>
           {this.props.node_env} <Icon type="down" />
         </Button>
        </Dropdown>
      </div>
    )
  }

  renderDomainChoices() {
    const handleMenuClick = (e) => {
      if (e.key == ".$4"){
        message.info('Geo')
        this.props.changeChosenDomain('geo')
      }
      else if (e.key == ".$5") {
        message.info('Searching')
        this.props.changeChosenDomain('searching')
      }
      else if (e.key == ".$6"){
        message.info('Meta')
        this.props.changeChosenDomain('meta')
      }
      else if (e.key == ".$7"){
        message.info('General')
        this.props.changeChosenDomain('general')
      }
      else if (e.key == ".$8"){
        message.info('Tours')
        this.props.changeChosenDomain('tours')
      }
      else if (e.key == ".$9"){
        message.info('Spec_struc')
        this.props.changeChosenDomain('spec_struc')
      }
      else {
        message.info('Spec_unstruc')
        this.props.changeChosenDomain('spec_unstruc')
      }
    }
    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="4">GEO</Menu.Item>
        <Menu.Item key="5">SEARCHING</Menu.Item>
        <Menu.Item key="6">META</Menu.Item>
        <Menu.Item key="7">GENERAL</Menu.Item>
        <Menu.Item key="8">TOURS</Menu.Item>
        <Menu.Item key="9">SPEC_STRUC</Menu.Item>
        <Menu.Item key="10">SPEC_UNSTRUC</Menu.Item>
      </Menu>
    )
    return (
      <div>
        <Dropdown overlay={menu}>
         <Button style={{ marginLeft: 8 }}>
           {this.props.chosen_domain} <Icon type="down" />
         </Button>
        </Dropdown>
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
        <div style={comStyles().dropdowns}>
          {
            this.renderNodeENVS()
          }
          {
            this.renderDomainChoices()
          }
        </div>
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
      backgroundColor: 'lightblue',
      padding: '10px',
      textAlign: 'center',
		},
    dropdowns: {
      textAlign: 'center',
		}
	}
}
