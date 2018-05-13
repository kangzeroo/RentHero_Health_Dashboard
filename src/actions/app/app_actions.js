import {
  CHANGE_LANGUAGE,
  CHANGE_ENV,
  CHANGE_CHOSEN_DOMAIN,
  CHANGE_CHOSEN_TYPEFORM,
} from '../action_types'

// change the language of the app
export const changeAppLanguage = (languageCode) => {
  // dispatch lets you send actions to Redux
  localStorage.setItem('rentburrow_lang', languageCode)
  return (dispatch) => {
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: languageCode,
    })
  }
}

export const changeNodeENV = (env) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_ENV,
      payload: env
    })
  }
}

export const changeChosenDomain = (domain) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_CHOSEN_DOMAIN,
      payload: domain
    })
  }
}

export const changeChosenTypeform = (typeform) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_CHOSEN_TYPEFORM,
      payload: typeform
    })
  }
}
