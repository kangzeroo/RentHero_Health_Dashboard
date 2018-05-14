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
import { Button, Menu, Dropdown, Icon, message, Card, Table } from 'antd'
import { changeChosenTypeform } from '../../actions/app/app_actions'
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
    if (prevProps.node_env !== this.props.node_env || prevProps.chosen_typeform !== this.props.chosen_typeform) {
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
    if (this.props.chosen_typeform === 'basic') {
      return getBasicFormMappings(this.props.node_env)
    } else if (this.props.chosen_typeform === 'advanced') {
      return getAdvancedFormMappings(this.props.node_env)
    } else if (this.props.chosen_typeform === 'seeking') {
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
    const intentTagColumn = [{
			title: 'INTENT ID',
			dataIndex: 'dialogFlow_intentID',
		}, {
			title: 'INTENT NAME',
			dataIndex: 'dialogFlow_intentName',
		}, {
			title: 'TAG',
			dataIndex: 'typeForm_Tags',
		}]
    const questionTagColumn = [{
      title: 'QUESTION ID',
      dataIndex: 'question_ids',
    }, {
      title: 'QUESTION',
      dataIndex: 'sample_phrasing',
    }, {
      title: 'TAG',
      dataIndex: 'tag_ids',
    }]
    return (
      <div>
        <br />
        <input value={this.state.search_string} placeholder='Filter Typeforms' onChange={(e) => this.setState({ search_string: e.target.value })} />
        <div style={{ display: 'flex', flexDirection: 'row',}}>
          <div style={{ flexDirection: 'column', textAlign: 'center' }}>
            <h2>Intent-to-Tags Mappings</h2>
            <h4>FORM ID: {this.state.intentMap.form_id}</h4>
            {
              <div>
                <Table columns={intentTagColumn} dataSource={relationships}/>
              </div>
            }

          </div>
          <div style={{ flexDirection: 'column', textAlign: 'center' }}>
            <h2>Typeform-to-Tags Mappings</h2>
            <h4>FORM ID: {(this.state.typeformMap.form_id)}</h4>
            {
              <div>
                <Table columns={questionTagColumn} dataSource={questions}/>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

  renderChoices() {
    const handleMenuClick = (e) => {
      if (e.key == ".$11"){
        message.info('Basic')
        this.props.changeChosenTypeform('basic')
      }
      else if (e.key == ".$12") {
        message.info('Advanced')
        this.props.changeChosenTypeform('advanced')
      }
      else if (e.key == ".$13") {
        message.info('Seeking')
        this.props.changeChosenTypeform('seeking')
      }
    }
    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="11">BASIC</Menu.Item>
        <Menu.Item key="12">ADVANCED</Menu.Item>
        <Menu.Item key="13">SEEKING</Menu.Item>
      </Menu>
    )
    return (
      <div>
        <Dropdown overlay={menu}>
         <Button style={{ marginLeft: 8 }}>
           {this.props.chosen_typeform} <Icon type="down" />
         </Button>
        </Dropdown>
      </div>
    )
  }

	render() {
		return (
			<div id='TypeformMappings' style={comStyles().container}>
        <h1>{this.props.chosen_typeform} TypeformMappings for {this.props.node_env}</h1>
        {
          this.renderChoices()
        }
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
    chosen_typeform: redux.app.chosen_typeform,
    changeChosenTypeform: PropTypes.func.isRequired,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
    changeChosenTypeform,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      padding: '20px',
		},
    tag: {
      fontSize: '1.5rem',
      color: 'blue',
      fontWeight: 'bold',
    }
	}
}
