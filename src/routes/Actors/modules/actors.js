// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_ACTORS = 'REQUEST_ACTORS'
export const RECEIVED_ACTORS = 'RECEIVED_ACTORS'

// ------------------------------------
// Actions
// ------------------------------------
export const requestActors = (state) => {
  return {
    type: REQUEST_ACTORS
  }
}

export const receiveActors = (actors) => {
  return {
    type: RECEIVED_ACTORS,
    actors,
    completed: Date.now()
  }
}

export const fetchActors = () => {
  return (dispatch, getState) => {
    let actors = getState().actors;
    if(actors.length > 0) {
      dispatch(receiveActors(actors));
      return;
    }
    dispatch(requestActors);
    return fetch('https://nuvi-challenge.herokuapp.com/activities')
      .then(res => res.json())
      .then(json => {
        dispatch(receiveActors(json))
      })
      .catch( (err) => {
        console.log(err)
      }
    )
  }
}

export const actions = {
  fetchActors
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVED_ACTORS] : (state, action) => {
    return action.actors;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function actorReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
