import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import useOnClickOutside from '~/hooks/useOnClickOutSide'

interface IDropdownContext {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  toggleHandler: () => void
}

interface IDropdownProviderProps {
  children: React.ReactNode
}

const DropdownContext = createContext<IDropdownContext>({} as IDropdownContext)
const DropdownProvider = ({ children, ...props }: IDropdownProviderProps) => {
  const dropDownRef = useRef(null)
  const [show, setShow] = useState(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleHandler = useCallback(() => setShow((prev) => !prev), [show])

  const initialValues = useMemo(() => ({ show, setShow, toggleHandler }), [show, setShow, toggleHandler])
  useOnClickOutside(dropDownRef, () => setShow(() => false))
  return (
    <DropdownContext.Provider value={initialValues} {...props}>
      <div ref={dropDownRef}>{children}</div>
    </DropdownContext.Provider>
  )
}

function useDropdown() {
  const context = useContext(DropdownContext)
  if (typeof context === 'undefined') throw new Error('useDropdown must be used within DropdownProvider')
  return context
}

export { useDropdown, DropdownProvider }
