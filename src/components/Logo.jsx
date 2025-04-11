import logo from '../assets/logo.svg'

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <a href="/">
        <img className="h-8" src={logo} alt="Page prismn" />
      </a>
    </div>
  )
}

export default Logo
