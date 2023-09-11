// ** Icon imports
import { HomeOutline } from 'mdi-material-ui'

// ** Type import
import { VerticalNavItemsType } from '@/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'داشبورد',
      icon: HomeOutline,
      path: '/'
    }
  ]
}

export default navigation
