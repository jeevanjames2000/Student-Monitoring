// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const student = {
  id: 'student',
  title: 'Student',
  type: 'group',
  children: [
    {
      id: 'student',
      title: 'Student',
      type: 'item',
      url: '/pages/student',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default student;
