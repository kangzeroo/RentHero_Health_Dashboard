import {
  CHANGE_LANGUAGE,
  CHANGE_ENV,
  CHANGE_CHOSEN_MAP,
} from '../../actions/action_types'

const INITIAL_STATE = {
  selected_language: 'en',
  node_env: 'development',
  chosen_map: 'domain',
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
    case CHANGE_CHOSEN_MAP:
      return {
        ...state,
        chosen_map: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
