import React from 'react'

const AddTodo = ({handleOnSubmit, handleOnChange, inputText}) => {
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        handleOnSubmit() 
      }}>
        <input value={inputText}　onChange={e => { handleOnChange(e.target.value) }　} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
export default AddTodo

