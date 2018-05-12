// Compt for copying as a TypeformMappings
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import { getBasicFormMappings, getAdvancedFormMappings, getSeekingFormMappings } from '../../api/mappings/mappings_api'


class TypeformMappings extends Component {

  constructor() {
    super()
    this.state = {
      intentMap: null,
      typeformMap: null,
      intentRelationships: [],
      typeformQuestions: [],
      search_string: '',
    }
  }

  componentWillMount() {
    this.updateMaps()
            .then((data) => {
              this.setState({
                intentMap: data[0],
                typeformMap: data[1],
                intentRelationships: data[0].relationships,
                typeformQuestions: data[1].questions,
              }, () => console.log(this.state))
            })
            .catch((err) => {
              console.log(err)
            })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.node_env !== this.props.node_env || prevProps.chosen_map !== this.props.chosen_map) {
      this.updateMaps().then((data) => {
        console.log(data)
        this.setState({
          intentMap: data[0],
          typeformMap: data[1],
          intentRelationships: data[0].relationships,
          typeformQuestions: data[1].questions,
        }, () => console.log(this.state))
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  updateMaps() {
    if (this.props.chosen_map === 'basic') {
      return getBasicFormMappings(this.props.node_env)
    } else if (this.props.chosen_map === 'advanced') {
      return getAdvancedFormMappings(this.props.node_env)
    } else if (this.props.chosen_map === 'seeking') {
      return getSeekingFormMappings(this.props.node_env)
    }
  }

  renderVisualMaps() {
    const relationships = this.state.intentRelationships.filter((rel) => {
      return rel.dialogFlow_intentID.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1 || rel.dialogFlow_intentName.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1 || JSON.stringify(rel.typeForm_Tags).toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1
    })
    const questions = this.state.typeformQuestions.filter((ques) => {
      return ques.sample_phrasing.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1 || JSON.stringify(ques.question_ids).toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1 || JSON.stringify(ques.tag_ids).toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1
    })
    console.log(relationships)
    console.log(questions)
    return (
      <div>
        <input value={this.state.search_string} onChange={(e) => this.setState({ search_string: e.target.value })} />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <h2>Intent-to-Tags Mappings</h2>
            <h4>FORM ID: {this.state.intentMap.form_id}</h4>
            {
              relationships.map((rel) => {
                return (
                  <div key={rel.dialogFlow_intentID}>
                    <div><b>ID: </b>{rel.dialogFlow_intentID}</div>
                    <div><b>NAME: </b>{rel.dialogFlow_intentName}</div>
                    <div style={comStyles().tag}><b>TAGS: </b>{JSON.stringify(rel.typeForm_Tags)}</div>
                  </div>
                )
              })
            }
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <h2>Typeform-to-Tags Mappings</h2>
            <h4>FORM ID: {(this.state.typeformMap.form_id)}</h4>
            {
              questions.map((ques) => {
                return (
                  <div key={JSON.stringify(ques.question_ids)}>
                    <div><b>ID: </b>{JSON.stringify(ques.question_ids)}</div>
                    <div><b>QUESTION: </b>{ques.sample_phrasing}</div>
                    <div style={comStyles().tag}><b>TAGS: </b>{JSON.stringify(ques.tag_ids)}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }

	render() {
		return (
			<div id='TypeformMappings' style={comStyles().container}>
				<h1>{this.props.chosen_map} TypeformMappings for {this.props.node_env}</h1>
        {
          this.state.intentMap && this.state.typeformMap
          ?
          this.renderVisualMaps()
          :
          null
        }
			</div>
		)
	}
}

// defines the types of variables in this.props
TypeformMappings.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
TypeformMappings.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(TypeformMappings)

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

	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'column',
		},
    tag: {
      fontSize: '1.5rem',
      color: 'blue',
      fontWeight: 'bold',
    }
	}
}
