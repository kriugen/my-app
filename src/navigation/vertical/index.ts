// ** Icon imports
import InformationOutline from 'mdi-material-ui/InformationOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'About',
      icon: InformationOutline,
      path: '/about'
    },
    {
      title: 'Pricing',
      icon: CurrencyUsd,
      path: '/pricing'
    },
    {
      title: 'FAQ',
      icon: HelpCircleOutline,
      path: '/faq'
    },
  ]
}

export default navigation