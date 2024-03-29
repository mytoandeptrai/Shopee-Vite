import classNames from '~/utils/classNames'

type IconMenuProps = React.SVGProps<SVGSVGElement>

const IconMenu = ({ className }: IconMenuProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classNames('h-4 w-4', className)}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
    </svg>
  )
}

export default IconMenu
