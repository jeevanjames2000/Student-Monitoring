// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';
import ManIcon from '@mui/icons-material/Man';
import PeopleIcon from '@mui/icons-material/People';
// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  ManIcon,
  PeopleIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Students',
      type: 'item',
      url: '/utils/student',
      icon: icons.PeopleIcon,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Faculty',
      type: 'item',
      url: '/utils/faculty',
      icon: icons.ManIcon,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Generate New QR',
      type: 'item',
      url: '/utils/generate-qr',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    // {
    //   id: 'icons',
    //   title: 'Icons',
    //   type: 'collapse',
    //   icon: icons.IconWindmill,
    //   children: [
    //     {
    //       id: 'tabler-icons',
    //       title: 'Tabler Icons',
    //       type: 'item',
    //       url: '/icons/tabler-icons',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'material-icons',
    //       title: 'Material Icons',
    //       type: 'item',
    //       external: true,
    //       target: '_blank',
    //       url: 'https://mui.com/material-ui/material-icons/',
    //       breadcrumbs: false
    //     }
    //   ]
    // }
  ]
};

export default utilities;
