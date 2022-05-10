import { ChangeEvent } from 'react'

import styles from './TodoList.module.scss'
import { CheckIcon } from '../../assets/svgs'
import { ITodoItem } from 'types/todo.d'
import { useRecoil } from 'hooks/state'
import { todoListState } from 'states/todo'

interface Props {
  todo: ITodoItem
}

const TodoItem = ({ todo }: Props) => {
  const [, setTodoList] = useRecoil(todoListState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { dataset, checked } = e.currentTarget
    const { id } = dataset

    setTodoList((prev) => {
      return prev.map((item) => (item.id === Number(id) ? { ...item, done: checked } : item))
    })
  }

  return (
    <li className={styles.task}>
      <div className={styles.checkboxWrapper}>
        <input type='checkbox' checked={todo.done} data-id={todo.id} onChange={handleChange} />
        <CheckIcon />
      </div>
      <p className={styles.title}>{todo.title}</p>
    </li>
  )
}

export default TodoItem
