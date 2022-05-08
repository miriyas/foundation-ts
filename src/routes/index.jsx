import styles from './Routes.module.scss'
// import TodoList from './TodoList'
import Weather from './Weathers'

const App = () => {
  return (
    <div className={styles.app}>
      {/* <TodoList /> */}
      <Weather />
    </div>
  )
}

export default App
