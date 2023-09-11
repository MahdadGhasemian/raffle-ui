// ** React Imports
import { ReactNode } from 'react'

const ProtectedRoute = (props: { children: ReactNode }) => {
  // ** Props
  const { children } = props

  return <div>{children}</div>
}

export default ProtectedRoute
