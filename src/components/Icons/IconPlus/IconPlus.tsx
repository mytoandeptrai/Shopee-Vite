import classNames from '~/utils/classNames'

type IconPlusProps = React.SVGProps<SVGSVGElement>

const IconPlus = ({ className }: IconPlusProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classNames('h-4 w-4', className)}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
    </svg>
  )
}

export default IconPlus
