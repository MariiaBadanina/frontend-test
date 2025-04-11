import { DisclosureButton } from '@headlessui/react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import styles from './MobileNavigation.module.css'

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Projects', href: '/projects' },
]

const MobileNavigation = () => {
  const location = useLocation()

  return (
    <div className={styles.navigationContainer}>
      {navigation.map((item) => (
        <DisclosureButton
          key={item.name}
          as={Link}
          to={item.href}
          className={clsx(
            styles.navigationItem,
            location.pathname === item.href
              ? styles.navigationItemCurrent
              : styles.navigationItemDefault
          )}
          aria-current={location.pathname === item.href ? 'page' : undefined}
        >
          {item.name}
        </DisclosureButton>
      ))}
    </div>
  )
}

export default MobileNavigation
