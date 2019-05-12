import { 
  todosReducer, 
  VisibilityFilters,
} from './todos'

describe('todos reducer', () => {
  let testState
  beforeEach(() => {
    testState = {
      inputText: 'test',
      todos: [],
      alreadyFetched: false,
      visibilityFilter: VisibilityFilters.SHOW_ALL
    }
  });
  
  it('should handle initial state', () => {
    const input = {}

    //If type is undefined, the return value will be initialStore.
    const expectedValue = {
      inputText: '',
      todos: [],
      alreadyFetched: false,
      visibilityFilter: VisibilityFilters.SHOW_ALL
    }

    expect(todosReducer(undefined, input)).toEqual(expectedValue)
  })

  it('should handle SET_VISIBILITY_FILTER', () => {
    const allTypes = [
      VisibilityFilters.SHOW_ALL,
      VisibilityFilters.SHOW_COMPLETED,
      VisibilityFilters.SHOW_ACTIVE,
    ]

    for (const myType of allTypes) {
      const input = {
        type: 'SET_VISIBILITY_FILTER',
        payload: myType
      }

      //"visibilityFilter" value will be change.
      const expectedValue = Object.assign({}, testState);
      expectedValue.visibilityFilter = myType

      expect(todosReducer(testState, input)).toEqual(expectedValue)
    }
  })

  it('should handle ON_CHANGE_TODOS', () => {
    const expectedValue = Object.assign({}, testState);

    const expectedStrs = ['a','ab', 'abc']
    for (const expectedStr of expectedStrs) {
      const input = {
        type: 'ON_CHANGE_TODOS',
        payload: expectedStr
      }

      //"inputText" value will be change.
      expectedValue.inputText = expectedStr
      expect(todosReducer(testState, input)).toEqual(expectedValue)
      testState.inputText = expectedStr
    }
  })

  it('should handle ON_SUBMIT_TODOS_DONE', () => {
    const expectedTodos = [
      {id:1, text:"text1", completed:false}, 
      {id:2, text:"text2", completed:true}
    ]

    //"todos" list will be change.
    //And "inputText" value will be change.
    const expectedValue = Object.assign({}, testState);
    expectedValue.inputText = ''
    Object.assign(expectedValue.todos , expectedTodos);

    const input = {
      type: 'ON_SUBMIT_TODOS_DONE',
      payload: expectedTodos
    }

    expect(todosReducer(testState, input)).toEqual(expectedValue)
  })

  it('should handle FETCH_TODOS_DONE', () => {
    const inputTodos = [{id:1, text:"text1", completed:false},{id:2, text:"text2", completed:true}]
    
    //"todos" list will be change.
    const expectedValue = Object.assign({}, testState);
    Object.assign(expectedValue.todos , inputTodos);
    
    const input = {
      type: 'FETCH_TODOS_DONE',
      payload: inputTodos
    }

    expect(todosReducer(testState, input)).toEqual(expectedValue)
  })

  it('should handle SET_ALREADY_FETCHED', () => {
    testState.alreadyFetched = false
    
    //"alreadyFetched" value will be change.
    const expectedValue = Object.assign({}, testState)
    expectedValue.alreadyFetched = true

    const input = {
      type: 'SET_ALREADY_FETCHED'
    }

    expect(todosReducer(testState, input)).toEqual(expectedValue)
  })

  it('should handle TOGGLE_COMPLETE_DONE', () => {
    const expectedTodos = [
      {id:1, text:"text1", completed:false}, 
      {id:2, text:"text2", completed:true}
    ]

    Object.assign(testState.todos , expectedTodos);
    
    //a "todo" object and "todos" list will be change.
    const expectedValue = Object.assign({}, testState)

    const input = {
      type: 'TOGGLE_COMPLETE_DONE',
      payload: expectedTodos
    }

    expect(todosReducer(testState, input)).toEqual(expectedValue)
  })
})
