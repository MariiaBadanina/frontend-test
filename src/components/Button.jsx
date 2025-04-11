import styles from './Button.module.css'
import clsx from 'clsx'

const Button = ({ children, className, ...props }) => {
  return (
    <button type="button" className={clsx(styles.button, className)} {...props}>
      {children}
    </button>
  )
}

export default Button
