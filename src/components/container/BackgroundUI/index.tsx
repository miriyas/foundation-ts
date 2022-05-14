import styles from './BackgroundUI.module.scss'

const BackgroundUI = () => {
  return (
    <div className={styles.night}>
      <div className={styles.shootingStar} />
      <div className={styles.shootingStar} />
      <div className={styles.shootingStar} />
      <div className={styles.shootingStar} />
      <div className={styles.shootingStar} />
      <div className={styles.shootingStar} />
    </div>
  )
}

export default BackgroundUI
