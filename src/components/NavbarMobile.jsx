import { DisclosurePanel } from '@headlessui/react'
import MobileNavigation from './MobileNavigation'

const NavbarMobile = () => {
  return (
    <DisclosurePanel className="md:hidden">
      <MobileNavigation />
    </DisclosurePanel>
  )
}

export default NavbarMobile
