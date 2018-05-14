// Compt for copying as a DomainMappings
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import { Card } from 'antd'
import { getDomainMappings } from '../../api/mappings/mappings_api'


class DomainMappings extends Component {

	constructor() {
		super()
		this.state = {
			domainMap: null,
			domainRelationships: [],
			search_string: '',
		}
	}

	componentWillMount() {
    this.updateMaps()
            .then((data) => {
              this.setState({
                domainMap: data,
                domainRelationships: data.relationships,
              }, () => console.log(this.state))
            })
            .catch((err) => {
              console.log(err)
            })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.node_env !== this.props.node_env || prevProps.chosen_domain !== this.props.chosen_domain) {
      this.updateMaps().then((data) => {
        console.log(data)
        this.setState({
					domainMap: data,
					domainRelationships: data.relationships,
        }, () => console.log(this.state))
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  updateMaps() {
		let mapName = ''
		if (this.props.chosen_domain === 'geo') {
			mapName = 'geo_intents.json'
		} else if (this.props.chosen_domain === 'searching') {
			mapName = 'searching_intents.json'
		} else if (this.props.chosen_domain === 'meta') {
			mapName = 'meta_intents.json'
		} else if (this.props.chosen_domain === 'general') {
			mapName = 'general_intents.json'
		} else if (this.props.chosen_domain === 'tours') {
			mapName = 'tours_intents.json'
		} else if (this.props.chosen_domain === 'spec_struc') {
			mapName = 'specific_struc_intents.json'
		} else if (this.props.chosen_domain === 'spec_unstruc') {
			mapName = 'specific_unstruc_intents.json'
		}
    return getDomainMappings(this.props.node_env, mapName)
  }

	renderDomainMapping() {
		const relationships = this.state.domainRelationships.filter((rel) => {
			return rel.dialogFlow_intentID.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1 || rel.dialogFlow_intentName.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1 || rel.endpoint.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1
		})
		return (
			<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
				<h2 style={{textAlign: 'center', fontWeight: 'bold'}}>{this.props.chosen_domain}</h2>
				<h4>Domain Prefix ID (should match above domain): {this.state.domainMap.domain_prefix}</h4>
				<div style={comStyles().domainboxes}>
				{
					relationships.map((rel) => {
						return (
							<div key={rel.dialogFlow_intentID} >
								<Card style={{ width: 400, marginTop: '5%'}}>
									<p>ID: <br />d{rel.dialogFlow_intentID} </p>
									<p>NAME: <br />{rel.dialogFlow_intentName}</p>
									<p>ENDPOINT: <br />{rel.endpoint}</p>
								</Card>
							</div>
						)
					})
				}
				</div>
			</div>
		)
	}

	render() {
		return (
			<div id='DomainMappings' style={comStyles().container}>
				<div style={{textAlign: 'center'}}>
				<br />
				<input value={this.state.search_string} placeholder='Filter Domain Mappings' onChange={(e) => this.setState({ search_string: e.target.value })} style={{width: '200px'}} />
				<br />
				</div>
				{
					this.state.domainMap && this.state.domainRelationships && this.state.domainRelationships.length > 0
					?
					this.renderDomainMapping()
					:
					null
				}
			</div>
		)
	}
}

// defines the types of variables in this.props
DomainMappings.propTypes = {
	history: PropTypes.object.isRequired,
	chosen_domain: PropTypes.string.isRequired,
	node_env: PropTypes.string.isRequired,
}

// for all optional props, define a default value
DomainMappings.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(DomainMappings)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
		chosen_domain: redux.app.chosen_domain,
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
			textAlign: 'center'
		},
    tag: {
      fontSize: '1.5rem',
      color: 'blue',
      fontWeight: 'bold',
    },
		domainboxes: {
      display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-around',
		}
	}
}
