import { ImSpinner2 } from 'react-icons/im'
import styles from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.spinner}>
      <ImSpinner2 />
    </div>
  )
}

export default Loading
