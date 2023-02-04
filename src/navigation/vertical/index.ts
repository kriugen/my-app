// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Posts',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'About',
      icon: InformationOutline,
      path: '/about'
    },
  ]
}

export default navigation
