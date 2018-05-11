import {
  CHANGE_LANGUAGE,
} from '../../actions/action_types'

const INITIAL_STATE = {
  selected_language: 'en',
  node_env: 'DEVELOPMENT',
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        selected_language: action.payload,
      }
    case 'CHANGE_ENV':
      return {
        ...state,
        node_env: action.payload
      }
		default:
			return {
				...state
			}
	}
}
