import {
  CHANGE_LANGUAGE,
  CHANGE_ENV,
  CHANGE_CHOSEN_DOMAIN,
  CHANGE_CHOSEN_TYPEFORM,
} from '../../actions/action_types'

const INITIAL_STATE = {
  selected_language: 'en',
  node_env: 'development',
  chosen_domain: 'spec_unstruc',
  chosen_typeform: 'basic'
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        selected_language: action.payload,
      }
    case CHANGE_ENV:
      return {
        ...state,
        node_env: action.payload,
      }
    case CHANGE_CHOSEN_DOMAIN:
      return {
        ...state,
        chosen_domain: action.payload,
      }
    case CHANGE_CHOSEN_TYPEFORM:
      return {
        ...state,
        chosen_typeform: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
