import styles from './Header.module.css'

const Header = ({ title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </header>
  )
}

export default Header
