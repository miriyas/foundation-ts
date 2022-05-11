import { MouseEventHandler } from 'react'
import styles from './FavoriteModal.module.scss'
import ReactDOM from 'react-dom'

interface IBackDropProps {
  onCancel: MouseEventHandler<HTMLButtonElement>
}

interface IModalProps {
  onClick: MouseEventHandler<HTMLButtonElement>
  content: string
  onCancel: MouseEventHandler<HTMLButtonElement>
}

const BackDrop = ({ onCancel }: IBackDropProps) => {
  return (
    <button type='button' onClick={onCancel} className={styles.backDropButton}>
      <div className={styles.backDrop} />
    </button>
  )
}

const FavoriteModalOverlay = ({ onClick, content, onCancel }: IModalProps) => {
  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h2>즐겨찾기 {content}</h2>
      </header>
      <div className={styles.content}>
        <p>즐겨찾기를 {content} 하시겠습니까?</p>
      </div>
      <footer className={styles.footer}>
        <button type='button' onClick={onClick}>
          {content}
        </button>
        <button type='button' onClick={onCancel}>
          취소
        </button>
      </footer>
    </div>
  )
}

const FavoriteModal = ({ onClick, content, onCancel }: IModalProps) => {
  const backDropElement = document?.getElementById('backdrop-root')
  const modalElement = document?.getElementById('favorite-modal')

  return (
    <>
      {backDropElement && ReactDOM.createPortal(<BackDrop onCancel={onCancel} />, backDropElement)}

      {modalElement &&
        ReactDOM.createPortal(
          <FavoriteModalOverlay onClick={onClick} content={content} onCancel={onCancel} />,
          modalElement
        )}
    </>
  )
}

export default FavoriteModal
