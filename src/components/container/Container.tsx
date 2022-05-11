import styles from './Container.module.scss'
import { cx } from '../../styles'
import React from 'react'

interface ContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return <div className={cx(styles.container)}> {children} </div>
}


export default Container
