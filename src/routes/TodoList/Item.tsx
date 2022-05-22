import { ChangeEvent } from 'react'
import cx from 'classnames'
import styles from './todoList.module.scss'

import { useAppDispatch, useAppSelector, useGA } from 'hooks'
import { getTodoList, setTodoList } from 'states/todo'
import { ITodoItem } from 'types/todo.d'

import { CheckIcon } from '../../assets/svgs'

interface Props {
  todo: ITodoItem
}

const TodoItem = ({ todo }: Props) => {
  const { gaEvent } = useGA()
  const dispatch = useAppDispatch()
  const todoList = useAppSelector(getTodoList)
  const { done, id, title } = todo
  // const prevDone = usePrevious(done)
  // const [isDone, setIsDone] = useState(done)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget
    gaEvent({ action: 'todo', data: { checked: checked ? 'check' : 'uncheck' } })
    dispatch(setTodoList(todoList.map((item) => (item.id === Number(id) ? { ...item, done: checked } : item))))
  }

  // const [plantSetIsDone] = useTimeoutFn(() => setIsDone(true), 500)

  // useEffect(() => {
  //   if (prevDone === undefined || prevDone === done) return
  //   if (done) {
  //     plantSetIsDone()
  //   } else {
  //     setIsDone(done)
  //   }
  // }, [done, plantSetIsDone, prevDone])

  return (
    // <li className={cx(styles.task, { [styles.done]: isDone })}>
    <li className={cx(styles.task, { [styles.done]: done })}>
      <div className={styles.checkboxWrapper}>
        <input type='checkbox' checked={done} onChange={handleChange} />
        <CheckIcon />
      </div>
      <p className={styles.title}>{title}</p>
    </li>
  )
}

export default TodoItem
