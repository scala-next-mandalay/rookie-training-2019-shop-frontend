import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, fetchAllTodos, toggleComplete }) => {
  fetchAllTodos()
  return (
    <ul>{
      todos.map(todo =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={e => {
            e.preventDefault()
            toggleComplete(todo.id)
          }}
        />
    )
    }</ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  toggleComplete: PropTypes.func.isRequired
}

export default TodoList