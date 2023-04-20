export interface PublicRoutes {
  path: string
  component: any
  layout: string
}

export interface PrivateRoutes {
  path: string
  component: () => JSX.Element
  layout?: (props: any) => JSX.Element
}
