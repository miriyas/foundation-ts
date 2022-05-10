// import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import styles from './TodoList.module.scss'
import TodoItem from './Item'
import { useRecoil } from 'hooks/state'
import { todoListState } from 'states/todo'

const TodoList = () => {
  const [todoList] = useRecoil(todoListState)

  // const todoList111 = useRecoilValue(todoListState)
  // const setTodoList111 = useSetRecoilState(todoListState)
  // const [todo, setTodo] = useRecoilState(todoListState)
  // const resetTodo = useResetRecoilState(todoListState)

  // const [, setTodoList] = useRecoil(todoListState)
  // const [,, resetTodoList] = useRecoil(todoListState)

  const handleAddClick = () => {
    // console.log('handleAddClick')
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.centering}>
        <h1>Hi! this is your assignment.</h1>
        <ul className={styles.tasks}>
          <p className={styles.tasksTitle}>Today&apos;s</p>
          {todoList.map((todo) => (
            <TodoItem key={`todo-${todo.id}`} todo={todo} />
          ))}
        </ul>
        <button type='button' className={styles.addButton} onClick={handleAddClick} aria-label='Add button' />
      </div>
    </div>
  )
}

export default TodoList
