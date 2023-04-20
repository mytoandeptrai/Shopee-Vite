import classNames from '~/utils/classNames'
import DropdownList from '../DropdownList/DropdownList'
import DropdownOption from '../DropdownOption/DropdownOption'
import { DropdownProvider } from '../DropdownProvider/DropdownProvider'
import DropdownSelect from '../DropdownSelect/DropdownSelect'

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Dropdown = ({ children, className = '', ...props }: DropdownProps) => {
  return (
    <DropdownProvider {...props}>
      <div className={classNames('dropdown relative inline-block w-full', className)}>{children}</div>
    </DropdownProvider>
  )
}

Dropdown.Select = DropdownSelect
Dropdown.List = DropdownList
Dropdown.Option = DropdownOption

export default Dropdown
