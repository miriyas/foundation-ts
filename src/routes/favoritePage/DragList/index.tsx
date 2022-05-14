import styles from './DragList.module.scss'
import { HiViewList } from 'react-icons/hi'

interface Props {}

const DragList = ({}: Props): JSX.Element => {
  return (
    <button type='button' className={styles.editButton}>
      <HiViewList className={styles.editIcon} />
    </button>
  )
}

export default DragList
