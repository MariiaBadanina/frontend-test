import Navbar from '../components/Navbar'
import Header from '../components/Header'
import styles from './AppLayout.module.css'
import usePageTitle from '../hooks/usePageTitle'

const AppLayout = ({ children }) => {
  const title = usePageTitle()

  return (
    <div className={styles.container}>
      <Navbar />
      <Header title={title} />
      <main>
        <div className={styles.main}>{children}</div>
      </main>
    </div>
  )
}

export default AppLayout
