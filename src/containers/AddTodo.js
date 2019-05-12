import { connect } from 'react-redux'
import AddTodo from '../components/AddTodo'
import { handleOnChange, handleOnSubmit } from '../modules/todos'

const mapStateToProps = ({todos}) => ({
  inputText: todos.inputText,
  todos: []
})

const mapDispatchToProps = dispatch => ({
  handleOnChange: value => dispatch(handleOnChange(value)),
  handleOnSubmit: () => dispatch(handleOnSubmit()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
