import { ReactNode } from 'react'

import { cx } from '../../styles'
import styles from './Container.module.scss'
import BackgroundUI from './BackgroundUI'

interface ContainerProps {
  children: ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className={cx(styles.container)}>
      {children}
      <BackgroundUI />
    </div>
  )
}

export default Container
