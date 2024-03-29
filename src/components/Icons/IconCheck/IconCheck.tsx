import classNames from '~/utils/classNames'

type IconCheckProps = React.SVGProps<SVGSVGElement>

const IconCheck = ({ className }: IconCheckProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classNames('h-6 w-6', className)}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
    </svg>
  )
}

export default IconCheck
