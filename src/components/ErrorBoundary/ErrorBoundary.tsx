import React, { Component, ErrorInfo } from 'react'

interface IErrorBoundaryProps {
  children: React.ReactNode
}

interface IErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  public static getDerivedStateFromError() {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error: ', error)
    console.error('Error info: ', errorInfo)
  }

  public render() {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      return <p className='min-h-[40vh] bg-red-100 p-4 text-center text-base font-medium text-red-500'>Đã xảy ra lỗi</p>
    }
    return children
  }
}

export default ErrorBoundary
