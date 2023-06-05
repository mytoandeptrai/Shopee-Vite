import { NavLink } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Sidebar } from '~/layouts/components'
import { SIDEBAR_DASHBOARD_LINKS, stylesLink, stylesLinkActive } from './DashboardSidebar.config'

const DashboardSidebar = () => {
  return (
    <Sidebar content='Dashboard' className='shadowCustomize lg:h-full lg:w-[280px] lg:bg-white lg:p-4'>
      <ul>
        {SIDEBAR_DASHBOARD_LINKS.map((link) => (
          <li key={uuidv4()}>
            <NavLink end to={link.path} className={({ isActive }) => (isActive ? stylesLinkActive : stylesLink)}>
              {link.icon}
              {link.display}
            </NavLink>
          </li>
        ))}
      </ul>
    </Sidebar>
  )
}

export default DashboardSidebar
