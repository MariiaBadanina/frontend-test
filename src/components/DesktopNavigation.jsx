import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import styles from './DesktopNavigation.module.css'

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Projects', href: '/projects' },
]

const DesktopNavigation = () => {
  const location = useLocation()

  return (
    <div className={styles.container}>
      <div className={styles.navList}>
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={clsx(
              styles.navItem,
              location.pathname === item.href
                ? styles.navItemCurrent
                : styles.navItemDefault
            )}
            aria-current={location.pathname === item.href ? 'page' : undefined}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DesktopNavigation
