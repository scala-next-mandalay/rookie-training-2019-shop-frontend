import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import { 
  fetchAllTodos, 
  toggleComplete,
  getVisibleTodos,
} from '../modules/todos'

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos.todos, state.todos.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  toggleComplete: id => dispatch(toggleComplete(id)),
  fetchAllTodos: () => dispatch(fetchAllTodos()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
