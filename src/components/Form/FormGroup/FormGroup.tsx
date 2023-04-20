import classNames from '~/utils/classNames'

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const FormGroup = ({ children, className }: FormGroupProps) => {
  return <div className={classNames('mb-3 flex flex-col gap-y-1', className)}>{children}</div>
}

export default FormGroup
