import classNames from '~/utils/classNames'

type IconSearchProps = React.SVGProps<SVGSVGElement>

const IconSearch = ({ className }: IconSearchProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classNames('h-4 w-4', className)}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
    </svg>
  )
}

export default IconSearch
