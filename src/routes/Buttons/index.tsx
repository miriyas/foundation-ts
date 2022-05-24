import { Button } from 'components'
import styles from './buttons.module.scss'

const Buttons = () => {
  return (
    <div className={styles.buttons}>
      <Button size='small' primary>
        주요 버튼
      </Button>
      <Button size='small'>그냥 버튼</Button>
      <Button size='large' primary>
        큰 주요 버튼
      </Button>
      <Button size='large'>큰 그냥 버튼</Button>
    </div>
  )
}

export default Buttons
