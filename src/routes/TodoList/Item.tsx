import { ChangeEvent } from 'react'
import cx from 'classnames'
import styles from './TodoList.module.scss'

import { useEffect, useState, usePrevious, useTimeoutFn } from 'hooks'
import { useRecoil } from 'hooks/state'
import { todoListState } from 'states/todo'
import { ITodoItem } from 'types/todo.d'

import { CheckIcon } from '../../assets/svgs'

interface Props {
  todo: ITodoItem
}

const TodoItem = ({ todo }: Props) => {
  const { done, id, title } = todo
  const prevDone = usePrevious(done)
  const [isDone, setIsDone] = useState(done)

  const [, setTodoList] = useRecoil(todoListState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget

    setTodoList((prev) => {
      return prev.map((item) => (item.id === Number(id) ? { ...item, done: checked } : item))
    })
  }

  const [plantSetIsDone] = useTimeoutFn(() => setIsDone(true), 500)

  useEffect(() => {
    if (prevDone === undefined || prevDone === done) return
    if (done) {
      plantSetIsDone()
    } else {
      setIsDone(done)
    }
  }, [done, plantSetIsDone, prevDone])

  return (
    <li className={cx(styles.task, { [styles.done]: isDone })}>
      <div className={styles.checkboxWrapper}>
        <input type='checkbox' checked={done} onChange={handleChange} />
        <CheckIcon />
      </div>
      <p className={styles.title}>{title}</p>
    </li>
  )
}

export default TodoItem
