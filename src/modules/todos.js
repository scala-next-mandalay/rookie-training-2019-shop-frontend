import axios from 'axios'

export const URL_POST_TODO = 'http://localhost/api/todos'
export const URL_GET_ALL_TODOS = 'http://localhost/api/todos'
export const URL_TOGGLE_COMPLETE_TODOS = 'http://localhost/api/todos/togglecomplete'

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

const initialState = {
  inputText: '',
  todos: [],
  alreadyFetched: false,
  visibilityFilter: VisibilityFilters.SHOW_ALL
}

export const　todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return {
        ...state,
        visibilityFilter: action.payload
      }
    case 'ON_CHANGE_TODOS':
      return {
        ...state,
        inputText: action.payload
      }
    case 'ON_SUBMIT_TODOS_DONE':
      return {
        ...state,
        inputText: '',
        todos: action.payload
      }
    case 'FETCH_TODOS_DONE':
      return {
        ...state,
        todos: action.payload
      }
    case 'SET_ALREADY_FETCHED':
      return {
        ...state,
        alreadyFetched: true
      }
    case 'TOGGLE_COMPLETE_DONE':
      return {
        ...state,
        todos: action.payload
      }
    default:
      return state
  }
}

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

//=============================================================================
//　ActionCreators
//=============================================================================

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  payload: filter
})

export const handleOnChange = value => ({
  type: 'ON_CHANGE_TODOS',
  payload: value
})

export const toggleComplete = (id) => {
  return async (dispatch, getState) => {
    const axRes = await axios.get(URL_TOGGLE_COMPLETE_TODOS+'/'+id)

    let newTodos = [];
    Object.assign(newTodos , getState().todos.todos);
    for (const i in newTodos) {
      if (newTodos[i].id === id) {
        newTodos[i] = axRes.data.data
        break
      }
    }

    dispatch({
      type: 'TOGGLE_COMPLETE_DONE',
      payload: newTodos
    })
  }
}

export const fetchAllTodos = () => {
  return async (dispatch, getState) => {
    if (getState().todos.alreadyFetched) {
      return
    }

    dispatch({
      type: 'SET_ALREADY_FETCHED'
    })

    const axRes = await axios.get(URL_GET_ALL_TODOS)
    dispatch({
      type: 'FETCH_TODOS_DONE',
      payload: axRes.data.data
    })
  }
}

export const handleOnSubmit = () => {
  return async (dispatch, getState) => {      
    const axRes = await axios.post(URL_POST_TODO, {text: getState().todos.inputText})
    
    let newTodos = [];
    Object.assign(newTodos , getState().todos.todos);
    newTodos.push(axRes.data.data)

    dispatch({
      type: 'ON_SUBMIT_TODOS_DONE',
      payload: newTodos
    })
  }
}
