// Compt for copying as a IntentTypeformMaps
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


class IntentTypeformMaps extends Component {

    constructor() {
      super()
      this.state = {
        mapping: ''
      }
    }

    componentDidMount() {
      setTimeout(() => {
        this.fetchMapping()
      }, 1000)
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.node_env !== this.props.node_env) {
        this.fetchMapping()
      }
    }

    fetchMapping() {
      const header = {
        headers: {}
      }
      axios.get(`https://s3.amazonaws.com/renthero-ai-mappings/dialogflow/${this.props.node_env.toLowerCase()}/advanced_typeform/advanced_elastic_dialog_map.json`, header)
        .then((data) => {
          console.log(data.data)
          this.setState({ mapping: JSON.stringify(data.data) })
        })
        .catch((err) => {
          console.log(err)
          this.setState({ mapping: '' })
        })
    }

  	render() {
  		return (
  			<div id='DomainMaps' style={comStyles().container}>
  				IntentTypeformMaps
          <br />
          {
            this.state.mapping
          }
  			</div>
  		)
  	}
}

// defines the types of variables in this.props
IntentTypeformMaps.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
IntentTypeformMaps.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(IntentTypeformMaps)

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
